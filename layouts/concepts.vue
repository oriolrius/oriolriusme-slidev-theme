<!--
  concepts (ported + redesigned): the site's icon-box triad. An orange FA icon in a square framed tile,
  above an orange h3 and a short text.

  Frontmatter props
    cols?:   1 | 2 | 3 | 4           default 3
    rows?:   1 | 2                   default 1
    align?:  'center' | 'left'       default: 'center' for one row (the site's consultoría triad),
                                     'left' for two rows (a denser reading grid)
    panels?: boolean                 false (default); true = every item is a flat panel (card surface,
                                     6px orange top bar, 2.5rem × 2.25rem padding). The panels FILL the
                                     band between the title and the footer rule (rows share it), with
                                     their content centred vertically: no empty bands above and below
    (class: surface-mist for the alternate surface)
  Slots
    title:               # Title (+ optional lead paragraph)
    icon1 … icon8:       a bare <i class="fas fa-…"></i> (sized, framed and coloured by the layout)
    concept1 … concept8: ### Heading + <p> text (lists work too). Text wraps BALANCED (short copy).
    footer:              one centred line under a 140px orange rule
  Sizes are VARIABLES computed from cols×rows (tile / glyph / h3 / text @weight, tile frame):
    3×1, 2×1, 1×1  128 / 56 / 44 / 32 @300, 4px
    4×1            112 / 48 / 36 / 28 @300, 4px
    2×2            112 / 48 / 40 / 28 @300, 4px   (840px columns: the 4×1 scale, a 40px h3)
    3×2, 1×2        96 / 44 / 36 / 28 @300, 3px   (two rows of ~250px fit the ~726px grid)
    4×2             80 / 36 / 28 / 24 @400, 3px
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  cols?: 1 | 2 | 3 | 4 | '1' | '2' | '3' | '4'
  rows?: 1 | 2 | '1' | '2'
  align?: 'center' | 'left' | ''
  panels?: boolean
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  cols: 3,
  rows: 1,
  align: '',
  panels: false,
})

const nCols = computed(() => Math.min(4, Math.max(1, Number(props.cols) || 3)))
const nRows = computed(() => Math.min(2, Math.max(1, Number(props.rows) || 1)))
const cells = computed(() => Array.from({ length: nCols.value * nRows.value }, (_, i) => i + 1))
const alignment = computed(() => props.align === 'left' || props.align === 'center'
  ? props.align
  : (nRows.value === 1 ? 'center' : 'left'))

// [tile, glyph, h3, text, text weight, tile border]
type Row = [string, string, string, string, number, string]
const TABLE: Record<string, Row> = {
  '1x1': ['8rem', '3.5rem', '2.75rem', '2rem', 300, '4px'],
  '2x1': ['8rem', '3.5rem', '2.75rem', '2rem', 300, '4px'],
  '3x1': ['8rem', '3.5rem', '2.75rem', '2rem', 300, '4px'],
  '4x1': ['7rem', '3rem', '2.25rem', '1.75rem', 300, '4px'],
  '1x2': ['6rem', '2.75rem', '2.25rem', '1.75rem', 300, '3px'],
  '2x2': ['7rem', '3rem', '2.5rem', '1.75rem', 300, '4px'],
  '3x2': ['6rem', '2.75rem', '2.25rem', '1.75rem', 300, '3px'],
  '4x2': ['5rem', '2.25rem', '1.75rem', '1.5rem', 400, '3px'],
}

const vars = computed(() => {
  const [tile, glyph, h3, body, weight, border] = TABLE[`${nCols.value}x${nRows.value}`] ?? TABLE['3x1']
  return {
    '--tile': tile,
    '--icon-size': glyph,
    '--tile-border': border,
    '--or-fs-h3': h3,
    '--or-fs-body': body,
    '--or-fw-body': String(weight),
    '--cols': String(nCols.value),
  }
})
</script>

<template>
  <div
    class="slidev-layout concepts"
    :class="[`align-${alignment}`, { 'is-panels': panels }]"
    :style="vars"
  >
    <div class="or-title">
      <slot name="title" />
    </div>
    <div class="grid" :class="`rows-${nRows}`">
      <template v-for="i in cells" :key="i">
        <div
          v-if="$slots[`icon${i}`] || $slots[`concept${i}`]" class="item"
          :style="panels ? { gridRow: i > nCols ? '6 / span 4' : '1 / span 4' } : undefined"
        >
          <div v-if="$slots[`icon${i}`]" class="icon">
            <slot :name="`icon${i}`" />
          </div>
          <div class="text">
            <slot :name="`concept${i}`" />
          </div>
        </div>
      </template>
    </div>
    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.concepts {
  display: flex;
  flex-direction: column;
  /* the footer line is text under a rule: it ends .75rem above the content line */
  padding-bottom: calc(var(--or-pad-bottom) + .75rem);
}
.or-title { flex: none; }
.grid {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  gap: 2.5rem var(--or-gap);
  align-content: center;
}
.grid.rows-2 { row-gap: 3rem; }
.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-width: 0;
}
.align-center .item {
  align-items: center;
  text-align: center;
}
/* the icon sits in a square framed tile (the brand's frame; four-grid uses a smaller 64px, 2px-outline
   variant of the same idea) */
.icon {
  flex: none;
  display: grid;
  place-items: center;
  width: var(--tile);
  height: var(--tile);
  border: var(--tile-border) solid var(--or-accent);
  background: var(--or-orange-050);
  font-size: var(--icon-size);
  line-height: 1;
  color: var(--or-accent);
  margin-bottom: 1.5rem;
}
.surface-mist .icon { background: var(--or-white); }
.icon :deep(p) { margin: 0; line-height: 1; }
.icon :deep(i) { display: block; line-height: 1; }
.icon :deep(img),
.icon :deep(svg) { height: var(--icon-size); width: auto; }
.text { max-width: 100%; }
.text :deep(h3) { margin-bottom: .6rem; }
.text :deep(p) { margin: 0 0 .5rem; }
.text :deep(p:last-child) { margin-bottom: 0; }
/* short copy: even lines, no one-word last line */
.text :deep(:is(h3, p, .or-aside)) { text-wrap: balance; }
.align-center .text :deep(:is(ul, ol)) { text-align: left; }

/* panels: every item becomes a flat panel (card surface, 6px orange top bar). The panels fill the band
   between the title and the footer rule. Each panel is a SUBGRID of four row tracks shared with its row
   [1fr spacer][icon][text][1fr spacer]: the content is centred vertically as a group AND the tiles and
   headings of a row stay level whatever the text length (the tallest text sizes the shared track). */
.is-panels .grid {
  row-gap: 0;
  grid-template-rows: 1fr auto auto 1fr;
  align-content: stretch;
}
.is-panels .grid.rows-2 { grid-template-rows: 1fr auto auto 1fr 3rem 1fr auto auto 1fr; }
.is-panels .item {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: 0;
  align-items: start;       /* (the flex item rule's align-items would centre each cell in its track) */
  justify-items: start;
  padding: 2.5rem 2.25rem;
  background: var(--or-card-bg);
  border-top: var(--or-bar) solid var(--or-accent);
}
.is-panels.align-center .item { align-items: start; justify-items: center; }
.is-panels .item > .icon { grid-row: 2; }
.is-panels .item > .text { grid-row: 3; }
.is-panels .icon { background: var(--or-bg); }

.footer {
  flex: none;
  margin-top: 2rem;
  font-size: var(--or-fs-small);
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: .2px;
  color: var(--or-fg-muted);
  text-align: center;
  text-wrap: balance;
}
.footer::before {
  /* the same 140px accent as the title rule: an accent, not an underline to measure the line against */
  content: '';
  display: block;
  width: 140px;
  height: var(--or-rule);
  margin: 0 auto 1rem;
  background: var(--or-accent);
}
.footer :deep(p) { margin: 0; }
</style>
