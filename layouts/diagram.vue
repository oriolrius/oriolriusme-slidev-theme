<!--
  diagram (new): a title and one full-width diagram (paper surface: diagrams are exported on white).

  Frontmatter props
    image:      string   deck URL of the PNG, e.g. /diagrams/harness-timeline.png
    alt:        string   REQUIRED: the diagram in prose (long description)
    maxHeight?: string   CSS length for the image, default '56vh'
  Slots
    default:  # Title (may carry an inline <Tag>)
    caption:  one centred line under the figure (chips, <Ts> sources), 22px
    bottom:   a callout
  The image is .zoomable (click to zoom, Esc closes).
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  image?: string
  alt: string              // REQUIRED: Vue warns in dev when a diagram ships without a description
  maxHeight?: string
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  image: '',
  maxHeight: '56vh',
})

if (import.meta.env.DEV && props.image && !String(props.alt ?? '').trim())
  console.warn(`[slidev-theme-oriolrius] diagram "${props.image}" has no alt text: describe the diagram in prose.`)

const figStyle = computed(() => ({ '--max-h': props.maxHeight }))
</script>

<template>
  <div class="slidev-layout diagram">
    <div class="or-title">
      <slot />
    </div>
    <figure class="figure" :style="figStyle">
      <img v-if="image" class="zoomable" :src="image" :alt="alt">
      <figcaption v-if="$slots.caption" class="caption">
        <slot name="caption" />
      </figcaption>
    </figure>
    <div v-if="$slots.bottom" class="bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.diagram {
  display: flex;
  flex-direction: column;
}
.or-title { flex: none; }
.figure {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0;
}
.figure img {
  display: block;
  width: 100%;
  max-height: var(--max-h);
  object-fit: contain;
}
.caption {
  max-width: 100%;
  font-size: var(--or-fs-small);
  font-weight: 400;
  line-height: 1.5;
  color: var(--or-fg-muted);
  text-align: center;
}
.caption :deep(p) { margin: 0; }
.bottom {
  flex: none;
  margin-top: 1.25rem;
}
.bottom > :deep(*:last-child) { margin-bottom: 0; }
</style>
