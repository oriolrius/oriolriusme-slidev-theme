<!--
  code-focus (new): one code block as the hero of the slide.

  Frontmatter props
    kicker?:   string        left of the rail row. Text after the first " · " keeps its case in italics
                             when it is not all-caps (a commit message): "BRANCH 3 · Fix lies"
    source?:   string        credit line, in the footer row (right, before "n / N"), prefixed "code:"
    codeSize?: 20-24         code font size in px (default 24; 22 for lines up to ~125 chars; 21 when a
                             12-line block plus a dense bottom would cross the footer)
    harness?:  0-4           "the frame is the harness" (brand hook 1): the code block's orange frame
                             closes as the branches add harness. 0 = the left bar only (default);
                             1 = + top; 2 = + top + right; 3 = closed; 4 = closed, and the frame draws
                             itself on entry (complete in exports). Layout-neutral (inset shadows).
  Slots
    rail:     right side of the rail row (BranchRail, HarnessParts). Content from the first `# h1`
              onward is moved to the body, so writing ::rail:: BEFORE the title is fine.
    default:  # Title, then ONE fenced code block or a magic-move block
    bottom:   pins, chips, a strip image (max 24vh), a callout, a Terminal. It fills the rest of the
              slide: a trailing `callout plain` ("In plain words") is ANCHORED on the content line,
              so it sits at the same y on every code slide; the items above it are CENTRED as a group
              in the space between the code and the strip (spare height splits evenly above and below
              them, never one hole over the strip). A wrapper with class `or-grow` takes all the spare
              height instead (its .or-box children stretch, their content centred).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { SlotPart } from '../utils/slots'

const props = withDefaults(defineProps<{
  kicker?: string
  source?: string
  codeSize?: 20 | 21 | 22 | 23 | 24 | '20' | '21' | '22' | '23' | '24'
  harness?: 0 | 1 | 2 | 3 | 4 | '0' | '1' | '2' | '3' | '4'
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  kicker: '',
  source: '',
  codeSize: 24,
  harness: 0,
})

const harnessClass = computed(() => `harness-${Math.min(4, Math.max(0, Math.round(Number(props.harness) || 0)))}`)

const kickerParts = computed(() => {
  const k = props.kicker || ''
  const i = k.indexOf(' · ')
  if (i < 0)
    return { head: k, tail: '' }
  const tail = k.slice(i + 3)
  if (tail === tail.toUpperCase())
    return { head: k, tail: '' }
  return { head: k.slice(0, i), tail }
})

const rootStyle = computed(() => {
  const n = Math.min(24, Math.max(20, Number(props.codeSize) || 24))
  return { '--slidev-code-font-size': `${n}px` }
})
</script>

<template>
  <div class="slidev-layout code-focus" :class="harnessClass" :style="rootStyle">
    <header class="or-railrow">
      <span class="kicker">
        {{ kickerParts.head }}<template v-if="kickerParts.tail"><span class="sep"> · </span><em>{{ kickerParts.tail }}</em></template>
      </span>
      <div v-if="$slots.rail" class="rail">
        <SlotPart :source="$slots.rail" part="head" />
      </div>
    </header>
    <div class="or-title body">
      <slot />
      <SlotPart :source="$slots.rail" part="tail" />
    </div>
    <div v-if="$slots.bottom" class="bottom">
      <slot name="bottom" />
    </div>
    <p v-if="source" class="source">
      <span class="source-label">code:</span> {{ source }}
    </p>
  </div>
</template>

<style scoped>
.code-focus {
  --slidev-code-margin: 0;
  display: flex;
  flex-direction: column;
  padding-top: 2.25rem;
}
.or-railrow {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  height: 56px;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--or-line);
}
.kicker {
  font-family: var(--or-font-display);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--or-ls-kicker);
  text-transform: uppercase;
  color: var(--or-accent-text-large);   /* 28px Yanone: large text */
  white-space: nowrap;
}
.kicker .sep { color: var(--or-fg-muted); }
.kicker em {
  font-family: var(--or-font-sans);
  font-size: 1.375rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: 0;
  text-transform: none;
  color: var(--or-fg-title);
}
.rail {
  display: flex;
  align-items: center;
  gap: 2rem;
  min-width: 0;
}
.body {
  flex: none;
  min-width: 0;
}
.body :deep(h1) {
  /* the same title block as `demo` (h1 + rule + 24px), so the title doesn't jump on a code → demo fade */
  line-height: 1.15;
  margin-bottom: 1.5rem;
}
.body :deep(h1)::after {
  margin-top: .75rem;
}
.bottom {
  /* a bare ### next to an .or-box ### (slide 12: "The cast" | "The rule") gets the same 30px */
  --or-fs-h3: 1.875rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1.25rem;
  min-width: 0;
  min-height: 0;
}
.bottom > :deep(*) { margin-bottom: 0; }
/* the "In plain words" strip is anchored on the content line (same y on every code slide) */
.bottom > :deep(.callout.plain:last-child) { margin-top: auto; }
/* a QuoteCard here points UP (pointer auto): its diamond hangs ~11px above the box, so it gets .75rem
   more room above; a forced down-pointer gets it below */
.bottom > :deep(.or-quotecard) { margin-top: .75rem; }
.bottom > :deep(.or-quotecard.pointer-down) { margin-top: 0; margin-bottom: .75rem; }
.bottom > :deep(.or-quotecard.pointer-none) { margin-top: 0; }
/* or-grow: a wrapper that takes all the spare height (e.g. a row of boxes); its boxes stretch to it */
.bottom > :deep(.or-grow) { flex: 1 1 auto; min-height: 0; }
.bottom > :deep(.or-grow .or-box) {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* a strip image is the one item that yields: when the bottom is short of room it shrinks (it never
   pushes the plain strip into the footer); object-fit keeps its proportions */
.bottom > :deep(p:has(> img:only-child)) { display: contents; }
.bottom > :deep(img),
.bottom > :deep(p > img) {
  display: block;
  flex: 0 1 auto;
  min-height: 0;
  width: 100%;
  max-height: var(--or-strip-h, 24vh);
  object-fit: contain;
}
.source {
  /* sits IN the footer row (same baseline as the footer), right-aligned before "n / N",
     so the code keeps the full vertical budget */
  position: absolute;
  z-index: 11;
  right: calc(var(--or-pad-x) + 6.5rem);
  bottom: 14px;        /* the footer row: the framed logo is 44px tall at bottom 14px */
  height: 44px;
  max-width: calc(100% - 2 * var(--or-pad-x) - 30rem);
  margin: 0;
  font-family: var(--or-font-ui);
  font-size: calc(var(--or-fs-meta) * 1.125);
  font-weight: 500;
  font-style: normal;
  line-height: 44px;
  letter-spacing: .2px;
  color: var(--or-fg-muted);
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.source-label {
  color: var(--or-accent-text);
}

/* ── harness: the frame closes around the code as the branches add harness ──────────────────────
   Inset shadows on top of the brand's 4px left bar: they never change the block's size, so a slide
   that fits at harness 0 fits at harness 4. */
.harness-1 .body :deep(.slidev-code) {
  box-shadow: inset 0 var(--or-frame) 0 var(--or-orange);
}
.harness-2 .body :deep(.slidev-code) {
  box-shadow: inset 0 var(--or-frame) 0 var(--or-orange), inset calc(-1 * var(--or-frame)) 0 0 var(--or-orange);
}
.harness-3 .body :deep(.slidev-code) {
  box-shadow: inset 0 var(--or-frame) 0 var(--or-orange), inset calc(-1 * var(--or-frame)) 0 0 var(--or-orange),
    inset 0 calc(-1 * var(--or-frame)) 0 var(--or-orange);
}
/* 4: the closed frame DRAWS ITSELF on entry (the dividers' sweep); exports and reduced motion show it
   complete (@property --or-draw has initial-value 360deg, components.css) */
.harness-4 .body :deep(.slidev-code-wrapper) { position: relative; }
.harness-4 .body :deep(.slidev-code-wrapper)::after {
  content: '';
  position: absolute;
  inset: 0;
  border: var(--or-frame) solid var(--or-orange);
  pointer-events: none;
  -webkit-mask: conic-gradient(#000 var(--or-draw), #0000 0);
  mask: conic-gradient(#000 var(--or-draw), #0000 0);
  animation: or-frame-draw .9s var(--or-ease) .15s backwards;
}
@media (prefers-reduced-motion: reduce) {
  .harness-4 .body :deep(.slidev-code-wrapper)::after { animation: none; }
}
</style>

<style>
/* centring (unscoped: :has() looks into slot content). When the bottom ends with the anchored plain
   strip, its FIRST item takes an auto top margin too: the free height splits evenly between "code →
   items" and "items → strip", so the items read as one centred group instead of leaving one hole
   above the strip. No spare height = no change. (An .or-grow wrapper takes the spare height first.) */
.slidev-layout.code-focus > .bottom:has(> .callout.plain:last-child) > :first-child { margin-top: auto; }
</style>
