# AGENTS.md

## Mission

Build **Cassie's Magical Garden**, an offline-first educational Android game designed primarily for a five-year-old.

The product source of truth is:

1. `docs/PRODUCT.md`
2. `docs/GAME_DESIGN.md`
3. `docs/CHILD_EXPERIENCE.md`
4. `docs/TECHNICAL_ARCHITECTURE.md`
5. `docs/MVP_BACKLOG.md`

When implementation convenience conflicts with the child-experience constraints, the child-experience constraints win unless a deliberate product decision updates the documentation.

## Product invariants

Do not introduce any of the following without an explicit product decision and documentation update:

- advertising;
- in-app purchases;
- accounts/authentication;
- backend services required for gameplay;
- runtime analytics/telemetry;
- remote asset dependencies;
- runtime AI APIs;
- daily streaks;
- countdown pressure;
- lives/failure screens;
- competitive leaderboards;
- push notifications;
- sensitive Android permissions.

The MVP must remain fully playable offline after installation.

## Child-facing UX invariants

- Reading cannot be required to understand core gameplay.
- Wrong answers must remain safely retryable.
- Do not use harsh error sounds or punitive visuals.
- Touch interactions must be forgiving.
- Do not add small precision controls unless there is no child-facing alternative.
- Avoid long blocking animations.
- Do not communicate essential state by color alone.
- Avoid flashing/strobing effects.
- A child must be able to stop playing without losing earned progress.

## Technical direction

Unless an accepted change updates `docs/TECHNICAL_ARCHITECTURE.md`:

- TypeScript is the application language.
- Phaser 4 is the game runtime.
- Vite is the build/dev tool.
- Capacitor is the Android container.
- Game/content logic should be separated from Phaser presentation where practical.
- Learning challenges should be represented as typed data.
- Persistence goes through a repository abstraction.
- Game scenes do not directly mutate raw persisted JSON.
- Runtime networking is not required.

## Repository workflow

Before implementing a backlog item:

1. Read this file.
2. Read the relevant product/design/architecture document.
3. Identify the `CG-xxx` backlog item being implemented.
4. Inspect existing implementation before creating a new abstraction.
5. Keep the change focused on that item plus necessary prerequisites.

Prefer small, reviewable branches and pull requests once development begins in earnest.

Do not merge a pull request solely because automated checks pass; child-facing behavior may require real-device/playtest review.

## Quality expectations

Once the project scaffold is present, every code change should pass the repository quality gate documented in `package.json` (target command: `npm run check`).

Expected checks:

- formatting/linting;
- TypeScript type checking;
- unit tests;
- production build.

Add regression tests for domain logic whenever practical, especially:

- progression;
- reward unlocks;
- difficulty transitions;
- persistence migrations;
- content validation;
- answer keys.

## Dependency policy

Before adding a dependency, ask whether the same outcome is reasonable with the existing stack.

A new dependency is justified only when it materially reduces complexity or enables a required capability.

Particularly avoid:

- general state-management frameworks for simple local state;
- UI frameworks solely for a handful of game menus;
- native plugins without a concrete platform requirement;
- analytics or advertising SDKs;
- remote-content SDKs.

Commit dependency lockfile changes with dependency changes.

## Content rules

Educational content is production code.

Every content item must have:

- stable ID;
- defined difficulty tier;
- unambiguous correct answer;
- child-appropriate prompt;
- required audio/visual asset references where applicable.

Do not introduce picture prompts whose intended word is ambiguous in normal English usage.

Do not hardcode one-off English instruction strings into mechanics when a locale/content key should be used.

## Persistence rules

- Never store personal information about the child.
- Persist schema version with progress.
- Unknown/corrupt save data must fail safely.
- Earned unlocks must not disappear because of activity lifecycle events.
- Reset is a deliberate parent action.

## Android rules

A web-browser success is not enough for platform-level work.

Changes affecting any of the following require Android verification:

- lifecycle/background/resume;
- audio focus;
- viewport/orientation;
- back navigation;
- persistence behavior;
- Capacitor configuration/plugins;
- APK packaging;
- permissions.

## Playtest findings

Treat child playtest findings as high-quality product evidence.

When a child struggles, first investigate:

1. interaction affordance;
2. prompt clarity;
3. touch target/motor precision;
4. content ambiguity;
5. difficulty.

Do not "solve" usability problems by adding explanatory text a five-year-old has to read.

## Documentation discipline

Update documentation when a change alters:

- product scope;
- a product invariant;
- game rules;
- progression/economy;
- architecture boundaries;
- privacy/network behavior;
- Android distribution strategy;
- backlog dependencies or acceptance criteria.

The repository should remain sufficient for a new coding agent to understand why the product works the way it does without relying on chat history.
