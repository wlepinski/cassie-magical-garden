# Cassie's Magical Garden

Cassie's Magical Garden is a small, offline-first educational game for young children, initially designed for a five-year-old and packaged as an installable Android app.

The game combines a calm magical-garden progression loop with very short touch-friendly learning activities. The intent is to create something a child can understand without needing to read instructions, while avoiding ads, accounts, timers, punishment mechanics, and manipulative retention systems.

## Product principles

- Designed for age ~5 first.
- Play sessions should work in 1–5 minute chunks.
- Spoken/visual instructions should make reading optional.
- Mistakes are recoverable and never produce a losing screen.
- Rewards unlock garden life, decorations, flowers, and friendly creatures.
- No ads, in-app purchases, accounts, analytics, or network dependency in the MVP.
- Offline by default.
- English first, with the content architecture prepared for Portuguese later.
- Android is the first distribution target.

## MVP

The first playable version contains one garden hub and four activities:

1. **Counting Garden** — count or collect the requested number of objects.
2. **Letter Meadow** — identify letters or objects beginning with a target sound/letter.
3. **Memory Pond** — match pairs of friendly picture cards.
4. **Pattern Path** — complete simple visual sequences.

Completing activities earns stars/seeds used to make the central garden more lively. Progress is local to the device.

## Technical direction

The current technical direction is:

- TypeScript
- Phaser 4 for the 2D game runtime
- Vite for the web build/tooling layer
- Capacitor for the Android native container
- Local device persistence only for the MVP

Phaser 4 is intentionally used as the game engine rather than building the interaction layer in React. UI outside the game canvas should remain minimal.

## Documentation

- [Product specification](docs/PRODUCT.md)
- [Game design](docs/GAME_DESIGN.md)
- [Technical architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [MVP backlog](docs/MVP_BACKLOG.md)
- [Child experience and safety principles](docs/CHILD_EXPERIENCE.md)
- [Development/agent guidance](AGENTS.md)

## Status

**Phase 0 — Definition and project bootstrap.**

The immediate goal is a vertical slice that can be installed on an Android phone and lets a child enter the garden, play one complete mini-game, earn a reward, and see the garden change.
