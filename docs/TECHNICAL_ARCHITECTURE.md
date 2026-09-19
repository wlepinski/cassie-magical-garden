# Technical Architecture

## Architecture goals

The MVP architecture should optimize for:

- reliable Android installation and offline play;
- very fast iteration on game mechanics;
- deterministic, testable learning content;
- clean separation between game rules and rendering;
- straightforward localization later;
- no backend or operational infrastructure;
- maintainability by one developer plus coding agents.

## Stack

### Language

**TypeScript** for application and game logic.

### Game runtime

**Phaser 4** for:

- scenes;
- rendering;
- input/touch;
- animation/tweens;
- asset loading;
- audio;
- game loop/lifecycle.

At project bootstrap in September 2026, Phaser 4 is the current major line. Dependencies should be pinned in `package-lock.json`; do not rely on floating versions.

### Build tooling

**Vite** for local development and production web assets.

The game should remain a conventional browser-buildable application even though Android is the primary target. This keeps iteration fast and allows most gameplay testing without launching an emulator.

### Android container

**Capacitor 8** to package the web game inside a native Android application.

Capacitor is a container/integration layer, not the gameplay framework. Keep native plugins to a minimum.

## High-level shape

```text
TypeScript domain/content
        |
        v
Phaser scenes + presentation
        |
        v
Vite production build
        |
        v
Capacitor Android WebView container
        |
        v
APK / Android device
```

## Proposed repository structure

```text
.
├── AGENTS.md
├── README.md
├── docs/
├── src/
│   ├── main.ts
│   ├── game/
│   │   ├── config.ts
│   │   ├── Game.ts
│   │   ├── scenes/
│   │   │   ├── BootScene.ts
│   │   │   ├── GardenScene.ts
│   │   │   ├── CountingScene.ts
│   │   │   ├── LetterScene.ts
│   │   │   ├── MemoryScene.ts
│   │   │   └── PatternScene.ts
│   │   ├── systems/
│   │   │   ├── AudioSystem.ts
│   │   │   ├── ProgressionSystem.ts
│   │   │   ├── HintSystem.ts
│   │   │   └── ContentSelectionSystem.ts
│   │   └── ui/
│   ├── domain/
│   │   ├── progress.ts
│   │   ├── mastery.ts
│   │   ├── rewards.ts
│   │   └── activities.ts
│   ├── content/
│   │   ├── counting/
│   │   ├── letters/
│   │   ├── memory/
│   │   ├── patterns/
│   │   └── locale/
│   │       └── en.ts
│   ├── persistence/
│   │   ├── ProgressRepository.ts
│   │   └── LocalProgressRepository.ts
│   └── platform/
│       └── lifecycle.ts
├── public/
│   └── assets/
│       ├── images/
│       ├── audio/
│       └── fonts/
├── android/
├── capacitor.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

The exact structure may evolve, but the boundaries should remain recognizable.

## Scene model

### BootScene

Responsibilities:

- preload only the assets needed for initial launch;
- load persistent settings/progress;
- initialize audio/content systems;
- route to the garden.

Avoid loading the complete future asset catalog before first interaction.

### GardenScene

Responsibilities:

- render current persistent garden state;
- expose the four activity entrances;
- show newly unlocked rewards;
- route to activities;
- offer unobtrusive parent/settings access.

The Garden scene owns presentation of unlocks, not the rules that decide when they unlock.

### Activity scenes

Each activity scene should depend on pure content/rule data wherever possible.

A scene is responsible for:

- rendering the challenge;
- translating input into game actions;
- animation/audio feedback;
- telling the progression layer when a round completes.

A scene should not directly mutate raw saved JSON.

## Domain model

Suggested minimal types:

```ts
type ActivityId = 'counting' | 'letters' | 'memory' | 'patterns';

type DifficultyTier = 1 | 2 | 3;

interface ActivityProgress {
  completions: number;
  recentIndependentSuccesses: number;
  recentRetries: number;
  difficultyTier: DifficultyTier;
}

interface PlayerProgress {
  schemaVersion: number;
  totalCompletions: number;
  unlockedRewardIds: string[];
  activities: Record<ActivityId, ActivityProgress>;
}
```

Do not over-model educational mastery in v1. We need enough state to choose reasonable difficulty, not a learning-management system.

## Content as data

Learning content should be declarative rather than embedded in scene code.

Example:

```ts
interface LetterPrompt {
  id: string;
  targetLetter: string;
  mode: 'recognition' | 'initial-sound';
  promptAudioKey: string;
  choices: LetterChoice[];
  correctChoiceId: string;
  tier: DifficultyTier;
}
```

Benefits:

- content can be reviewed separately from mechanics;
- adding Portuguese does not fork game logic;
- deterministic tests can validate answer keys;
- agents can add content with lower risk.

## Localization

Use stable semantic keys rather than raw English strings in game logic.

Example:

```ts
voice.counting.pick_count
reward.first_flower
settings.sound
```

For dynamic spoken prompts, prefer pre-recorded phrase families or generated asset manifests rather than runtime text-to-speech in the MVP. Runtime TTS introduces platform inconsistencies and makes the child experience less deterministic.

English assets ship first. Portuguese is an additive content pack later.

## Persistence

### MVP

Use a repository abstraction backed by browser local storage/Capacitor WebView storage.

Persist:

- schema version;
- unlocked rewards;
- activity progress;
- audio/settings preferences.

Do not persist personal information.

### Requirements

- persistence failures must not crash gameplay;
- corrupt/unknown state should fall back safely;
- saved data must include `schemaVersion`;
- migrations should be explicit when schema changes;
- reset should restore a known initial state.

If localStorage proves unreliable for required Android lifecycle semantics during device testing, replace the repository implementation with Capacitor Preferences without leaking that dependency into game scenes.

## Progression

`ProgressionSystem` receives semantic events, for example:

```ts
activityCompleted({
  activityId: 'counting',
  independent: true,
  retries: 0,
});
```

It then:

1. updates progress;
2. evaluates deterministic unlock rules;
3. persists state;
4. returns any newly unlocked rewards.

Game scenes should not contain unlock thresholds.

## Difficulty selection

`ContentSelectionSystem` selects a challenge using:

- activity current tier;
- recent outcomes;
- avoiding immediate repetition where possible;
- content eligibility.

MVP adaptation rule can remain deliberately simple:

- 3 independent successes at current tier -> eligible for next tier;
- 2 high-friction rounds in a short window -> bias one tier easier;
- never downgrade permanently after one mistake.

The precise values should be tuneable constants with tests.

## Hint system

Hints should be driven by idle time/state, not hardcoded timers scattered across scenes.

Possible API:

```ts
hintSystem.start({
  subtleAfterMs: 6_000,
  verbalAfterMs: 12_000,
  demonstrateAfterMs: 20_000,
});
```

Any child interaction resets/advances the hint state appropriately.

These values require playtesting and should not be treated as final UX values.

## Audio architecture

Use semantic audio keys and one central audio service.

Categories:

- voice;
- effects;
- ambience;
- music.

The service should support independent category volumes even if the first UI exposes only master sound + music.

Do not autoplay loud audio before the platform has accepted user interaction where browser/WebView policies prohibit it.

## Asset policy

Game code must not depend on arbitrary remote assets.

For the MVP:

- all gameplay assets ship inside the application;
- maintain clear provenance/licensing for every non-original asset;
- prefer original/generated/commissioned assets where rights are clear;
- optimize images and audio for mobile package size;
- avoid embedding child photos or personal data.

Keep an asset manifest when the first production assets are introduced.

## Android lifecycle

The app must tolerate:

- background/resume;
- screen rotation policy changes;
- temporary audio focus loss;
- activity recreation;
- device back navigation.

Recommended initial policy:

- lock gameplay orientation after testing which layout works best, likely landscape;
- pause Phaser and audio when the app backgrounds;
- resume safely;
- Android Back from an activity returns to the garden before exiting the application.

## Responsive layout

Design against a logical game coordinate system and scale to device viewport.

Do not position important controls against physical pixel dimensions.

Support at minimum the actual target phone used for playtesting plus a representative Android tablet/large-screen emulator before calling the MVP stable.

## Testing strategy

### Unit tests

Focus on pure logic:

- progression thresholds;
- difficulty transitions;
- content selection;
- persistence migrations;
- content answer-key validation;
- reward unlocking.

### Game-level smoke tests

Automate what is reasonable:

- app boots;
- Garden scene appears;
- each activity can be entered;
- a synthetic correct completion updates progress;
- reload restores progress.

### Manual device tests

Mandatory for child UX:

- touch target usability;
- audio levels;
- resume/background behavior;
- real-device frame rate;
- Android back behavior;
- offline launch;
- first-run behavior;
- installation/update behavior.

No automated test substitutes for observing the intended-age child actually play.

## Quality gate

Once the scaffold exists, `package.json` should expose a single CI command, preferably:

```bash
npm run check
```

It should run at least:

- TypeScript type checking;
- linting;
- unit tests;
- production build.

Agents should use the same command locally before opening a PR.

## Dependency policy

- pin dependencies through `package-lock.json`;
- prefer fewer dependencies;
- do not add a state-management framework unless the game complexity proves it necessary;
- do not introduce React solely for menus Phaser can render cleanly;
- native Capacitor plugins require a concrete capability need;
- dependency upgrades should be isolated and tested on Android.

## Network policy

The MVP should make zero required network calls at runtime.

That means:

- no remote fonts;
- no CDN-loaded scripts;
- no runtime analytics;
- no online asset server;
- no backend feature flags;
- no runtime AI APIs.

Development tooling may use the network normally during install/build.

## Packaging workflow

Target development loop:

```text
npm run dev
    -> browser gameplay iteration

npm run build
npx cap sync android
    -> update Android project

npx cap open android
    -> Android Studio / device build
```

Later, add a GitHub Actions workflow that produces a debug APK artifact on the main branch and/or tagged builds.

## Architecture decision summary

For the MVP, prefer boring deterministic technology over extensibility for hypothetical features. This is a small offline game; a backend, event pipeline, remote configuration, complex ECS, or generalized plugin architecture would be architectural waste until proven necessary.
