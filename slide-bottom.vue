<!--
  slidev-theme-oriolrius · the footer: the oriolrius.me logo on every slide.

  A PER-SLIDE layer (Slidev renders `slide-bottom.vue` inside every SlideWrapper: play, presenter, overview,
  print and export), not a global one. So the footer belongs to its slide: it fades WITH the slide on a
  transition (a global footer switched instantly while the slides cross-faded: a pale logo on the fading
  band, "6 / 35" beside slide 5), and it is on every overview / presenter thumbnail too.

  Left:  the FRAMED oriolrius.me logo (logo_v5: the frame is the brand, and the talk's metaphor)
         + themeConfig.footer
  Right: "n / N" (N = themeConfig.pageTotal ?? total) or "Appendix" when frontmatter.appendix
  Hidden only on cover and end (they carry the big framed logo themselves) or with frontmatter `footer: false`.
  Never hidden just because a slide is the last one.
  The logo is 167×44 at bottom 14px (y 1022-1066): content ends at the content line 992
  (--or-pad-bottom 88px), 30px above it, so the framed logo is the footer's rule (no separate hairline).
  Variants (the logo always matches its surface):
    paper / mist          orange frame + orange letters, slate text
    navy (demo, photo     white letters + orange frame, navy-300 text
      section dividers)
    band (section)        white frame + white letters, navy text (brand: nothing under 48px is white on
                          orange; the logo is a logo, not text)
  Everything comes from the slide's own context (useSlideContext), never from the current nav position.
-->
<script setup lang="ts">
import { configs, useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import logoOrange from './assets/logo-framed-orange.svg'
import logoWhite from './assets/logo-framed-white.svg'
import logoWhiteOrangeFrame from './assets/logo-framed-white-orange-frame.svg'

const { $page, $frontmatter, $route, $nav } = useSlideContext()

const frontmatter = computed(() => ($frontmatter ?? {}) as Record<string, any>)
const themeConfig = computed(() => (configs.themeConfig ?? {}) as Record<string, any>)
const pageNo = computed(() => Number($page?.value) || 0)
// the same rule as useNav().currentLayout: the route's layout, else cover for slide 1, default otherwise
const layout = computed(() => String(($route?.meta as any)?.layout || frontmatter.value.layout || (pageNo.value === 1 ? 'cover' : 'default')))

const HIDDEN_ON = new Set(['cover', 'end'])
const hidden = computed(() => HIDDEN_ON.has(layout.value) || frontmatter.value.footer === false)
const variant = computed(() => {
  if (layout.value === 'demo')
    return 'is-dark'
  if (layout.value === 'section')
    return frontmatter.value.image ? 'is-dark' : 'is-band'   // a photo divider is a dark surface
  return ''
})
const logo = computed(() => ({ 'is-dark': logoWhiteOrangeFrame, 'is-band': logoWhite })[variant.value] ?? logoOrange)

function navTotal() {
  try {
    return Number($nav?.value?.total) || 0
  }
  catch {
    return 0   // no Slidev context (should not happen): show "n" alone rather than break the slide
  }
}
const pageTotal = computed(() => Number(themeConfig.value.pageTotal) || navTotal())
const pageLabel = computed(() => frontmatter.value.appendix
  ? 'Appendix'
  : (pageTotal.value ? `${pageNo.value} / ${pageTotal.value}` : String(pageNo.value)))
</script>

<template>
  <footer v-if="!hidden" class="or-footer" :class="variant" aria-hidden="true">
    <img class="or-footer-mark" :src="logo" alt="oriolrius.me">
    <span v-if="themeConfig.footer" class="or-footer-title">{{ themeConfig.footer }}</span>
    <span class="or-footer-page">{{ pageLabel }}</span>
  </footer>
</template>

<style>
.or-footer {
  position: absolute;
  z-index: 10;
  left: var(--or-pad-x, 6rem);
  right: var(--or-pad-x, 6rem);
  bottom: 14px;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 1rem;
  pointer-events: none;
  font-family: var(--or-font-ui);
  font-size: var(--or-fs-meta, 1rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: .3px;
  color: #54595F;
}
.or-footer-mark {
  display: block;
  height: 44px;
  width: auto;
}
.or-footer-title {
  padding-left: 1rem;
  border-left: 1px solid #D5D6D7;
}
.or-footer-page {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}
/* navy (demo, photo dividers) */
.or-footer.is-dark { color: #8C8FBF; }
.or-footer.is-dark .or-footer-title { border-left-color: #3D3F99; }
/* orange band (section): navy text 5.31:1 on #F46524; the white logo is the logo, not text */
.or-footer.is-band { color: #151652; }
.or-footer.is-band .or-footer-title { border-left-color: rgba(21, 22, 82, .35); }
</style>
