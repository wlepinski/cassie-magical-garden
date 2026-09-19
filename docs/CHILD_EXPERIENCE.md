# Child Experience and Safety Principles

## Purpose

This document is a product constraint, not optional polish. Cassie's Magical Garden is designed for a young child, so interaction design, content, privacy, and reward mechanics must remain appropriate for that context as the codebase evolves.

## Core principles

### 1. The child should be able to play without reading

Important actions should be communicated with:

- position and scale;
- animation;
- icons/illustration;
- spoken prompts;
- consistent interaction patterns.

Text can reinforce meaning but should not be the only way to discover what to do.

### 2. Mistakes are part of play

Do not introduce:

- losing screens;
- lives/hearts that run out;
- score deductions;
- harsh negative sounds;
- red failure overlays;
- shaming copy;
- forced restart after a wrong choice.

A wrong choice should usually produce a neutral response, a hint, or a retry.

### 3. No artificial urgency

Do not use:

- countdown timers for educational tasks;
- daily streak pressure;
- expiring rewards;
- "come back tomorrow" locks;
- notifications designed to pull the child back;
- scarcity mechanics.

The child can stop at any time without losing progress.

### 4. No monetization directed at the child

The MVP contains:

- no ads;
- no purchases;
- no paid currency;
- no storefront;
- no links to external commercial content.

If the product ever becomes commercial, parent-facing purchase surfaces must be explicitly separated from the child experience and reconsidered from first principles.

### 5. Privacy by default

The application should not request access to:

- camera;
- microphone;
- contacts;
- location;
- photos;
- Bluetooth;
- advertising identifiers;
- unrelated device permissions.

No account is needed for the MVP.

Do not add analytics simply because an SDK makes it convenient. If telemetry is ever proposed, document exactly why it is necessary, what data is collected, its retention, and how the child context changes the decision before implementation.

### 6. Offline is a feature

Once installed, the child should be able to play with airplane mode enabled.

No required remote service should stand between the child and the game.

### 7. Rewards should decorate, not manipulate

Good reward:

> "I helped the garden and now a butterfly lives here."

Bad reward:

> "I need to complete five more rounds before the timer expires so I don't lose my streak."

Persistent cosmetic/environmental progression is preferred over variable-ratio reward schedules.

## Interaction design

### Touch targets

Use large targets with generous hit areas. Visible artwork may be smaller than its interactive hit region where appropriate.

Do not place important controls tightly together.

### Motor precision

When dragging:

- snap generously to valid targets;
- do not require pixel-perfect placement;
- allow slight overshoot;
- return objects smoothly after an invalid drop.

### Waiting

Children should not be forced to wait through repetitive animation. Cosmetic celebration should be interruptible or short.

### Back navigation

Leaving a mini-game accidentally should not erase previously earned progress. Consider confirmation only when it prevents genuine accidental loss; avoid modal friction everywhere else.

## Visual safety

Avoid:

- rapidly flashing content;
- high-frequency strobing;
- visually dense moving backgrounds behind learning tasks;
- tiny decorative motion that competes for attention;
- essential information communicated by color alone.

Use clear silhouettes and strong separation between interactive content and decoration.

## Audio safety and comfort

- Keep default volume moderate.
- Avoid sharp error sounds.
- Avoid continuous high-energy music.
- Give the parent an obvious way to reduce/disable music and sound.
- Spoken instructions must remain intelligible.
- Repeated prompts should not stack over one another.

## Educational content quality

Learning content should be reviewed for ambiguity before release.

Examples:

- a picture used for "B" should have one obvious intended name beginning with B;
- counting scenes should not contain overlapping objects that make one-to-one counting confusing;
- patterns should have exactly one reasonable continuation at the selected difficulty;
- distractors should test the target skill rather than visual trickery.

## Difficulty and frustration

Difficulty should increase slowly from demonstrated success.

If a child repeatedly struggles:

- simplify the challenge;
- reduce distractors;
- provide an additional cue;
- demonstrate the interaction;
- allow success with assistance.

Do not increase challenge merely because of elapsed play time.

## Parent-only actions

Potentially destructive or external actions belong behind a parent gate, including:

- reset all progress;
- open external links;
- future purchases;
- future account management.

MVP parent settings do not need a sophisticated identity system. A simple adult-oriented interaction can be enough, but it should not be accidentally triggered during play.

## Personalization

Using the name "Cassie" in the local title/content is acceptable for this private/family-oriented project, but do not introduce real-world identifying details into:

- game telemetry;
- file names for distributed assets;
- network requests;
- screenshots committed publicly without review.

Do not use a real photograph of a child as an application asset by default.

## Playtest protocol

When testing with a child:

1. Put the device in their hands.
2. Give as little verbal instruction as possible.
3. Observe what they think is interactive.
4. Note where they hesitate, mis-tap, or ask for help.
5. Record product observations, not judgments about the child.
6. Stop if the child is bored or frustrated; do not push for test completion.

Useful notes look like:

- "She tapped the flower three times before noticing the basket."
- "She understood the spoken prompt but didn't recognize that cards could be flipped."
- "She immediately replayed the memory game."

Less useful notes look like:

- "She didn't understand the game."

The goal is to identify the interface/content assumption that failed.

## Review checklist for every new feature

Before merging a child-facing feature, ask:

- Can the child discover it without reading?
- Can a mistake trap or punish the child?
- Does it add urgency or pressure?
- Does it collect any new data?
- Does it request a permission?
- Does it require the network?
- Is the touch interaction forgiving?
- Is the educational answer unambiguous?
- Can the child stop without losing progress?
- Does it preserve the calm garden tone?

A "yes" to a risk question requires explicit design justification in the PR.
