<!--
  <Ts t="09:26" />   or   <Ts t="1:02:03" v="VIDEO_ID" />
  A timestamp chip "[mm:ss]" with a play glyph, linking to that second of the talk video.
  v defaults to themeConfig.video. Clickable in the PDF (a real <a href>).
  Roboto 500 18px: the one sanctioned sub-20px UI text (a reference chip, not content).
-->
<script setup lang="ts">
import { configs } from '@slidev/client'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  t: string
  v?: string
}>(), {
  v: '',
})

const seconds = computed(() => String(props.t || '0')
  .split(':')
  .map(n => Number.parseInt(n, 10) || 0)
  .reduce((acc, n) => acc * 60 + n, 0))

const videoId = computed(() => props.v || String((configs.themeConfig as Record<string, unknown> | undefined)?.video ?? ''))
const href = computed(() => videoId.value
  ? `https://www.youtube.com/watch?v=${videoId.value}&t=${seconds.value}s`
  : undefined)
</script>

<template>
  <a class="or-ts" :href="href" target="_blank" rel="noopener" :title="`Watch at ${t}`">
    <i class="fas fa-play" aria-hidden="true" />[{{ t }}]
  </a>
</template>

<style>
.slidev-layout a.or-ts,
.or-ts {
  display: inline-flex;
  align-items: center;
  gap: .35em;
  padding: .05em .4em;
  border: 1px solid currentColor;
  border-radius: var(--or-radius-ui, 4px);
  font-family: var(--or-font-ui);
  font-size: 1.125rem;
  font-weight: 500;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: .3px;
  text-decoration: none;
  text-transform: none;
  white-space: nowrap;
  vertical-align: .22em;   /* the chip's box centres on the x-height of 22-28px text */
  /* --or-ink-small: set by tinted boxes (callout, or-box), where 18px #C95000 would fall under 4.5:1 */
  color: var(--or-ink-small, var(--or-accent-text, #C95000));
}
.or-ts i { font-size: .7em; }
.slidev-layout a.or-ts:hover { color: var(--or-fg-title); }
</style>
