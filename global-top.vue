<!--
  slidev-theme-oriolrius · act-progress hairline (3px, top edge).
  Width = currentSlideNo / (themeConfig.pageTotal ?? total), capped at 100% (appendix).
  Orange (#FF6600) on paper / mist / navy (and photo dividers); navy on the orange band (section, end);
  hidden on cover.
  Slidev 52 has no .slidev-progress-bar: this layer draws it.
-->
<script setup lang="ts">
import { configs, useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentSlideNo, currentLayout, currentSlideRoute, total } = useNav()

const frontmatter = computed(() => (currentSlideRoute.value?.meta?.slide?.frontmatter ?? {}) as Record<string, any>)
const pageTotal = computed(() => Number((configs.themeConfig as Record<string, any> | undefined)?.pageTotal) || total.value)
const width = computed(() => `${Math.min(100, (currentSlideNo.value / pageTotal.value) * 100)}%`)
const hidden = computed(() => currentLayout.value === 'cover' || frontmatter.value.progress === false)
const onBand = computed(() => (currentLayout.value === 'section' && !frontmatter.value.image) || currentLayout.value === 'end')
</script>

<template>
  <div v-if="!hidden" class="or-progress" :class="{ 'on-band': onBand }" :style="{ width }" aria-hidden="true" />
</template>

<style>
.or-progress {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: 3px;
  background: #FF6600;
  pointer-events: none;
  transition: width var(--or-dur, .3s) var(--or-ease, ease);
}
.or-progress.on-band { background: #151652; }
</style>
