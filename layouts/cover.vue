<!--
  cover (overrides Slidev's built-in): brand board A, the flat navy opener.

  Frontmatter props
    kicker?:   string                       Yanone eyebrow above the title, e.g. "AI ENGINEERING · HARNESS ENGINEERING"
    portrait?: 'default' | 'none' | string  'default' = theme photo with orange ring, bleeding off the
                                            bottom-right corner (brand board A); a string = a deck URL
    logo?:     'default' | 'none'           'default' = framed oriolrius.me logo (white letters, orange frame)
  Slots
    default:   # Title  +  one paragraph = the lead
    meta:      name · site
    credit:    the source-talk line
  No footer, no progress hairline.
-->
<script setup lang="ts">
import { computed } from 'vue'
import logoDefault from '../assets/logo-framed-white-orange-frame.svg'
import portraitDefault from '../assets/photo-oriol-round-800-orange-ring.png'

// 'default' | 'none' autocomplete, while any URL string is still accepted
type Asset = 'default' | 'none' | (string & {})

const props = withDefaults(defineProps<{
  kicker?: string
  portrait?: Asset
  logo?: 'default' | 'none'
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  kicker: '',
  portrait: 'default',
  logo: 'default',
})

const portraitSrc = computed(() => {
  if (!props.portrait || props.portrait === 'none')
    return null
  return props.portrait === 'default' ? portraitDefault : props.portrait
})
const logoSrc = computed(() => (props.logo === 'none' ? null : logoDefault))
</script>

<template>
  <div class="slidev-layout cover surface-navy">
    <div class="cover-text">
      <div v-if="kicker" class="kicker">
        {{ kicker }}
      </div>
      <slot />
      <div v-if="$slots.meta" class="meta">
        <slot name="meta" />
      </div>
      <div v-if="$slots.credit" class="credit">
        <slot name="credit" />
      </div>
    </div>
    <img v-if="portraitSrc" class="portrait" :src="portraitSrc" alt="Oriol Rius">
    <img v-if="logoSrc" class="logo" :src="logoSrc" alt="oriolrius.me">
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-bottom: 8rem;
}
.cover-text {
  position: relative;
  z-index: 1;
  width: 62%;          /* 1190px: the 104px title stays on one line; the portrait starts lower right */
  margin-top: -1rem;
}
.kicker {
  font-family: var(--or-font-display);
  font-size: var(--or-fs-kicker);
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--or-ls-kicker);
  text-transform: uppercase;
  color: var(--or-orange-bright);
  margin-bottom: 1.5rem;
}
.cover-text :deep(h1) {
  font-size: 6.5rem;   /* 104px, brand board A's scale at this width */
  line-height: 1.05;
  letter-spacing: -.5px;
  color: var(--or-white);
  margin: 0;
}
.cover-text :deep(h1)::after {
  content: '';
  display: block;
  width: 120px;
  height: var(--or-rule);
  background: var(--or-orange);
  margin-top: 2rem;
}
.cover-text :deep(h1 + p),
.cover-text :deep(h2) {
  max-width: 22em;
  margin: 2rem 0 0;
  font-size: var(--or-fs-lead);
  font-weight: 500;
  font-style: italic;
  line-height: var(--or-lh-lead);
  letter-spacing: 0;
  color: #F4F4F4;
  text-wrap: balance;   /* two even lines, no one-phrase orphan */
}
.meta {
  /* the speaker line: the same family as the credit under it, and the largest of the two */
  margin-top: 3.25rem;
  font-family: var(--or-font-sans);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: .3px;
  color: #F4F4F4;
}
.credit {
  margin-top: .75rem;
  max-width: 100%;
  font-size: var(--or-fs-small);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: .2px;
  color: var(--or-navy-300);
}
.meta :deep(p),
.credit :deep(p) { margin: 0; }
.meta :deep(strong),
.credit :deep(strong) { color: #F4F4F4; }
.portrait {
  /* brand board A: the ring bleeds off TWO edges (right and bottom), so the cut reads as deliberate.
     The circle spans x 1310-2070, y 430-1190; the face (upper half of the photo) stays fully visible. */
  position: absolute;
  z-index: 0;
  right: -150px;
  bottom: -110px;
  width: 760px;
  height: 760px;
  max-width: none;
  object-fit: contain;
}
.logo {
  position: absolute;
  left: var(--or-pad-x);
  bottom: 3.5rem;
  height: 64px;
  width: auto;
}
</style>
