# Game Design

## Design objective

The game should be immediately understandable, emotionally safe, and rewarding in short sessions. A five-year-old should mostly learn through interaction, animation, and voice rather than through menus or written instructions.

The central design constraint is: **reduce cognitive load outside the learning task itself.**

## World structure

The MVP uses one persistent garden hub with four activity locations:

- **Counting Garden** — flower/fruit patch.
- **Letter Meadow** — talking flowers/signs/creatures.
- **Memory Pond** — lily-pad/card matching area.
- **Pattern Path** — stepping stones, lanterns, or flowers arranged as sequences.

The hub is not a free-roaming platformer in the MVP. It should feel explorable, but navigation is tap-based so the game does not require virtual joysticks or precise character movement.

## Main character

The player may be represented by a small friendly avatar, but the avatar is not required to reproduce Cassie's real appearance. The first build can use a generic magical gardener/fairy character.

Important:

- avoid dialog-heavy storytelling;
- use short reactions and expressive animation;
- the character should support the child, not judge performance.

## Session rhythm

A typical three-minute session:

1. Garden appears immediately after launch.
2. A location gently animates to suggest interaction.
3. Child taps it.
4. One mini-game round begins.
5. Child performs 3–5 small interactions.
6. Celebration lasts roughly 2–4 seconds.
7. Reward is applied to the garden.
8. Child returns to the hub.

Avoid mandatory onboarding sequences after the first launch.

## Interaction language

Use a small interaction vocabulary consistently:

- tap;
- drag;
- reveal/flip;
- choose between large options.

Avoid requiring:

- double tap;
- long press;
- small precision targets;
- pinch/zoom;
- gesture combinations;
- reading to discover controls.

## Mini-game 1: Counting Garden

### Fantasy

A creature needs help gathering fruit, stars, flowers, or seeds.

### Basic round

Voice: "Can you pick three strawberries?"

The scene shows 5–8 large objects. Each tap/drag adds an item to the basket and provides a small sensory response.

When the requested count is reached, the game celebrates immediately.

### Difficulty tiers

**Tier 1**
- quantities 1–3;
- small object set;
- spoken request plus visible numeral.

**Tier 2**
- quantities 1–5;
- more distractor objects.

**Tier 3**
- quantities 1–10;
- numeral recognition emphasized.

**Later, not MVP**
- simple addition/subtraction stories;
- compare more/less;
- number ordering.

### Mistakes

If the child tries to exceed the requested quantity, the extra item can gently bounce back and the request may be repeated. Do not frame this as failure.

## Mini-game 2: Letter Meadow

### Fantasy

Flowers/creatures need the right letter or picture to wake up.

### Basic round

Voice: "Can you find the letter B?"

Three or four large choices appear. Selecting the correct option triggers a short animation and sound.

A second mode can ask:

Voice: "Which one starts with B?"

Choices are familiar images such as ball, cat, and sun.

### Difficulty tiers

**Tier 1**
- target uppercase letters;
- 2–3 visually distinct distractors.

**Tier 2**
- 3–4 options;
- somewhat more similar letter shapes.

**Tier 3**
- letter-to-picture initial sound matching.

### Content rule

Pictures must have an unambiguous everyday English name. Avoid examples where regional vocabulary changes the initial sound/name.

## Mini-game 3: Memory Pond

### Fantasy

Magical pond cards/lily pads hide matching creatures.

### Basic round

Tap two cards to reveal them. Matching pairs stay visible and animate; non-matches close again after a short delay.

### Difficulty tiers

**Tier 1**
- 4 cards / 2 pairs.

**Tier 2**
- 6 cards / 3 pairs.

**Tier 3**
- 8 cards / 4 pairs.

No move counter is shown and there is no penalty for repeated reveals.

## Mini-game 4: Pattern Path

### Fantasy

A path has missing stepping stones/flowers/lanterns and needs to be completed.

### Basic round

Example visual sequence:

🌸 ⭐ 🌸 ⭐ __

Three large candidate objects appear below. The child drags or taps the correct continuation.

### Difficulty tiers

**Tier 1**
- AB patterns.

**Tier 2**
- AAB or ABB patterns.

**Tier 3**
- ABC patterns or two missing positions.

The MVP should stop before patterns require counting or abstract symbolic reasoning beyond the intended age range.

## Reward design

### Currency

Use one simple abstract reward: **magic seeds** or **stars**.

The child does not need to manage balances or spend currency in the MVP. Internally, lifetime completions/rewards drive unlock thresholds.

### Garden unlocks

Good rewards are persistent environmental changes:

- a flower patch blooms;
- butterflies appear;
- a bird house is restored;
- a frog moves into the pond;
- a rainbow decoration appears;
- a tree gains blossoms;
- a small magical creature joins the garden.

Each unlock should be visually obvious when it occurs.

### Avoid

- loot boxes;
- randomized reward scarcity;
- streaks;
- countdowns;
- daily bonuses;
- loss of rewards;
- "come back tomorrow" mechanics;
- reward ads;
- pressure to keep playing.

## Guidance system

The game should use escalating hints instead of explicit tutorials.

Example:

1. Wait briefly.
2. Make the relevant object pulse subtly.
3. Replay the spoken instruction.
4. Demonstrate the interaction with a ghost hand/arrow if inactivity continues.

Do not immediately show hints when the child is thinking.

## Audio

Audio is a functional part of the interface.

MVP categories:

- spoken prompts;
- positive confirmation sound;
- neutral retry sound;
- reward/unlock sound;
- subtle ambient garden audio;
- optional music.

Spoken instructions must remain understandable with music enabled. Volume categories should be configurable independently if practical.

## Visual design

Target qualities:

- bright but not visually noisy;
- large silhouettes;
- strong separation between interactive objects and scenery;
- simple backgrounds during mini-games;
- warm expressive animation;
- minimal text;
- no flashing effects.

Touch targets should be substantially larger than standard adult mobile UI targets.

## Pacing

There is no timer visible to the child.

Animations should be quick enough not to block repeated interaction. The game should not frequently force the child to wait for decorative sequences to finish.

## First-launch experience

Target sequence:

1. Logo/title briefly appears.
2. Garden loads.
3. One activity location gently signals itself.
4. On first interaction, a short voice prompt explains the action.
5. Child plays immediately.

Avoid account setup, name entry, permission prompts, or text tutorials.

## Pause / interruption

Android lifecycle interruptions must not punish the child.

If the app backgrounds mid-round:

- preserve enough round state to resume safely where practical; or
- restart only the current small round without losing persistent rewards.

Never remove earned progress because of an app interruption.

## Playtest principle

A child struggling is first treated as evidence about the interface or content, not evidence that the child is "wrong."

For every observed failure, ask in this order:

1. Was the intended interaction visible?
2. Was the prompt understandable?
3. Was the touch target usable?
4. Was the content age-appropriate?
5. Only then: was the challenge genuinely too difficult?
