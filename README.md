# slidev-theme-oriolrius

The oriolrius.me identity for Slidev 52: the square orange frame, Ubuntu type, flat navy "moments" and an
orange band for dividers. It is built for a **1920×1080 canvas** (`canvasWidth: 1920`, 1rem = 16px).

This README is the API. You can write slides from it without reading the source. The living
reference is the showcase deck `test/slides.md`: every snippet below renders there.

- Install it from GitHub, pinned to a release tag, and set `theme: oriolrius` in the headmatter:

  ```bash
  pnpm add slidev-theme-oriolrius@github:oriolrius/oriolriusme-slidev-theme#v0.1.0
  ```

  Keep `shamefully-hoist=true` in the deck's `.npmrc`: Slidev themes resolve `@slidev/client` and `vue` from the
  hoisted root.
- Fonts (Ubuntu, Ubuntu Sans Mono, Yanone Kaffeesatz, Roboto) and Font Awesome 6 Free are bundled, so it
  works offline.
- The logo is placed by the theme itself, on **every** slide: the big framed logo on the cover and the end
  slide, and the **framed logo** (logo_v5: the frame is the brand, and the talk's metaphor) in the footer of
  every other slide (section dividers included), in the variant that matches the surface (orange on
  paper/mist, white letters in an orange frame on navy and photo dividers, all white on the orange band).
- The browser tab and presenter window carry the brand too: the theme sets the favicon (the framed "o", an
  inline SVG, offline-safe) and the title template `%s · oriolrius.me`.

---

## Contents

1. [Headmatter](#1-headmatter)
2. [Surfaces and colour tokens](#2-surfaces-and-colour-tokens)
3. [Typography and markdown elements](#3-typography-and-markdown-elements)
4. [Layouts](#4-layouts): cover, section, code-focus, demo, diagram, end, concepts, cards, four-grid, and the
   restyled default, center and two-cols-header
5. [Theme components](#5-theme-components): Terminal, QuoteCard, Ts, Tag, QrCode
6. [Deck components](#6-deck-components-in-the-decks-components): BranchRail, HarnessParts, Verdict
7. [CSS classes](#7-css-component-classes)
8. [Global layers: footer and progress hairline](#8-global-layers)
9. [Clicker and shortcuts](#9-clicker-and-shortcuts)
10. [Rules that keep slides pixel-perfect](#10-authoring-rules-read-before-writing-a-slide)
11. [Build, export and verify](#11-build-export-verify)

---

## 1. Headmatter

```yaml
---
theme: ./theme
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1920
transition: fade           # the theme default (the brand allows fade only); you may omit it
mdc: true
css: unocss
codeCopy: false            # projector talk: no copy buttons
fonts:
  provider: none           # fonts are bundled by the theme
themeConfig:
  primary: '#FF6600'       # Slidev's presenter UI (v-mark strokes are themed by CSS, see §7)
  footer: 'The Agent That Lied'   # short title in the footer (omit to show only logo + page)
  video: 'C_GG5g38vLU'     # default YouTube id for <Ts>
  clicker: clicks          # PageDown/PageUp step clicks ('slides' = one press, one slide)
  pageTotal: 35            # footer shows "n / 35"; slides beyond it use `appendix: true`
layout: cover
---
```

**Per-slide frontmatter keys read by the theme**

| Key | Effect |
|---|---|
| `appendix: true` | The footer shows `Appendix` instead of `n / N`. |
| `footer: false` | Hides the footer on that slide. That also removes the logo: avoid it (brand rule: the logo is on every slide). |
| `progress: false` | Hides the top progress hairline on that slide. |
| `class: surface-mist` | The mist `#F4F4F4` surface. On `two-cols-header` put it in `layoutClass`. |
| `transition: …` | The theme's default is `fade` (the site's only motion). Override per slide only for a reason. |

---

## 2. Surfaces and colour tokens

Every rule reads **role tokens**. A surface class re-points them, so boxes, chips and callouts all adapt.

| Surface | How you get it | Background | Titles | Body | Orange text < 24px | Orange text ≥ 24px |
|---|---|---|---|---|---|---|
| paper (default) | nothing | `#FFFFFF` | slate `#54595F` | `#575757` | `#C95000` | `#E85A12` |
| mist | `class: surface-mist` | `#F4F4F4` | slate | `#575757` | `#BE4C00` | `#E85A12` |
| navy | `cover`, `demo` layouts, photo dividers | `#151652` | white | `#F4F4F4` | `#FF8533` | `#FF8533` |
| band | `section`, `end` layouts | `#F46524` | white (only ≥ 48px bold) | navy | navy | navy |

**Two orange inks.** Small orange text (links, `<Ts>`, labels) needs 4.5:1, so it is the brownish `#C95000` /
`#BE4C00`. Large orange text (≥ 24px: `h3`, `.or-stat` numbers, `.or-predict` letters, the code-focus kicker) only
needs 3:1 (WCAG AA-large), so it takes `--or-accent-text-large` = `#E85A12`: 3.56:1 on white, 3.23 on mist,
3.27 on the peach tint, and the closest AA-large ink to the brand `#F46524` (which is 2.84 on mist). It sits under
a `#FF6600` icon without the old two-tone mismatch.

**Surface islands.** Any element inside a slide can carry a surface class too:
`<div class="surface-navy p-8">…</div>`. It repaints its background and re-points the tokens for its children.

**Colour utilities** (UnoCSS). Use these instead of `style="color: …"`:
`text-or-accent` (orange, non-text glyphs such as hero icons), `text-or-accent-text` (orange text, contrast-safe),
`text-or-navy`, `text-or-slate`, `text-or-body`, `text-or-muted`. The `bg-or-*` and `border-or-*` forms exist
for the same names.

**Role tokens you can use in custom CSS:** `--or-bg`, `--or-fg-title`, `--or-fg-body`, `--or-fg-muted`,
`--or-fg-dim` (de-emphasised text ≥ 24px only: `#7A7A7A`, the site's own body grey, on paper and mist; `#8C8FBF` on
navy), `--or-accent`, `--or-accent-text`, `--or-accent-text-large`, `--or-pass`, `--or-line`, `--or-card-bg`. The raw palette is
`--or-orange #FF6600`, `--or-orange-brand #F46524`, `--or-navy #151652`, `--or-slate #54595F`, and so on (see
`styles/tokens.css`).

**Small orange text on tinted boxes.** The tints of callouts and `or-box` drop `#C95000` / `#BE4C00` to
3.8-4.2:1. That is fine for their ≥ 24px h3 and `strong` (large text, needs 3:1) but not for the 18px `<Ts>` chip
or a 22px link on a dense slide. Inside `.callout` and `.or-box` the theme therefore sets
`--or-ink-small: var(--or-orange-ink-deep)` (`#A84300`, ≥ 4.6:1 on every tint) and uses it for `<Ts>` and links.
On navy it stays `#FF8533`. You get this automatically; don't colour those by hand.

**PASS green follows the surface too.** `--or-pass` is `#0C8760` on paper (4.52:1), `#0A7C58` on mist (4.73:1;
the paper green drops to 4.11 there) and `#3CCB98` on navy (8.03:1). `.or-chip.pass` and the deck's `<Verdict
kind="works">` read it, so they stay AA at 20px on every surface.

---

## 3. Typography and markdown elements

| Element | Renders as |
|---|---|
| `# h1` | The slide title: Ubuntu 700, 56px, slate, with a 140×4px orange rule under it. It stays 56px when `dense` (one title size across the deck); 72px on `section`, 104px on `cover`. **Keep it to one line (≤ ~45 characters).** |
| `## h2` | The **lead / subtitle**: Ubuntu 500 italic, 34px. It has no underline. |
| `### h3` | Box, card and concept titles: Ubuntu **500** in the large orange ink `#E85A12`. A leading `<i class="fas …">` icon turns orange. |
| paragraph / list item | Ubuntu 300, 28px, `#575757` (24px @400 in dense layouts and 4×2 concepts; 26px in one-row cards). Wraps `pretty` (no one-word last line). **Add the Uno class `text-balance` to short copy (≤ 3 lines) to even the lines**; the theme's `text-wrap` sits at (0,1,0), so `text-balance` / `text-pretty` win. |
| `- list` | The site's orange `fa-angle-right` chevrons. Nested items get a 10px orange square. |
| `1. list` | Roboto numbers in orange ink. The item text starts at the same x as a bullet list's. |
| `**strong**` | 700 in the title colour. |
| `[link](url)` | Orange ink, underlined. Add `{.or-url}` (MDC) to keep a URL on one line. |
| `` `code` `` | A quiet mono chip that **never wraps** (`white-space: nowrap`) and never goes below 20px. |
| `> quote` | Italic, with a 6px orange left bar and no background. |
| table | A **slate** header row (`#54595F`, white text 7.07:1; navy is kept for dark moments) in Roboto 500, 22px cells, hairline rows, and the first column in medium slate. A first cell that starts with an icon (`<i class="fas fa-shield-halved"></i> Guardrails`) never wraps between icon and label; header icons are white. Inline code in a header cell is plain white mono (no chip). Row padding reads `--or-th-py` / `--or-td-py` (see `.or-table` in §7). |
| fenced code | A navy block with a 4px orange left bar, Ubuntu Sans Mono 24px, and brand syntax colours (every token ≥ 6.28:1). |

**Code blocks**

- Click-through highlighting: ` ```ts {2|5|6-9|all} `. Dimmed lines go to 50% (still legible, so the function
  keeps its shape), and the current step gets an orange marker. **Always end on `all`**, so the PDF (which shows
  the final state) is complete.
- Magic-move: ` ````md magic-move {lines: true} ` with inner ` ```ts ` blocks. It uses the same colours.
- Size: 24px by default. On `code-focus` use `codeSize: 22` (lines up to ~125 characters fit the full width), `21`
  (a 12-line block plus a dense bottom) or `20`.
  Anywhere else, wrap the block in `<div class="or-code-22">` or `<div class="or-code-20">`. On `two-cols-header`
  a frontmatter `class: or-code-20` applies to both columns. **Never go below 20px.**

**Glyphs.** Arrows `→ ← ⇒` and checks `✓ ✗` come from a bundled "Or Symbols" subset (the brand fonts lack them),
so they render the same on every PC. In code they keep the monospace grid.

**Hyphenated words.** Ubuntu has no non-breaking hyphen (U+2011), and balanced text (leads, section subtitles)
may break a line right after a hyphen ("built-" / "ins"). Keep such a word whole with
`<span class="whitespace-nowrap">built-ins</span>`.

---

## 4. Layouts

Every custom layout root carries `slidev-layout <name>`. The same padding (64 / 96 / 88 px) keeps titles aligned
across layouts, and lists and markdown work inside every slot. **The content line is y = 992**: 30px above the
footer's framed logo (y 1022), so a boxed panel (a callout, a card, a QuoteCard) that ends on it never presses
against the logo.

**Slot syntax reminder.** `::name::` on its own line starts a named slot, and everything until the next marker goes
into it. Content before the first marker is the default slot. Inside HTML blocks, leave blank lines around
markdown.

### 4.1 `cover`: the navy opener (brand board A)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kicker` | string | `''` | Yanone uppercase eyebrow, orange. |
| `portrait` | `'default'` \| `'none'` \| URL | `'default'` | `default` = the theme's round photo with an orange ring, 760px, **bleeding off the bottom-right corner** (right and bottom, as in brand board A), so the cut reads as deliberate; the face stays fully visible. |
| `logo` | `'default'` \| `'none'` | `'default'` | Framed oriolrius.me logo (white letters, orange frame), bottom-left. |

| Slot | Content |
|---|---|
| default | `# Title` (104px white, 4px orange rule) + **one paragraph** = the lead (34px italic). |
| `meta` | `Oriol Rius · oriolrius.me` (Ubuntu 500, 28px: the same family as the credit under it, and larger). |
| `credit` | The source-talk line (22px, navy-300). Keep it to one line (~95 characters). |

```md
---
layout: cover
kicker: "AI ENGINEERING · HARNESS ENGINEERING"
portrait: default
---

# The Agent That Lied

Harness engineering: same model, same prompt, different outcome

::meta::
Oriol Rius · oriolrius.me

::credit::
Based on Tejas Kumar (IBM), "Harnesses in AI: A Deep Dive" · AI Engineer Europe 2026
```

It shows no footer and no progress hairline. The title fits one line up to about 20 characters at 104px (the text
column is 62% of the content width, 1071px), then wraps (balanced). The portrait asset is 840px: crisp on a 1x
projector, slightly soft in 2x PNG exports (no larger original exists yet).

### 4.2 `section`: the orange band divider (brand board C) or the dark photo band (board D)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `part` | string | `''` | Yanone kicker above the frame, e.g. `"PART 02"` (navy on the band, orange on a photo). |
| `image` | URL | `''` | A deck photo (`/images/oriol-tedxalcoi.jpg`): the divider becomes a **dark photo band**, the site's TEDx / workshop bands: the photo under a black overlay, a white title in an **orange** frame, a light subtitle. |
| `overlay` | 0–1 | `.62` | Black overlay opacity over the photo (the site uses .56–.75). |
| `imagePosition` | CSS `background-position` | `'center 40%'` | Where the photo is anchored. A 3:2 photo covering the 16:9 slide has ~200px of vertical play (none horizontally): `'center top'` shows its top edge, `'center 70%'` its lower part. Check the footer: the framed logo must not land on a bright part of the photo. |
| `align` | `'center'` \| `'left'` | `'center'` | `left` = the site's **hero split**: kicker, frame and subtitle left-aligned at the content edge (x 96), the frame hugging its title (at most 968px; a longer title wraps, balanced and centred in the frame). For a photo whose subject stands on the right half. The y geometry (kicker 352, frame 416) is unchanged. |

| Slot | Content |
|---|---|
| default | `# Title` (write sentence case; CSS uppercases it) + an optional subtitle paragraph (navy italic; `#F4F4F4` on a photo). |
| `rail` | Optional content 3rem below, e.g. `<BranchRail show-commits />`. |

```md
---
layout: section
part: "PART 02"
---

# Same model, same prompt

Five branches. Zero prompt changes.

::rail::
<BranchRail show-commits />
```

The title sits in a white 4px square frame, at least 968px wide. Keep it to about 26 uppercase characters so
it stays on one line. **The frame draws itself** on entry (0.9s, a clockwise sweep: the harness closes around the
title); exports, print and `prefers-reduced-motion` show it complete. The subtitle is **never wider than the
frame** (it wraps, balanced, inside the frame's width).

**Fixed geometry.** The PART kicker starts at y = 352 and the frame at y = 416 on every divider, with or without a
rail and whatever the subtitle length, so nothing jumps from one part to the next; the rail hangs below.

The footer shows in its **band variant** (white framed logo, navy text), so the logo is there too; the progress
hairline turns navy. On a photo divider the footer takes its dark variant and the hairline stays orange.

```md
---
layout: section
part: "PART 04"
image: /images/oriol-tedxalcoi.jpg
align: left              # text on the dark left half; the speaker stands on the right
---

# Your harness

You already run one.
```

A centred frame on a photo sits wherever the photo's subject happens to be (on the TEDx photo it capped the
speaker's head). Place the text with `align` first; move the photo with `imagePosition` only when the subject is
not on one side.

### 4.3 `code-focus`: one code block as the hero

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kicker` | string | `''` | Left of the rail row. The part after the first ` · ` stays in its own case, in italics, **if it is not all caps** (a commit message): `"BRANCH 3 · Fix lies"`. An all-caps kicker stays all Yanone. |
| `source` | string | `''` | Credit line. It is rendered **in the footer row** (right-aligned, before `n / N`, level with the framed logo) in Roboto 500 18px (a sanctioned sub-20px meta text) with the prefix `code:`, so it costs no vertical space. Keep it under ~110 characters: an ellipsised source fails the probe. |
| `codeSize` | 20–24 | `24` | Code font size in px: 24, 22 (long lines), 21 (a 12-line block plus a dense bottom). |
| `harness` | 0–4 | `0` | **"The frame is the harness"** (brand hook 1) on the story's hero, the code. The block's orange frame closes as the branches add harness: `0` = the brand's left bar only, `1` = + top, `2` = + top + right, `3` = closed, `4` = closed, and the frame **draws itself** on entry (the dividers' sweep; complete in exports and with reduced motion). Drawn with inset shadows: it never changes the block's size. |

| Slot | Content |
|---|---|
| `rail` | The right side of the rail row: `<BranchRail compact />`, `<HarnessParts …/>`. |
| default | `# Title`, then **one** fenced block or magic-move block. |
| `bottom` | Pins, a chip row, a strip image, a callout, a `<Terminal>`, a `<QuoteCard>`. Items sit 1.25rem apart, at least 1.25rem under the code. **A trailing `callout plain` ("In plain words") is anchored on the content line**, so it sits at the same y on every code slide, and **the items above it are centred as a group** between the code and the strip: spare height splits evenly above and below them instead of leaving one hole over the strip (dense slides have no spare height, so nothing moves). A wrapper with class **`or-grow`** takes the spare height instead: its `.or-box` children stretch to the strip, their content centred (a row of boxes under a short prompt). A strip image is the one item that yields (it shrinks rather than push the strip into the footer). A QuoteCard here points **up** (`pointer` auto) and gets .75rem above for it. A bare `###` here is 30px, the same as the `###` of an `.or-box` beside it. |

**Rail before title.** You may write `::rail::` first and the title right after it (as in the outline). The layout
moves everything from the first `# h1` onward into the body. Writing `::default::` after the rail components also
works.

````md
---
layout: code-focus
kicker: "BRANCH 0 · Simplify"
source: "agent/5-loop.ts · branch 0 · simplified as in the author’s blog · MIT"
codeSize: 22
harness: 0
---

::rail::
<BranchRail :current="0" compact />
<HarnessParts :active="['tools','model','context','loop']" :missing="['guardrails','verify']" />

# Branch 0: the whole agent in 11 lines

```ts {2|5|6-9|all}
while (true) {
  …
}
```

::bottom::
<div class="or-pins cols-3 is-large">
<p><span class="or-step">1</span> Ask the model, sending the conversation and the tool menu</p>
<p><span class="or-step">2</span> The <strong>only</strong> exit, and it believes the model</p>
<p><span class="or-step">3</span> The model only <em>asks</em> for a tool; our code runs it</p>
</div>

<div class="callout plain"><p><strong>In plain words:</strong> ask the model, do what it asks, repeat until it says “done”.</p></div>
````

**Title rhythm.** The title block is the same as `demo`'s (h1, a rule .75rem under it, 24px to the code), so the
title and its rule don't jump on a code → demo fade.

**Vertical budget (measured, content line 992).** A 12-line block at 21px plus a two-row chip row, a QuoteCard and a
one-line plain callout fits exactly with `pointer="none"` on the QuoteCard; with its (auto, up) pointer the card's
extra .75rem overflows by ~7px (then use `codeSize: 20`). A 12-line block at 22px plus a chip row, a 3-line `<Terminal>` and a strip
overflows by ~8px: use `codeSize: 21`. A 12-line block plus a strip image and a one-line callout fits: the image
shrinks to what is left. An 11-line block at 24px plus two-line pins leaves ~160px, split above and below the pins;
use `or-pins is-large` (28px) there. With a strip image, keep the callout to one line (≤ ~110 characters at 26px). An
image placed directly in `bottom` is `width: 100%; max-height: 24vh` automatically.

### 4.4 `demo`: the navy "moment" for demo runs

| Prop | Type | Default | Notes |
|---|---|---|---|
| `chip` | string | `''` | Outlined chip in the rail row, e.g. `"BRANCH 0 · RUN"`. |
| `live` | boolean | `false` | `false` → a `REPLAY` prefix (clock icon). `true` → `LIVE`, a solid orange cell with a pulsing square (frozen in exports). |

| Slot | Content |
|---|---|
| `rail` | Right side of the rail row (content from the first `# h1` onward goes to the title). |
| default | `# Title` (white). |
| `terminal` | The left 58%, normally a `<Terminal>`. |
| `side` | The right 42%, **exactly as tall as the terminal** (both columns end on the same line): `<div class="or-predict">…</div>` (its rows spread over that height) or an image (white background, centred both ways, never taller than the terminal or 520px). |
| `verdict` | A full-width row at the bottom: `<Verdict>`, `<div class="or-stat">`, `<QuoteCard>` (it wraps; the QuoteCard takes the remaining width). |

````md
---
layout: demo
chip: "BRANCH 0 · RUN"
live: false
---

::rail::
<BranchRail :current="0" compact />

# Run it: place your bets

::terminal::
<Terminal title="npm run agent · branch 0" illustrative>

```text
$ git switch 0 && npm run agent
…
```

</Terminal>

::side::
<div class="or-predict">
<p><b>A</b> It upvotes the story</p>
<p><b>B</b> It crashes with an error</p>
<p class="is-answer"><b>C</b> It fails, and says it succeeded</p>
</div>

::verdict::
<v-click>
<Verdict kind="lies" />
<QuoteCard who="Tejas Kumar" t="09:44">it just clicks the upvote button and then considers it a success.</QuoteCard>
</v-click>
````

**Resolving the bet.** Mark the right row with `class="is-answer"`: `<p class="is-answer"><b>C</b> It fails, and says
it succeeded</p>`. Nothing gives it away at first; **as soon as a v-click in the `verdict` row is revealed**, the
answer's letter fills orange (navy letter) and the other rows step back in role colours: text and letter in
`--or-fg-dim` (`#8C8FBF` on navy), the letter frame in `--or-line` (`#3D3F99`). No opacity, so the orange never
turns brown over navy. The PDF shows that resolved state. Outside
`demo`, add `is-resolved` to the `.or-predict` yourself.

The footer switches to its light-on-navy variant (white letters, orange frame). Without a `side` slot, the terminal
takes the full width. Terminal lines longer than the column wrap at the window edge, as a real terminal does; the
cold open can use `<Terminal size="24">` when its lines fit.

### 4.5 `diagram`: a title and one full-width diagram

| Prop | Type | Default | Notes |
|---|---|---|---|
| `image` | string | `''` | A deck URL, e.g. `/diagrams/harness-timeline.png`. |
| `alt` | string | `''` | **Required:** the diagram in prose (a long description). |
| `maxHeight` | CSS length | `'56vh'` | For example `50vh` or `46vh`. |

| Slot | Content |
|---|---|
| default | `# Title` (may end with an inline `<Tag>`). |
| `caption` | One centred line under the figure (22px, muted): `<Ts>` chips and sources. |
| `bottom` | A callout. |

```md
---
layout: diagram
image: /diagrams/double-upvote-timeline.png
alt: "Reconstructed six-iteration timeline of the winning run. …"
maxHeight: 50vh
---

# Plot twist: did it vote twice? <Tag kind="inference" note="strong evidence" />

::caption::
<Ts t="17:05" /> "it logged in and it upvoted the first one" · <Ts t="17:11" /> "…rank two"

::bottom::
<v-click>
<div class="callout warning"><p><strong>Verifiers are code, and code has bugs.</strong> …</p></div>
</v-click>
```

The surface is paper (diagrams are exported on white), and the image is `.zoomable`.

### 4.6 `end`: the closing orange band

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kicker` | string | `'THANK YOU · QUESTIONS?'` | Navy Yanone, 48px. |
| `qr` | URL | `''` | A 300px QR code (navy on a white tile with a 4-module quiet zone, white frame), bottom-right, scannable from the back of the room. It is also a **link** (clickable in the PDF). |
| `qrLabel` | string | `''` | One line under the QR code (≤ ~26 characters). |
| `quoted` | boolean | `true` | The layout adds the curly quotes around the closing quote and **hangs the opening one in the margin**, so both lines start flush with the kicker. **Don't type the marks**; typed ones are detected and not doubled (the opening one still hangs). `quoted: false` for a statement that is not a quotation. |

| Slot | Content |
|---|---|
| default | 1st paragraph = the closing quote (white Ubuntu 700, 64px, ≤ 2 lines of ~45 characters; the column is 1440px, and a `<br>` places the break). 2nd paragraph = the attribution (navy italic). |
| `links` | `<span class="or-chip on-band">…</span>` chips, or `<a class="or-chip on-band" href="…">` links (no underline). |

```md
---
layout: end
kicker: "THANK YOU · QUESTIONS?"
qr: "https://github.com/TejasQ/basically-ai-harness"
qrLabel: "Run branches 0 → 4 tonight"
---

The model brings the intelligence.<br>The harness is what makes it trustworthy.

Tejas Kumar · “What Is an Agent Harness?” (tej.as, 2026-09-14)

::links::
<a class="or-chip on-band" href="https://oriolrius.me"><i class="fas fa-globe"></i> oriolrius.me</a>
<span class="or-chip on-band"><i class="fab fa-github"></i> github.com/TejasQ/basically-ai-harness</span>
```

The layout also draws the white framed logo (top-right) and Oriol's sign-off bottom-left: the Bitmoji-with-coffee
avatar with his white signature beside it (it signs the talk, not the quoted author). There is no footer.

### 4.7 `concepts`: the icon-box grid (the site's consultoría triad)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `cols` | 1–4 | `3` | |
| `rows` | 1 \| 2 | `1` | |
| `align` | `'center'` \| `'left'` | centre for 1 row, left for 2 | One row is centred like the site's consultoría triad; two rows read as a left-aligned grid. |
| `panels` | boolean | `false` | Every item becomes a flat panel (card surface, 6px orange top bar, 2.5rem × 2.25rem padding). The panels **fill the band between the title and the footer rule**, and each panel's content is centred vertically as a group while the tiles and headings of a row stay level (the panels of a row share their tracks through CSS subgrid). Use it when a one-row slide would otherwise float in empty page. |

| Slot | Content |
|---|---|
| `title` | `# Title` (+ an optional lead paragraph). |
| `icon1` … `icon8` | A bare `<i class="fas fa-…"></i>`: the layout puts it in a **square framed tile** (orange 3–4px frame, peach fill; white on mist), sized by the table below (`four-grid` uses a smaller 64px tile with a 2px outline). |
| `concept1` … `concept8` | `### Heading` + `<p>` text (lists work too; `<p class="or-aside">` for a secondary line). **Concept text wraps balanced** (short copy: even lines, no orphan); no slide `<style>` and no `whitespace-nowrap` spans needed. |
| `footer` | One centred line under a 140×4px orange rule (the title rule's accent), 22px muted. |

| cols×rows | tile / glyph | h3 | text |
|---|---|---|---|
| 1×1, 2×1, 3×1 | 128 / 56px (4px frame) | 44px | 32px @300 |
| 4×1 | 112 / 48px (4px frame) | 36px | 28px @300 |
| 2×2 | 112 / 48px (4px frame) | 40px | 28px @300 (840px columns) |
| 1×2, 3×2 | 96 / 44px (3px frame) | 36px | 28px @300 (two rows of ~250px) |
| 4×2 | 80 / 36px (3px frame) | 28px | 24px @400 |

```md
---
layout: concepts
cols: 3
rows: 2
class: surface-mist
---

::title::
# The six parts of an agent harness

::icon1::
<i class="fas fa-toolbox"></i>

::concept1::
### Tool registry
<p>What it can do. The model only asks; your code runs it.</p>

::footer::
Names and order: Tejas Kumar <Ts t="04:12" />
```

Only cells with an icon or concept slot render. The grid is vertically centred (with `panels`, it fills).

### 4.8 `cards`: pricing-style cards

| Prop | Type | Default | Notes |
|---|---|---|---|
| `cols` | 2 \| 3 | `3` | `1` is clamped to 2 and anything above 3 to 3. |
| `rows` | 1 \| 2 | `1` | Up to 6 cards. |
| `tone` | `'orange'` \| `'slate'` \| `'navy'` | `'orange'` | The header colour for every card. |
| `card1Tone` … `card6Tone` | same | — | Per-card override (e.g. `card6Tone: navy` for the "rule" meta-card). |

| Slot | Content |
|---|---|
| `title` | `# Title` |
| `icon1` … `icon6` | A bare `<i class="fas fa-…">` in the header band. |
| `card1` … `card6` | `### Heading` + `<p>`. **The first `###` is lifted into the header band**, next to the icon (as on the site's pricing cards and brand board E); the body starts with the text. A trailing `<span class="or-chip">` is pinned to the card bottom, aligned across cards; a trailing `<QrCode>` is centred in the space left under the text. Links never wrap. |
| `footer` | One centred line (22px, muted). |

| Tone | Head band | Title + icon | Body |
|---|---|---|---|
| `orange` | `#F46524` | navy, 30px Ubuntu 700 (5.31:1; brand: no white under 48px on orange) | `#F4F4F4` (white on `surface-mist`) |
| `slate` | `#54595F` | white (7.07:1), for critique | the same |
| `navy` | navy | white title, `#FF8533` icon | a navy card with white text and a 4px orange frame |

The header band is at least 72px; a two-line title grows it, and **every band of that row grows with it** (CSS
subgrid), so the bodies stay aligned. Body text is 26px (1 row) or 28px (2 rows: the body size, so two-row cards read
as short paragraphs, not two lines over an empty band). Cards stretch to equal heights and end on the content line.

```md
---
layout: cards
cols: 3
rows: 2
card6Tone: navy
---

::title::
# Five things to take home

::icon1::
<i class="fas fa-magnifying-glass"></i>

::card1::
### A claim is not evidence
<p>The model’s “done” is a claim. Verify in code, against the trace or the world.</p>
<span class="or-chip">Verify</span>
```

### 4.9 `four-grid`: a 2×2 board with axis labels

| Prop | Type | Default | Notes |
|---|---|---|---|
| `colLabels` | `[string, string]` | `[]` | Top labels. Text after ` · ` is lighter: `"COMPUTATIONAL · deterministic"`. |
| `rowLabels` | `[string, string]` | `[]` | Left labels, written vertically (bottom to top). |
| `align` | `'center'` \| `'start'` | `'center'` | Where each quadrant's content sits vertically: centred (level with its row label) or pinned to the top. Icon and heading stay top-aligned with each other either way. |

| Slot | Content |
|---|---|
| `title` | `# Title` + an optional `<p class="or-lead">` (26px here). |
| `icon1` … `icon4` | A bare `<i class="fas fa-…">` (64px square orange tile). |
| `q1` … `q4` | `### Heading` (30px) + `<p>` (26px, balanced) + an optional `<p class="or-aside">`. Order: q1 top-left, q2 top-right, q3 bottom-left, q4 bottom-right. |
| `callout` | A callout pushed to the bottom. |

```md
---
layout: four-grid
colLabels: ["COMPUTATIONAL · deterministic", "INFERENTIAL · a model judges"]
rowLabels: ["GUIDES · before it acts", "SENSORS · after it acts"]
---

::title::
# Guides before, sensors after

<p class="or-lead">Birgitta Böckeler, “Harness engineering for coding agent users” (martinfowler.com, 2026-04-02)</p>

::icon1::
<i class="fas fa-gears"></i>

::q1::
### Computational guide
<p>Scripts, codemods, LSP, the harness doing the step itself.</p>
<p class="or-aside">Demo: the login handler</p>

::callout::
<div class="callout note"><p>“…” <strong>Böckeler</strong></p></div>
```

### 4.10 Built-ins (restyled)

**`default`** applies the base rules only. It is the right layout for tables (up to 7 rows including the header) and
for the appendix (`appendix: true`).

**`center`** is for hooks, statements and stats.
- Content is centred in a flex column.
- The h1 may use the full width (it stays on one line, even with an inline `<Tag>`), and its rule is centred.
- Paragraphs, h2 and asides keep a 1200px measure with balanced wrapping.
- A paragraph holding only a hero icon (`<i class="fas fa-circle-question text-8xl text-or-accent"></i>`) is tightened.
- An `.or-stats` row right under the h1 gets 1.5rem more room (the Yanone "$" rises above its .9 line box, so the
  title rule would otherwise sit on the numerals); `.or-stats` keeps 2rem below it for the caption line that follows.
- Blockquotes stay left-aligned (max 960px).
- With no h1 (a framed statement), set `title:` in frontmatter so the slide has a name.

```md
---
layout: center
---

# Your agent lies. What’s your first fix?

<i class="fas fa-circle-question text-8xl text-or-accent"></i>

<v-click>
<div class="flex justify-center gap-6 mt-8">
<span class="or-chip is-struck">Prompt it harder</span>
</div>
</v-click>
```

**`two-cols-header`** has a 48px column gap by default (widen it with `layoutClass: gap-x-16`: the theme's gap sits at
(0,1,0), so the Uno utility wins), and columns can't be widened by long content.
- **Frontmatter `class` goes to the columns; `layoutClass` goes to the root.** So write `layoutClass: dense` for the
  appendix, and `layoutClass: surface-mist` for a mist slide.
- Images in a column are `width: 100%; max-height: 72vh; object-fit: contain`.
- A code block that opens a column has no top margin, so it lines up with the first element of the other column.
- `::bottom::` sits at the bottom, 1.5rem below the columns.
- `dense` turns body to 24px @400 and h3 to 28px, with tighter lists and tables; **the h1 stays 56px** (one title
  size across the deck). The label column of dense tables never wraps.

```md
---
layout: two-cols-header
layoutClass: dense
appendix: true
---

# Builder checklist, part by part

::left::
<ul class="or-checklist">
<li><strong>Before:</strong> write “done” as a check …</li>
</ul>

::right::
…
```

---

## 5. Theme components

These are auto-registered, with no import needed.

### `<Terminal>`

| Prop | Type | Default |
|---|---|---|
| `title` | string | `''` |
| `illustrative` | boolean | `false`: adds an `ILLUSTRATIVE` `<Tag>` at the right of the title bar |
| `size` | `20` \| `22` \| `24` | `20`: the code size in px. Use 24 when the terminal **is** the evidence the room must read (the cold open) and its lines fit; 22 for a run whose longest line fits once indents are trimmed. |

A dark window: a 40px bar with three square dots and the title (Roboto 18px), then **one fenced `text` block**. The
code is on navy-900 with a 2px navy-500 border and no orange bar. It looks the same on paper and on navy. Long
lines wrap at the window edge (trim deep indents so they don't).

````md
<Terminal title="npm run agent · branch 4" size="22" illustrative>

```text
$ git switch 4 && npm run agent
[harness] Login completed - agent can continue
```

</Terminal>
````

Keep the blank lines around the fence.

### `<QuoteCard>`

| Prop | Type | Notes |
|---|---|---|
| `who` | string | Rendered in bold orange ink. |
| `t` | `mm:ss` | Adds a `<Ts>` chip linking to that second. |
| `src` | string | Used when `t` is absent: `(blog)`. |
| `pointer` | `'auto'` \| `'down'` \| `'up'` \| `'none'` | Default `auto`: **up** when the card sits in a bottom slot (`demo` verdict, `code-focus` / `diagram` bottom, `two-cols-header` bottom, `four-grid` callout), **down** elsewhere. A bottom card's down-pointer aimed at the footer's framed logo (it read as if oriolrius.me were the speaker) or stabbed the "In plain words" strip; up, it points at the content the quote comments on. `none` = a plain framed quote (no pointer, no extra margin). |

This is the site's testimonial box: a 2px `#FF6600` outline (the non-text accent, like every frame; `#FF8533` on
navy) and a diamond pointer on the left (its tip hangs ~11px outside the box; the card keeps .75rem of room on
that side). The text is Ubuntu 300 italic 28px, and the typographic quotes are added for you. **Don't type quote
marks.**

```md
<QuoteCard who="Tejas Kumar" t="09:26">So we hit a login screen and then it kinda panicked and crashed. But look, it lies.</QuoteCard>
<QuoteCard who="Tejas Kumar" src="blog">A model saying it finished is a claim, not evidence.</QuoteCard>
<QuoteCard who="Tejas Kumar" t="16:51" pointer="none">So the harness is literally harnessing the agent…</QuoteCard>
```

### `<Ts>`

| Prop | Type | Notes |
|---|---|---|
| `t` | `mm:ss` or `h:mm:ss` | |
| `v` | string | YouTube id; defaults to `themeConfig.video`. |

It renders `▶[mm:ss]` as a small outlined chip linking to `youtube.com/watch?v=<v>&t=<seconds>s`. It stays clickable in
the PDF. At 18px it is the one sanctioned sub-20px text.

```md
“Your dog doesn’t go and bankrupt you with tokens.” <Ts t="03:36" />
```

The chip is raised `.22em`, so its box centres on the x-height of 22–32px text.

### `<Tag>`

| Prop | Type | Notes |
|---|---|---|
| `kind` | `'inference' \| 'self-reported' \| 'opinion' \| 'illustrative'` | The icon comes from the kind. `inference` has a **dashed** outline. |
| `note` | string | Appended: `INFERENCE · STRONG EVIDENCE`. |

A confidence label (Roboto 20px uppercase, muted outline). Put one on every claim that is not verified fact. It sits
inline, even inside an h1:

```md
# Plot twist: did it vote twice? <Tag kind="inference" note="strong evidence" />
# Harnesses cost money, and they go stale <Tag kind="self-reported" />
```

### `<QrCode>`

| Prop | Type | Default |
|---|---|---|
| `value` | URL | — |
| `size` | number (px) | `200` |
| `dark` | colour | `#151652` |
| `light` | colour | `#0000` (transparent) |

An offline SVG QR code with error correction M and no quiet zone (give it one: a white tile or padding of ~4
modules). Inside `cards` a trailing QR is centred in the space left under the text. On `end` the layout renders it
for you (300px, quiet zone, a link).

```md
<QrCode value="https://github.com/TejasQ/basically-ai-harness" />
```

---

## 6. Deck components (in the deck's `components/`)

These are the talk's own vocabulary, not part of the theme. `test/components/` has copies for the showcase.
**The full API (every prop, state table and colour per surface) is in the deck's `components/README.md`.** Summary:

| Component | Props | Notes |
|---|---|---|
| `<BranchRail>` | `current?: 0–4 \| null`, `compact?: boolean`, `showCommits?: boolean` | `compact` = 40px nodes, the same height as the `HarnessParts` tiles, for the rail row. Labelled form (44px nodes, 22px labels, 17rem steps) for the section band; `showCommits` adds the real commit messages. Past = slate on paper (`#F4F4F4` on navy, white on the band), current = orange (navy on the band), future = outlined. |
| `<HarnessParts>` | `active?: Part[] \| 'all' \| string`, `new?: Part[]`, `missing?: Part[]` | Six 40px tiles in slide-10 order. Active = orange, new = orange frame + one pulse (frozen in exports), missing = dashed + `×` badge, inactive = muted 40%. |
| `<Verdict>` | `kind: 'lies' \| 'honest' \| 'works'`, `note?: string`, `inline?: boolean` | Stamp: 5px frame, Roboto 40px uppercase, −3° (`honest` is `#F4F4F4` on navy). `inline` = 20px, 2px frame, unrotated, for table cells. |

```md
<BranchRail :current="3" compact />
<BranchRail show-commits />
<HarnessParts active="all" :new="['verify']" />
<Verdict kind="lies" note="but bounded" />
| 0 | … | <Verdict kind="lies" inline /> Hit the login page | 383 |
```

---

## 7. CSS component classes

Markdown inside an HTML block needs **blank lines** around it.

| Class | Use | Markup |
|---|---|---|
| `or-frame` | The brand's 4px orange square frame (= the harness), 48px bold, centred text. | `<div class="or-frame mt-10">The rule: the prompt never changes.</div>` |
| `or-frame is-statement` | A big framed statement, 52px, max 1400px, centred block. Its frame **draws itself** on entry (0.9s; complete in exports and with reduced motion). | `<div class="or-frame is-statement">“…”</div>` |
| `or-box neutral` | A flat grey box with a slate 6px bar (facts, "rented"). | `<div class="or-box neutral">` + blank line + `### …` + list + blank line + `</div>` |
| `or-box highlight` | A peach box with an orange bar (the insight or punchline). | the same |
| `callout info` | Slate (navy is kept for dark moments); `fa-circle-info`. A takeaway or fact. | `<div class="callout info"><p><strong>Title.</strong> text</p></div>` |
| `callout warning` | Orange ink; `fa-triangle-exclamation`. Risk. | the same |
| `callout note` | Slate; `fa-note-sticky`. A side note or open question. | the same |
| `callout plain` | The **"In plain words"** strip: a peach tint, slate text (6.49:1; navy is for dark moments), the label in orange ink. Use it for **every** "In plain words" line, on any layout (never `warning` for it). | `<div class="callout plain"><p><strong>In plain words:</strong> …</p></div>` |
| `or-chip` | An outlined UI chip, Roboto 22px, nowrap. A flex row of chips wraps automatically. | `<span class="or-chip">NOT the loop</span>` |
| `or-chip pass` / `fail` / `muted` | Green / orange / slate ladder chips. | `<span class="or-chip pass"><i class="fas fa-circle-check"></i> PASS · …</span>` |
| `or-chip is-struck` | A struck-through temptation (a diagonal orange slash). | `<span class="or-chip is-struck">Prompt it harder</span>` |
| `or-chip on-band` | A navy chip for the orange band (`end` links). | `<span class="or-chip on-band">oriolrius.me</span>` |
| `a.or-chip` | Any chip can be a link: no underline, same colours. | `<a class="or-chip on-band" href="https://oriolrius.me">oriolrius.me</a>` |
| `or-pins` (+ `cols-2`, `cols-3`) | Numbered pins under code, 24px. Pin N ↔ highlight step N. Inline code inside pins may break at spaces. The step badge centres on the first line at any size. Pin text is balanced by default (`text-wrap: balance` at (0,1,0): no `text-balance` needed; `text-pretty` overrides). | `<div class="or-pins cols-3"><p><span class="or-step">1</span> …</p></div>` |
| `or-pins is-large` | 28px pins (the body size), for a short code block that leaves room (the badge follows). | `<div class="or-pins cols-3 is-large">` |
| `or-grow` | In a `code-focus` bottom: a wrapper that takes the spare height; its `.or-box` children stretch to the plain strip, their content centred. | `<div class="grid grid-cols-[2fr_1fr] gap-8 or-grow">` + boxes |
| `or-step` | A 40px orange square with a navy number. | `<span class="or-step">1</span>` |
| `or-stats` / `or-stat` | Big Yanone numbers (160px; 128px on navy) in the large orange ink, with a 22px caption; 2rem below the row. | `<div class="or-stats"><div class="or-stat"><b>$9</b><span>caption</span></div>…</div>` |
| `or-predict` | A/B/C prediction rows: 64px framed Yanone letters. Mark the right row `is-answer`: once resolved (`is-resolved` on the div, or automatically on `demo` when the verdict appears) its letter fills and the others step back in `--or-fg-dim` (letter frame `--or-line`), never by opacity. | `<div class="or-predict"><p><b>A</b> It upvotes the story</p>…<p class="is-answer"><b>C</b> …</p></div>` |
| `or-checklist` | Square boxes with a check (strictly square, like the brand; use on a raw `<ul>`). | `<ul class="or-checklist"><li>…</li></ul>` |
| `or-table roomy` | Wrap a markdown table: taller rows (1rem header, 1.25rem cells) for a recap table with room to breathe. | `<div class="or-table roomy">` + blank line + table + blank line + `</div>` |
| `or-table airy` | A short table (≤ 6 rows) that would leave the slide top-heavy: 1.1rem header, 1.75rem cells. The rows breathe; the cells keep their size (smaller cells only buy orphan wraps). | `<div class="or-table airy">` + blank line + table + blank line + `</div>` |
| `or-meter` | The site's orange progress bar: the value (or label) on top, a flat orange bar under it across the box's own width, on the light track. `--v` is the fill, 0–1 (bars start at zero). In a table cell it never widens the column. `is-large` = the brand's 24px bar for standalone use. | `<span class="or-meter" style="--v:.56">383</span>` |
| `or-table num-last` | The last column is a number: right-aligned, mono, tabular figures, never wrapped. Combine: `class="or-table roomy num-last"`. | the same |
| `or-refs` | A reference list whose leading FA icon **replaces** the chevron (icon in the margin; title and URL start at the same x). `<time>` never wraps. | `<ul class="or-refs"><li><i class="fas fa-pen-nib"></i> Author, <em>Title</em> <time>(2026-02-05)</time><span class="or-src"><a href="…">site.com/path</a></span></li></ul>` |
| `or-src` | An upright 22px source / URL line on its own line (not the italic aside); its link never wraps. | `<span class="or-src"><a href="https://…">site.com/path</a></span>` |
| `or-aside` | Italic 22px muted secondary line. | `<p class="or-aside">Breaks: …</p>` |
| `or-lead` | The h2 lead style for use inside slots. | `<p class="or-lead">…</p>` |
| `or-attribution` | Roboto uppercase attribution. | `<p class="or-attribution">Tejas Kumar <Ts t="04:12" /></p>` |
| `or-glossary` | Wrap a markdown table: terms in bold orange ink, never wrapped. | `<div class="or-glossary">` + blank line + table + blank line + `</div>` |
| `or-url` | Keep a link on one line. | `[github.com/x/y](https://…){.or-url}` |
| `or-code-22` / `or-code-20` | Code size outside `code-focus`. | `<div class="or-code-20">` + fence + `</div>` |
| `zoomable` | Click to zoom full-screen; Esc closes. | `<img src="/diagrams/x.png" class="zoomable" alt="…" />` |
| `surface-mist` / `surface-navy` / `surface-band` | A surface on the slide (`class:`) or an island on any element. | `<div class="surface-navy p-8">…</div>` |
| `dense` | Appendix density (use `layoutClass` on `two-cols-header`). | `layoutClass: dense` |

`v-mark` strokes are always the brand accent, 3px wide (the theme styles `svg.rough-annotation`; rough-notation's own
~1.5px reads as a hairline on a projector), so **never pass a colour or a stroke width**.
A phrase that may wrap needs `multiline: true`:
`<span v-mark.underline="{ at: 1, multiline: true }">everything around the model</span>`.

---

## 8. Global layers

**Footer** (`slide-bottom.vue`: a **per-slide** layer)
- The **framed oriolrius.me logo** (167×44px at 14px from the bottom, y 1022–1066: the frame is logo_v5's defining
  element), a divider, `themeConfig.footer`, and on the right `n / N` (or `Appendix`). The framed logo is the
  footer's rule: there is no separate hairline.
- The footer is how the logo reaches every slide. Three variants, matched to the surface:

  | Surface | Logo | Text |
  |---|---|---|
  | paper, mist | orange frame, orange letters | slate `#54595F` |
  | navy (`demo`, photo `section`) | orange frame, white letters | `#8C8FBF` |
  | band (`section`) | white frame, white letters | navy `#151652` (5.31:1) |

- Hidden only on `cover` and `end` (they carry the big framed logo themselves) and on a slide with `footer: false`
  (avoid it: that slide loses its logo). It is never hidden just because a slide is the last one.
- **Content ends at the layouts' content line (y ≤ 992; the probe allows 4px, then fails): the logo starts at 1022**, so
  a boxed element that ends on the line keeps 30px of clear space above the logo frame.
- It is rendered **inside every slide** (Slidev's `slide-bottom` layer), not as a global layer: it fades with its slide
  on a transition (a global footer switched instantly, so for a moment the white band logo sat on a pale fading
  ground and the counter already read the next number), and it is on every overview and presenter thumbnail. It
  reads the slide's own context (`useSlideContext`), never the current nav position.

**Progress hairline** (`global-top.vue`)
- A 3px orange bar at the top edge, `currentSlide / pageTotal` wide. It turns navy on the band (not on a photo
  divider) and is hidden on the cover.

**Favicon and tab title** (`package.json` → `slidev.defaults`): `favicon` is the framed "o" of the logo as an inline
SVG data URI (source: `assets/favicon.svg`; a theme `public/` dir is not served at `/`), and `titleTemplate` is
`%s · oriolrius.me`. A deck can override both in its headmatter.

---

## 9. Clicker and shortcuts

| Key | `clicker: clicks` (default) | `clicker: slides` |
|---|---|---|
| PageDown / PageUp (hardware clicker) | Next / previous **click step** (v-click, highlight, magic-move); one press = one step | Next / previous **slide** |
| Shift + PageDown / PageUp | ±10 slides | ±10 slides |
| Home / End | First / last slide | the same |

Slidev's own PageUp/PageDown bindings are removed **by name**, so there is no double fire. This was verified in a
headless run: PageDown goes 0 → 1 → 2 → 3 clicks, then to the next slide.

**The `e` key.** Slidev's client has no open-in-editor key; `e` lives in the **Slidev CLI terminal** (the dev
server's TTY), where it runs `$EDITOR` (default `code`, which can hang WSL2). The `dev` scripts (this repo's and the
deck's) set `EDITOR=true`, so a stray `e` there is a no-op. Start servers through them.

---

## 10. Authoring rules (read before writing a slide)

1. **One idea per slide.** At most 8 bullets, 3 boxes, 12 code lines and 7 table rows. The h1 stays on one line
   (≤ ~45 characters, including an inline `<Tag>`).
2. **No size utilities** (`text-sm`, `text-xl`, …) on text, no inline `font-size`, no hex colours, no emojis in slide
   bodies, no Mermaid. Hero icons may use `text-8xl`. Spacing utilities (`mt-8`, `gap-6`, `grid grid-cols-2 gap-12`)
   are fine.
3. **Icons:** Font Awesome 6 Free, `fas` and `fab` (`<i class="fas fa-shield-halved"></i>`). They are bundled.
4. **Every click sequence ends fully readable:** highlights end on `all`, and magic-move ends on the final code. The
   PDF shows the final click state.
5. **Fragments** start with a frontmatter block (`---\nlayout: …\n---`), never a bare `---` separator.
6. Put a **long, descriptive `alt`** on every image. Diagrams are draw.io PNGs in `public/diagrams/`.
7. Don't style bare `pre`, `code` or `.shiki` in a slide `<style>`; the editor pane breaks. The theme already makes
   inline code `nowrap`.
8. Use `### h3` inside boxes and cards, never `##` (h2 is the lead style).
9. Cite talk timestamps in **notes** as `[mm:ss]`; the theme blocks UnoCSS from turning them into (invalid) CSS.
10. **Type curly quotes yourself: “ ” ‘ ’.** Slidev doesn't run markdown-it's typographer, and raw HTML, component
    slots and frontmatter strings would never get it anyway. Straight `"` and `'` stay only inside code and
    terminals. The probe fails on a straight quote in rendered text.
11. Short copy (≤ 3 lines) may take the Uno class `text-balance`; never patch `text-wrap` in a slide `<style>`.

---

## 11. Build, export, verify

From the repo root:

```bash
pnpm build                                          # compile check of this showcase (dist/)
pnpm export                                         # per-slide PNGs → exports/png/
pnpm probe                                          # build + serve + acceptance probe (scripts/probe.sh)
# or by hand:
./node_modules/.bin/slidev build test/slides.md --out /tmp/or-theme-build
node test/probe/serve.mjs /tmp/or-theme-build 47321 &   # static server (kill it afterwards)
node test/probe/probe.cjs http://127.0.0.1:47321        # acceptance probe
```

`probe.cjs` checks every slide **twice**: at click 0 and at `?clicks=99` (the final state the PDF shows), so text
revealed by v-click or magic-move is checked too. Per slide:
- h1 sizes (56px everywhere, dense included; 72 on `section`; 104 on `cover`) and that the h1 is one line;
- vertical and horizontal overflow: content ends by y = 996 (the content line 992 + 4px; the framed logo starts at 1022);
- code blocks never scrolling;
- links and inline code never wrapping mid-token; the code-focus `source` never ellipsised;
- no straight quotes in rendered text (code and terminals exempt);
- the 20px text floor (sanctioned exceptions: `<Ts>` 18px, footer 16px, terminal title 18px, code-focus `source`
  18px);
- text contrast (WCAG AA / AA-large) against the composited background; code-token contrast ≥ 4.5:1 and the code
  font;
- the footer (= the logo) on every slide except cover/end, in the right variant (band on `section`, dark on `demo`
  and photo dividers), **inside the slide** (not a global layer), and the framed logo on cover and end;
- that every brand font actually loaded;
- that the presenter notes don't inherit slide sizes.

It also prints `WARN … sparse` when a slide's final state has an interior empty band taller than 220px (140px on
`code-focus`, where the anchored plain strip counts: a bigger gap means the bottom slot is short of content). Painted
boxes (panels, callouts, card bodies) count as content, not as empty page.

**Always export PNGs with `--per-slide`.** The stacked mode (without `--per-slide`) screenshots one very tall page,
and Chromium sometimes leaves paint tiles blank or captures before the code font loads. That is a Slidev/Chromium
limitation, not a slide bug.

---

## 12. Versioning and license

Releases follow [Conventional Commits](https://www.conventionalcommits.org/) and are cut with
[commitizen](https://commitizen-tools.github.io/commitizen/) (`cz bump` → tag `vX.Y.Z` + `CHANGELOG.md`). Pin a tag
in your deck. Every push is scanned by [gitleaks](https://github.com/gitleaks/gitleaks).

MIT © Oriol Rius. See `LICENSE`.
