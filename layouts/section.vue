<!--
  section (overrides Slidev's built-in): brand board C, the orange band divider, or brand board D, the
  dark photo band, when `image` is set.

  Frontmatter props
    part?:    string   Yanone kicker above the frame, e.g. "PART 02" (navy on the band, orange on a photo)
    image?:   string   deck URL of a photo (/images/x.jpg): the divider becomes a DARK PHOTO BAND
                       (black overlay, white title in an orange frame, like the site's TEDx / workshop bands)
    overlay?: number   black overlay opacity over the photo, 0-1 (default .62; the site uses .56-.75)
    imagePosition?: string   CSS background-position of the photo (default 'center 40%'). A 3:2 photo
                       covers the 16:9 slide with ~200px of vertical play: 'center top' shows its top
                       edge, 'center 70%' its lower part. Use it to keep a face clear of the frame.
    align?:   'center' | 'left'   default 'center'. 'left' = the site's hero split: kicker, frame and
                       subtitle left-aligned at the content edge (x 96), the frame hugging its title
                       (at most 968px: a longer title wraps, balanced), for a photo whose subject is on
                       the right. The y geometry is unchanged.
  Slots
    default: # Title (write sentence case: it is UPPERCASED by CSS)  +  an optional subtitle paragraph
    rail:    optional, e.g. <BranchRail show-commits /> (renders 3rem below the subtitle)
  Geometry: the PART kicker and the frame sit at the SAME y on every divider (with or without a rail,
  with a one- or two-line subtitle); the rail hangs below. The subtitle is never wider than the frame.
  The frame draws itself on entry (0.9s); exports and reduced motion show it complete.
  The footer shows in its band variant (white wordmark, navy text) or, on a photo, its dark variant.
  Transitions: the theme default is `fade`.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  part?: string
  image?: string
  overlay?: number | string
  imagePosition?: string
  align?: 'center' | 'left'
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  part: '',
  image: '',
  overlay: 0.62,
  imagePosition: 'center 40%',
  align: 'center',
})

const photoStyle = computed(() => {
  if (!props.image)
    return undefined
  const o = Math.min(1, Math.max(0, Number(props.overlay)))
  const a = Number.isFinite(o) ? o : 0.62
  return {
    backgroundImage: `linear-gradient(rgba(0,0,0,${a}), rgba(0,0,0,${a})), url("${props.image}")`,
    backgroundSize: 'cover',
    backgroundPosition: props.imagePosition || 'center 40%',
  }
})
</script>

<template>
  <div
    class="slidev-layout section"
    :class="[image ? 'surface-navy is-photo' : 'surface-band', { 'align-left': align === 'left' }]"
    :style="photoStyle"
  >
    <div class="stack">
      <div v-if="part" class="kicker">
        {{ part }}
      </div>
      <div class="section-body">
        <slot />
      </div>
    </div>
    <div v-if="$slots.rail" class="rail">
      <slot name="rail" />
    </div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  /* a FIXED top, not a centred stack: the PART kicker starts at y = 352 and the frame at y = 416 on
     every divider, so nothing jumps from one part to the next */
  padding-top: 22rem;
  padding-bottom: var(--or-pad-bottom);   /* clear of the band footer */
}
.is-photo { background-color: #000; }
.stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.kicker {
  font-family: var(--or-font-display);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--or-ls-kicker);
  text-transform: uppercase;
  color: var(--or-navy);
  margin-bottom: 1.5rem;
}
.is-photo .kicker { color: var(--or-orange-bright); }
/* the frame and the subtitle share one grid column whose width is set by the frame alone:
   the subtitle has no inline size of its own (width 0, min-width 100%), so it wraps at the frame */
.section-body {
  display: inline-grid;
  grid-template-columns: minmax(0, auto);
  justify-items: center;
  max-width: 100%;
}
.section-body :deep(h1) {
  position: relative;
  display: block;
  min-width: 968px;   /* 56% of the 1728px content box: short titles still get a wide frame */
  max-width: 100%;
  margin: 0;
  padding: .2em 1.2em;
  border: var(--or-frame) solid transparent;   /* the visible frame is ::before (it draws itself) */
  font-size: var(--or-fs-divider);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--or-white);
}
.section-body :deep(h1)::after { content: none; }
.section-body :deep(h1)::before {
  content: '';
  position: absolute;
  inset: calc(-1 * var(--or-frame));
  border: var(--or-frame) solid var(--or-accent);
  pointer-events: none;
  -webkit-mask: conic-gradient(#000 var(--or-draw), #0000 0);
  mask: conic-gradient(#000 var(--or-draw), #0000 0);
  animation: or-frame-draw .9s var(--or-ease) .15s backwards;
}
.is-photo .section-body :deep(h1)::before { border-color: var(--or-orange); }
.section-body :deep(h1 + p),
.section-body :deep(h2) {
  width: 0;
  min-width: 100%;
  text-wrap: balance;
  margin: 2rem 0 0;
  font-size: var(--or-fs-lead);
  font-weight: 500;
  font-style: italic;
  line-height: var(--or-lh-lead);
  letter-spacing: 0;
  color: var(--or-navy);
}
.is-photo .section-body :deep(h1 + p),
.is-photo .section-body :deep(h2) { color: #F4F4F4; }
.rail {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  width: 100%;
}
/* align: left, the site's hero split (text left, photo subject right). Same y geometry: the kicker at
   352 and the frame at 416; the frame hugs its title and the subtitle wraps at the frame's width */
.align-left {
  align-items: flex-start;
  text-align: left;
}
.align-left .stack { align-items: flex-start; }
.align-left .section-body { justify-items: start; }
/* the text stays on the left ~half (968px, 56% of the content box): a longer title wraps, balanced, inside
   its frame instead of running over the photo's subject */
.align-left .section-body :deep(h1) {
  min-width: 0;
  max-width: 968px;
  text-align: center;   /* a wrapped title keeps the frame's width: its balanced lines sit centred in it */
  text-wrap: balance;
}
.align-left .rail { justify-content: flex-start; }
@media (prefers-reduced-motion: reduce) {
  .section-body :deep(h1)::before { animation: none; }
}
</style>
