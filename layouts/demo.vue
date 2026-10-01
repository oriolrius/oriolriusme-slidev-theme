<!--
  demo (new): the navy "moment" slide for demo runs.

  Frontmatter props
    chip?: string     e.g. "BRANCH 0 · RUN"; shown in an outlined chip in the rail row
    live?: boolean    false (default) → REPLAY prefix; true → LIVE prefix with a pulsing orange square
  Slots
    rail:     right side of the rail row (content from the first `# h1` onward goes to the title area)
    default:  # Title (white)
    terminal: left 58% (a <Terminal>)
    side:     right 42%, as tall as the terminal: predictions (.or-predict rows spread over the full
              height; mark the right row with class="is-answer": it lights up when the verdict row is
              revealed), or an image (vertically centred, never taller than the terminal or 520px)
    verdict:  full-width row at the bottom (Verdict stamp, .or-stat, QuoteCard), wraps
  The footer switches to its light variant on this layout.
-->
<script setup lang="ts">
import { useNav } from '@slidev/client'
import { SlotPart } from '../utils/slots'

const { isPrintMode } = useNav()

withDefaults(defineProps<{
  chip?: string
  live?: boolean
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  chip: '',
  live: false,
})
</script>

<template>
  <div class="slidev-layout demo surface-navy" :class="{ 'or-is-print': isPrintMode }">
    <header class="or-railrow">
      <span class="or-demo-chip" :class="{ 'is-live': live }">
        <span class="mode">
          <i v-if="live" class="dot" />
          <i v-else class="fas fa-clock-rotate-left" />
          {{ live ? 'Live' : 'Replay' }}
        </span>
        <span v-if="chip" class="label">{{ chip }}</span>
      </span>
      <div v-if="$slots.rail" class="rail">
        <SlotPart :source="$slots.rail" part="head" />
      </div>
    </header>
    <div class="or-title">
      <slot />
      <SlotPart :source="$slots.rail" part="tail" />
    </div>
    <div class="stage" :class="{ 'no-side': !$slots.side }">
      <div class="terminal">
        <slot name="terminal" />
      </div>
      <div v-if="$slots.side" class="side">
        <slot name="side" />
      </div>
    </div>
    <div v-if="$slots.verdict" class="verdict">
      <slot name="verdict" />
    </div>
  </div>
</template>

<style scoped>
.demo {
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
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--or-line);
}
.or-demo-chip {
  display: inline-flex;
  align-items: stretch;
  border: 2px solid var(--or-orange-bright);
  border-radius: var(--or-radius-ui);
  font-family: var(--or-font-ui);
  font-size: var(--or-fs-ui);
  font-weight: 500;
  line-height: 1;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--or-white);
  white-space: nowrap;
}
.or-demo-chip .mode {
  display: inline-flex;
  align-items: center;
  gap: .45em;
  padding: .4em .7em;
  color: var(--or-orange-bright);
}
.or-demo-chip .mode i { font-size: .9em; }
.or-demo-chip .label {
  display: inline-flex;
  align-items: center;
  padding: .4em .8em;
  border-left: 2px solid var(--or-orange-bright);
}
.or-demo-chip.is-live .mode {
  background: var(--or-orange-bright);
  color: var(--or-navy);
}
.or-demo-chip .dot {
  display: inline-block;
  width: .6em;
  height: .6em;
  background: var(--or-navy);
  animation: or-live-pulse 1s ease-in-out infinite alternate;
}
@keyframes or-live-pulse {
  from { opacity: 1; }
  to { opacity: .25; }
}
@media print {
  .or-demo-chip .dot { animation: none; }
}
.rail {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.or-title { flex: none; }
.or-title :deep(h1) { margin-bottom: 1.5rem; }
.or-title :deep(h1)::after { margin-top: .75rem; }
.stage {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 58fr) minmax(0, 42fr);
  gap: var(--or-gap);
  /* both columns end on the same line: the row is as tall as the terminal (the side column has size
     containment, so it never adds height) and the side column stretches to it */
  align-content: start;
  align-items: stretch;
}
.stage.no-side { grid-template-columns: minmax(0, 1fr); }
.terminal { min-width: 0; }
.side {
  contain: size;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.side :deep(img) {
  display: block;
  flex: none;
  max-height: min(100%, 520px);
  width: auto;
  max-width: 100%;
  margin-inline: auto;
  object-fit: contain;
  background: var(--or-white);
}
.side > :deep(p) { margin: 0; }
.side > :deep(p:has(> img)) { display: contents; }
/* predictions: the three rows spread over the terminal's full height */
.side > :deep(.or-predict) {
  flex: 1 1 auto;
  justify-content: space-evenly;
}
.verdict {
  flex: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
/* a QuoteCard here points UP (pointer auto: at the run it comments on, never at the footer's logo); only
   a forced down-pointer needs clearance below */
.verdict:has(.or-quotecard.pointer-down) { margin-bottom: .75rem; }
.verdict > :deep(*) { margin: 0; }
.verdict :deep(.or-quotecard) { flex: 1 1 36rem; }
.verdict :deep(.or-stat) { display: flex; align-items: baseline; gap: .75rem; text-align: left; }
.verdict :deep(.or-stat span) { margin: 0; }
</style>
