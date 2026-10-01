<!--
  four-grid (ported): a 2×2 board with axis labels on the frame edges and a callout below.

  Frontmatter props
    colLabels?: [string, string]   top labels (left column, right column); text after " · " is lighter
    rowLabels?: [string, string]   left labels (top row, bottom row), written vertically
  Slots
    title:           # Title (+ optional <p class="or-lead">)
    icon1 … icon4:   a bare <i class="fas fa-…"></i> (64px orange tile)
    q1 … q4:         ### Heading + <p> text (+ <p class="or-aside">). q1 top-left, q2 top-right,
                     q3 bottom-left, q4 bottom-right
    callout:         a callout (pushed to the bottom)
    align?:          'center' (default) | 'start': where each quadrant's content sits vertically
  Text is left-aligned (not centred as in ESADE) and wraps balanced (short copy).
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  colLabels?: string[]
  rowLabels?: string[]
  align?: 'center' | 'start'
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  colLabels: () => [],
  rowLabels: () => [],
  align: 'center',
})

function split(label?: string) {
  const s = label || ''
  const i = s.indexOf(' · ')
  return i < 0 ? { head: s, tail: '' } : { head: s.slice(0, i), tail: s.slice(i + 3) }
}
const cols = computed(() => [split(props.colLabels?.[0]), split(props.colLabels?.[1])])
const rows = computed(() => [split(props.rowLabels?.[0]), split(props.rowLabels?.[1])])
const hasCols = computed(() => !!(props.colLabels?.[0] || props.colLabels?.[1]))
const hasRows = computed(() => !!(props.rowLabels?.[0] || props.rowLabels?.[1]))
</script>

<template>
  <div class="slidev-layout four-grid" :class="{ 'align-start': align === 'start' }">
    <div class="or-title">
      <slot name="title" />
    </div>
    <div class="board" :class="{ 'has-cols': hasCols, 'has-rows': hasRows }">
      <template v-if="hasCols">
        <div v-for="(c, i) in cols" :key="`c${i}`" class="label col-label" :style="{ gridColumn: i + 2, gridRow: 1 }">
          <b>{{ c.head }}</b><template v-if="c.tail">
            <span class="sep"> · </span><span>{{ c.tail }}</span>
          </template>
        </div>
      </template>
      <template v-if="hasRows">
        <div v-for="(r, i) in rows" :key="`r${i}`" class="label row-label" :style="{ gridColumn: 1, gridRow: i + 2 }">
          <b>{{ r.head }}</b><template v-if="r.tail">
            <span class="sep"> · </span><span>{{ r.tail }}</span>
          </template>
        </div>
      </template>
      <div
        v-for="i in 4" :key="`q${i}`" class="quadrant"
        :style="{ gridColumn: ((i - 1) % 2) + 2, gridRow: Math.floor((i - 1) / 2) + 2 }"
      >
        <div v-if="$slots[`icon${i}`]" class="icon">
          <slot :name="`icon${i}`" />
        </div>
        <div class="text">
          <slot :name="`q${i}`" />
        </div>
      </div>
    </div>
    <div v-if="$slots.callout" class="callout-area">
      <slot name="callout" />
    </div>
  </div>
</template>

<style scoped>
.four-grid {
  --or-fs-h3: 1.875rem;
  display: flex;
  flex-direction: column;
}
.or-title { flex: none; }
.or-title :deep(h1) { margin-bottom: 1.25rem; }
.or-title :deep(.or-lead) { margin: -.25rem 0 1.5rem; font-size: 1.625rem; }
.board {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto 1fr 1fr;
  gap: 1rem;
  min-height: 0;
}
.board:not(.has-cols) { grid-template-rows: 0 1fr 1fr; row-gap: 0; }
.board:not(.has-rows) { grid-template-columns: 0 minmax(0, 1fr) minmax(0, 1fr); column-gap: 0; }
.label {
  font-family: var(--or-font-display);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: var(--or-ls-kicker);
  text-transform: uppercase;
  color: var(--or-fg-muted);
  white-space: nowrap;
}
.label b { font-weight: 600; color: var(--or-fg-title); }
.label .sep { color: var(--or-accent-text); }   /* it is text: #FF6600 would be 2.94:1 */
.col-label {
  align-self: end;
  padding: 0 0 .1rem 1.25rem;
}
.row-label {
  justify-self: center;
  align-self: center;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding: 0 .1rem;
}
.quadrant {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  column-gap: 1.25rem;
  align-items: start;       /* icon and heading stay top-aligned with each other */
  align-content: center;    /* the pair sits in the middle of the quadrant, level with the row label */
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--or-line);
  background: var(--or-bg);
  min-width: 0;
}
.quadrant:not(:has(.icon)) { grid-template-columns: minmax(0, 1fr); }
.align-start .quadrant { align-content: start; }
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--or-orange-050);
  outline: 2px solid var(--or-accent);
  outline-offset: -2px;
  font-size: 1.75rem;
  line-height: 1;
  color: var(--or-accent);
}
.icon :deep(p) { margin: 0; line-height: 1; }
.icon :deep(i) { display: block; line-height: 1; }
.text { --or-fs-body: 1.625rem; font-size: var(--or-fs-body); font-weight: 400; line-height: 1.35; }
.text :deep(:is(h3, p)) { text-wrap: balance; }
.text :deep(h3) { margin-bottom: .4rem; }
.text :deep(p) { margin: 0 0 .35rem; }
.text :deep(p:last-child) { margin-bottom: 0; }
.callout-area {
  flex: none;
  margin-top: 1.25rem;
}
.callout-area > :deep(*:last-child) { margin-bottom: 0; }
</style>
