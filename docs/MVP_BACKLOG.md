# MVP Backlog

## Delivery strategy

Build the game through vertical slices. The first meaningful milestone is not "all scaffolding complete"; it is an installable Android build where a child can play one activity, earn a reward, return to the garden, and see that reward persist after reopening the app.

Priorities:

- **P0** — required for first installable vertical slice.
- **P1** — required for MVP.
- **P2** — valuable immediately after MVP if playtesting supports it.

## Milestone 0 — Project bootstrap

### CG-001 — Scaffold TypeScript + Vite + Phaser application

**Priority:** P0

Acceptance criteria:

- project runs locally with `npm run dev`;
- production build succeeds;
- Phaser boots into a placeholder Garden scene;
- TypeScript strict mode is enabled;
- package lock is committed;
- no runtime CDN dependencies.

### CG-002 — Establish quality gate

**Priority:** P0

Acceptance criteria:

- formatter configured;
- linter configured;
- unit-test runner configured;
- `npm run check` runs type checking, linting, tests, and production build;
- failing checks return non-zero exit status.

### CG-003 — Add Capacitor Android project

**Priority:** P0

Acceptance criteria:

- Capacitor configured with stable application ID;
- Android project exists under `android/`;
- web build syncs into Android project;
- debug APK installs on a physical Android device;
- app launches without network access.

### CG-004 — Define viewport/orientation strategy

**Priority:** P0

Acceptance criteria:

- game scales to target phone resolution without clipping;
- safe areas are respected;
- orientation policy is explicitly chosen and documented after device test;
- touch coordinates remain correct at different viewport sizes.

## Milestone 1 — First vertical slice

### CG-010 — Implement local progress repository

**Priority:** P0

Acceptance criteria:

- initial progress state is defined;
- state includes schema version;
- read/write/reset operations exist behind repository interface;
- invalid/corrupt state safely falls back;
- unit tests cover persistence behavior;
- no personal information is stored.

### CG-011 — Implement progression and first garden rewards

**Priority:** P0

Acceptance criteria:

- activity completion increments persistent progress;
- deterministic unlock thresholds exist outside Phaser scenes;
- at least three garden rewards are modeled;
- newly unlocked rewards are returned to presentation layer;
- unit tests cover thresholds and duplicate-unlock prevention.

### CG-012 — Build playable Garden scene

**Priority:** P0

Acceptance criteria:

- one central garden hub renders;
- Counting Garden entrance is obvious and tappable;
- locked/future activity areas may appear as decorative placeholders;
- unlocked reward state changes the garden;
- reopening the app recreates unlocked visual state.

### CG-013 — Build Counting Garden vertical slice

**Priority:** P0

Acceptance criteria:

- child can enter Counting Garden from hub;
- spoken/visual prompt asks for a quantity;
- child selects/taps large objects;
- correct completion triggers concise positive feedback;
- excess/incorrect action is recoverable without failure screen;
- completing the round awards progress;
- player returns to garden and sees an unlock/progression response;
- at least Tier 1 quantities 1–3 are supported.

### CG-014 — Android vertical-slice playtest

**Priority:** P0

Acceptance criteria:

- debug APK installed on target physical Android device;
- launch works in airplane mode;
- background/resume tested;
- touch targets manually validated;
- one child playtest completed with observation notes;
- critical usability findings converted into backlog items before expanding content.

## Milestone 2 — Shared game systems

### CG-020 — Add content-as-data layer

**Priority:** P1

Acceptance criteria:

- mini-game challenge data is separate from rendering code;
- content schemas are typed;
- content IDs are stable;
- validation tests detect malformed content and impossible answer keys.

### CG-021 — Add localization key architecture

**Priority:** P1

Acceptance criteria:

- child-facing strings/prompts use semantic keys;
- English locale pack exists;
- game logic contains no required raw English instruction strings;
- adding a second locale does not require scene forks.

### CG-022 — Add central audio system

**Priority:** P1

Acceptance criteria:

- voice, effect, ambience, and music categories exist;
- overlapping spoken instructions are prevented;
- app pause/resume handles audio safely;
- parent can mute at least music and/or master audio;
- no audio requires network access.

### CG-023 — Add reusable hint system

**Priority:** P1

Acceptance criteria:

- inactivity can trigger staged hints;
- interaction resets appropriate hint timing;
- scenes configure hints rather than duplicate timing logic;
- hints can be disabled during completion animations/transitions.

### CG-024 — Implement difficulty/content selection

**Priority:** P1

Acceptance criteria:

- each activity exposes tiered content;
- repeated independent success can increase difficulty;
- high-friction rounds bias future selection easier;
- no single wrong tap causes permanent downgrade;
- transitions covered by unit tests.

## Milestone 3 — Four-game MVP

### CG-030 — Expand Counting Garden to MVP scope

**Priority:** P1

Acceptance criteria:

- quantities 1–10 available across tiers;
- content avoids confusing object overlap;
- prompt audio/content mapping validated;
- activity remains playable without reading.

### CG-031 — Implement Letter Meadow

**Priority:** P1

Acceptance criteria:

- uppercase recognition mode works;
- initial-sound picture mode works for curated subset;
- 2–4 large choices depending on tier;
- every picture has one unambiguous intended English name;
- mistakes permit immediate retry;
- completion contributes to shared progression.

### CG-032 — Implement Memory Pond

**Priority:** P1

Acceptance criteria:

- 2-, 3-, and 4-pair boards supported;
- mismatches flip back after readable delay;
- matches persist/animate;
- no move counter or penalty;
- completion contributes to shared progression.

### CG-033 — Implement Pattern Path

**Priority:** P1

Acceptance criteria:

- AB patterns supported;
- AAB/ABB patterns supported at higher tier;
- candidate choices are large and clearly separated;
- exactly one intended answer exists per content item;
- completion contributes to shared progression.

### CG-034 — Complete first garden progression path

**Priority:** P1

Acceptance criteria:

- at least five persistent environmental unlocks exist;
- every unlock has obvious visual feedback;
- unlock order is deterministic for MVP;
- garden remains readable as decoration accumulates;
- progress survives application restart/update during development.

## Milestone 4 — Parent and platform polish

### CG-040 — Add unobtrusive parent/settings surface

**Priority:** P1

Acceptance criteria:

- settings is not visually dominant in child flow;
- sound controls available;
- reset progress available behind simple parent gate;
- reset requires deliberate confirmation;
- app version visible.

### CG-041 — Harden Android lifecycle behavior

**Priority:** P1

Acceptance criteria:

- backgrounding pauses game/audio appropriately;
- returning does not duplicate audio/timers;
- Android Back from mini-game returns to garden;
- app interruption never removes persistent rewards;
- repeated pause/resume smoke test passes.

### CG-042 — Offline/privacy audit

**Priority:** P1

Acceptance criteria:

- airplane-mode full session passes;
- no runtime network requests are required;
- Android manifest contains no unnecessary sensitive permissions;
- no analytics/advertising SDK present;
- no personal data written to local progress state.

### CG-043 — Accessibility/usability pass

**Priority:** P1

Acceptance criteria:

- critical meaning is not conveyed by color alone;
- touch target sizes reviewed on real device;
- no rapid flashing content;
- prompts remain understandable over music;
- decorative animation does not obscure challenge content.

## Milestone 5 — Build/release automation

### CG-050 — Add GitHub Actions CI

**Priority:** P1

Acceptance criteria:

- CI runs `npm ci` and `npm run check` for pull requests;
- workflow uses pinned major action versions;
- failures clearly identify the failing quality stage.

### CG-051 — Produce debug APK artifact in CI

**Priority:** P2

Acceptance criteria:

- workflow builds Android debug APK from committed source;
- APK is attached as a workflow artifact;
- artifact is installable on target device;
- build does not require committing secrets for debug flow.

### CG-052 — Define signed release process

**Priority:** P2

Acceptance criteria:

- signing approach documented;
- keystore/secrets are never committed;
- version code/name strategy documented;
- tagged release can produce a reproducible signed artifact when configured.

## Post-MVP candidates

Do not begin these until playtesting justifies them:

- Portuguese language pack;
- phonics expansion/full alphabet;
- simple addition/subtraction;
- garden decoration choice/customization;
- more creatures/areas;
- tablet-specific layout polish;
- iOS packaging;
- optional parent-visible learning summary stored locally;
- multiple local child profiles only if genuinely needed.

## Explicitly deferred

The following require a new product decision rather than silently entering the backlog:

- backend/cloud sync;
- account system;
- remote analytics;
- AI-generated runtime lessons;
- ads;
- in-app purchases;
- social sharing;
- notifications/streaks;
- public app-store launch.

## Recommended implementation order

For coding agents, take work in this sequence unless a dependency forces otherwise:

```text
CG-001 -> CG-002 -> CG-003 -> CG-004
    -> CG-010 -> CG-011 -> CG-012 -> CG-013 -> CG-014
    -> shared systems (CG-020..024)
    -> remaining mini-games (CG-030..034)
    -> Android/product hardening (CG-040..043)
    -> CI/release automation (CG-050..052)
```

Do not parallelize tightly coupled foundational tasks simply to increase agent count. Parallel work becomes useful after the vertical slice establishes the actual architecture.
