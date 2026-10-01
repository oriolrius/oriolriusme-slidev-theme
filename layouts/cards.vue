<!--
  cards (redesigned): the site's pricing cards. A coloured header band carrying the icon AND the card
  title, then a flat body.

  Frontmatter props
    cols?: 2 | 3                          default 3 (1 is clamped to 2, more than 3 to 3)
    rows?: 1 | 2                          default 1 (max 6 cards)
    tone?: 'orange' | 'slate' | 'navy'    default 'orange' (header colour for every card)
    card1Tone … card6Tone                 per-card override, e.g. card6Tone: navy (the "rule" meta-card)
    (class: surface-mist for the alternate surface; card bodies turn white)
  Slots
    title:             # Title
    icon1 … icon6:     a bare <i class="fas fa-…"></i> (in the header band)
    card1 … card6:     ### Heading + <p> text. The FIRST ### is lifted into the header band, next to
                       the icon (no markup change). A trailing <span class="or-chip"> sits at the card
                       bottom; a trailing <QrCode> is centred in the space left under the text.
    footer:            one centred line
  Tones (header title 30px Ubuntu 700 / icon):
    orange = #F46524 band, navy title + icon (5.31:1; brand: no white under 48px on orange)
    slate  = #54595F band, white title + icon (7.07:1), for critique
    navy   = navy card, white title, #FF8533 icon, 4px orange frame (the "rule" meta-card)
  Header bands of one row share their height (CSS subgrid), so a two-line title never misaligns bodies.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { SlotSplit } from '../utils/slots'

type Tone = 'orange' | 'slate' | 'navy'

const props = withDefaults(defineProps<{
  cols?: 2 | 3 | '2' | '3'
  rows?: 1 | 2 | '1' | '2'
  tone?: Tone
  card1Tone?: Tone
  card2Tone?: Tone
  card3Tone?: Tone
  card4Tone?: Tone
  card5Tone?: Tone
  card6Tone?: Tone
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  cols: 3,
  rows: 1,
  tone: 'orange',
})

const nCols = computed(() => Math.min(3, Math.max(2, Number(props.cols) || 3)))
const nRows = computed(() => Math.min(2, Math.max(1, Number(props.rows) || 1)))
const cells = computed(() => Array.from({ length: nCols.value * nRows.value }, (_, i) => i + 1))
const TONES = new Set<Tone>(['orange', 'slate', 'navy'])
function toneOf(i: number): Tone {
  const own = (props as Record<string, unknown>)[`card${i}Tone`] as Tone | undefined
  const t = own || props.tone || 'orange'
  return TONES.has(t) ? t : 'orange'
}
const vars = computed(() => ({
  '--cols': String(nCols.value),
  '--rows': String(nRows.value),
  '--or-fs-h3': '1.875rem',
  // 26px on one row, 28px (the body size) on two: a 2×3 card body is ~290px tall, and 24px left
  // two short lines floating over an empty band in every card
  '--or-fs-body': nRows.value === 1 ? '1.625rem' : '1.75rem',
  '--or-fw-body': '400',
}))
</script>

<template>
  <div class="slidev-layout cards" :style="vars">
    <div class="or-title">
      <slot name="title" />
    </div>
    <div class="grid" :class="`rows-${nRows}`">
      <template v-for="i in cells" :key="i">
        <article
          v-if="$slots[`card${i}`] || $slots[`icon${i}`]" class="or-card" :class="`tone-${toneOf(i)}`"
          :style="{ gridRow: i > nCols ? '4 / span 2' : '1 / span 2' }"
        >
          <header class="head">
            <span v-if="$slots[`icon${i}`]" class="head-icon"><slot :name="`icon${i}`" /></span>
            <SlotSplit :source="$slots[`card${i}`]" tag="h3" part="first" />
          </header>
          <div class="body">
            <SlotSplit :source="$slots[`card${i}`]" tag="h3" part="rest" />
          </div>
        </article>
      </template>
    </div>
    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--or-pad-bottom);   /* cards end on the content line (992), 30px above the logo */
}
.or-title { flex: none; }
.grid {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  /* each card spans two tracks (header band, body) and shares them with its row through subgrid;
     the 1.75rem between two rows of cards is an explicit track, so header and body stay flush */
  grid-template-rows: auto 1fr;
  column-gap: 2rem;
  row-gap: 0;
  align-content: stretch;
  min-height: 0;
}
.grid.rows-2 { grid-template-rows: auto 1fr 1.75rem auto 1fr; }
.or-card {
  display: grid;
  grid-template-rows: subgrid;
  min-width: 0;
  border-radius: 0;
}
.head {
  display: flex;
  align-items: center;
  gap: .85rem;
  min-height: 72px;
  padding: .75rem 1.5rem;
  line-height: 1;
}
.head-icon {
  flex: none;
  display: flex;
  align-items: center;
  font-size: 2.25rem;
  line-height: 1;
}
.head-icon :deep(p) { margin: 0; line-height: 1; }
.head-icon :deep(i) { display: block; line-height: 1; }
.head :deep(h3) {
  margin: 0;
  font-size: var(--or-fs-h3);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: 0;
  color: inherit;
  text-wrap: balance;
}
.head :deep(h3 i) { color: inherit; }
.body {
  /* inline code chips contrast with the card body: they take the page surface colour */
  --or-code-inline-bg: var(--or-bg);
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem 1.5rem;
  background: var(--or-card-bg);
}
.body :deep(a) { white-space: nowrap; }
/* orange SMALL ink on the #F4F4F4 card body must be the mist-safe ink (h3 uses the large ink) */
.cards:not(.surface-mist) .body { --or-accent-text: var(--or-orange-ink-mist); }
.body :deep(h3) { margin-bottom: .6rem; }
.body :deep(p) { margin: 0 0 .6rem; }
.body > :deep(:last-child) { margin-bottom: 0; }
.body > :deep(p:last-child:has(> .or-chip:only-child)),
.body > :deep(.or-chip:last-child) {
  margin-top: auto;
  padding-top: .75rem;
  align-self: flex-start;
}
.body :deep(.or-qr) { margin: .75rem auto 0; }
/* a trailing QR code is centred in the space left under the text (not pinned to the bottom) */
.body > :deep(.or-qr:last-child) { margin-block: auto; }

/* tones */
.tone-orange .head { background: var(--or-orange-brand); color: var(--or-navy); }
.tone-slate .head { background: var(--or-slate); color: var(--or-white); }
.tone-navy {
  --or-fg-title: var(--or-white);
  --or-fg-body: #F4F4F4;
  --or-fg-muted: var(--or-navy-300);
  --or-accent-text: var(--or-orange-bright);
  --or-accent-text-large: var(--or-orange-bright);
  --or-code-inline-bg: var(--or-navy-700);
  --or-code-inline-fg: #F4F4F4;
  outline: var(--or-frame) solid var(--or-orange);
  outline-offset: calc(-1 * var(--or-frame));
}
.tone-navy .head { background: var(--or-navy); color: var(--or-white); }
.tone-navy .head-icon { color: var(--or-orange-bright); }
.tone-navy .body { background: var(--or-navy); color: #F4F4F4; }
.cards .tone-navy .body { --or-accent-text: var(--or-orange-bright); }

.footer {
  flex: none;
  margin-top: 1.75rem;
  font-size: var(--or-fs-small);
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: .2px;
  color: var(--or-fg-muted);
  text-align: center;
}
.footer :deep(p) { margin: 0; }
</style>
