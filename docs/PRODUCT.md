# Product Specification

## Working title

**Cassie's Magical Garden**

## Product statement

Cassie's Magical Garden is an offline-first educational game for a five-year-old. A child helps restore and grow a magical garden by completing short, tactile learning activities. Each successful activity produces an immediate, visible change in the garden.

The product should feel like a game that happens to exercise early learning skills, not a worksheet wrapped in animation.

## Primary user

A child around five years old who:

- can confidently tap, drag, and swipe on a phone or tablet;
- may recognize some letters and numbers but should not need to read instructions;
- benefits from short activities and immediate feedback;
- may replay the same activity many times;
- is still developing frustration tolerance and fine motor precision.

The parent is a secondary user responsible for installation, language/settings changes, and resets.

## Goals

1. Create a game Cassie voluntarily wants to replay.
2. Exercise age-appropriate counting, early literacy, memory, and pattern recognition.
3. Make progress tangible by changing the garden after play.
4. Require little or no reading from the child.
5. Work completely offline after installation.
6. Produce a normal Android application that can be installed as an APK during development.
7. Keep the architecture small enough for one developer and coding agents to evolve safely.

## Non-goals for MVP

- Multiplayer or social features.
- Accounts, profiles, cloud sync, leaderboards, or authentication.
- Ads or in-app purchases.
- Backend services.
- Push notifications.
- Competitive scoring.
- Daily streaks or engagement pressure.
- AI-generated content at runtime.
- Broad curriculum coverage.
- iOS distribution.

## Core fantasy

The magical garden is quiet and incomplete when the child first arrives. Friendly creatures need small bits of help. Playing activities earns **magic seeds** and **stars**. Rewards make flowers bloom, attract creatures, restore garden objects, and add decorations.

The child is helping the world become more alive rather than trying to beat an opponent.

## Core loop

1. Enter the garden.
2. Choose a visible activity location or creature.
3. Hear/see a very short instruction.
4. Complete a 20–90 second activity.
5. Receive encouraging feedback and a reward.
6. Return to the garden.
7. See a small persistent change.
8. Choose what to do next or stop playing.

A session should remain satisfying even if the child completes only one activity.

## MVP content

### Garden hub

A single magical garden scene acts as the home screen and progression surface. Four visual destinations lead to four activities.

### Counting Garden

The child is shown/hears a quantity and taps or drags the correct number of objects.

Skills:

- quantities 1–10;
- one-to-one correspondence;
- numeral recognition in later difficulty steps.

### Letter Meadow

The child identifies a target letter or an image beginning with a target initial sound.

Skills:

- uppercase letter recognition first;
- common letter sounds;
- simple picture-to-sound association.

MVP content should use a deliberately small set of well-tested letters and images rather than attempting the full alphabet immediately.

### Memory Pond

The child flips cards and matches image pairs.

Skills:

- working memory;
- visual recognition;
- turn planning.

### Pattern Path

The child chooses the object that completes a simple sequence.

Skills:

- AB patterns first;
- AAB/ABB patterns after repeated success;
- visual classification.

## Progression

Progression is intentionally shallow in the first release.

- Activities award magic seeds/stars.
- Rewards unlock deterministic garden changes.
- There is no consumable economy and nothing can be lost.
- Previously unlocked garden elements remain unlocked.
- Repeating an activity remains useful but must not create an overwhelming reward stream.

Example early sequence:

1. First completed activity -> first flower patch blooms.
2. Third completion -> butterfly arrives.
3. Fifth completion -> small pond decoration appears.
4. Eighth completion -> friendly garden creature arrives.
5. Twelfth completion -> special tree blooms.

Exact thresholds are tuning parameters, not curriculum rules.

## Difficulty model

Difficulty should adapt through content selection, not timers or penalties.

Each mini-game exposes a small set of difficulty tiers. The game keeps a lightweight per-activity mastery estimate locally:

- repeated independent success -> gradually offer a harder tier;
- repeated mistakes -> offer an easier example;
- one mistake never triggers a downgrade;
- difficulty changes should be invisible to the child.

The first implementation may use deterministic streak thresholds instead of a sophisticated adaptive-learning model.

## Feedback rules

### Correct action

- immediate animation;
- short positive sound;
- optional spoken encouragement;
- continue without unnecessary modal screens.

### Incorrect action

- no buzzer, red X, score loss, or failure screen;
- gently animate the item back or give a neutral hint;
- repeat the spoken instruction if useful;
- allow immediate retry.

### Completion

- concise celebration;
- reveal reward;
- return to garden quickly.

## Language

MVP language: **English**.

All child-facing text, spoken prompts, labels, and content identifiers must be structured so Portuguese can be added without rewriting game logic.

Text must never be embedded into game-rule code as the only representation of an instruction.

## Parent surface

MVP parent/settings access should be intentionally unobtrusive. It may include:

- sound/music volume;
- language when a second language exists;
- reset progress;
- app/version information.

Destructive actions such as reset should require a simple parent gate rather than a child-friendly single tap.

## Data and privacy

MVP stores only local gameplay state such as unlocks, settings, and lightweight mastery/progress values.

It must not collect:

- name, date of birth, location, contacts, photos, microphone recordings, or identifiers;
- advertising IDs;
- behavioral analytics;
- remote telemetry.

No network permission should be required for gameplay.

## MVP success criteria

The MVP is successful when:

1. It installs and launches reliably on the target Android device.
2. A five-year-old can reach and play an activity without adult explanation after initial orientation.
3. The child can complete at least one activity without reading.
4. A completed activity changes the garden persistently.
5. Closing and reopening the app preserves progress.
6. All four activity types are playable end-to-end.
7. The child can make mistakes without becoming trapped in a failure state.

## Validation questions after first playtests

Observe rather than interrogate where possible:

- Does she understand what is tappable?
- Does she know what to do after hearing/seeing the instruction?
- Which activity does she voluntarily repeat?
- Where does she ask for help?
- Are touch targets large enough?
- Does the garden reward matter to her?
- Does she notice progression?
- When does attention drop?
- Which audio cues delight or annoy her?

These observations should drive the second content iteration before significant feature expansion.
