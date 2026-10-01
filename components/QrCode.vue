<!--
  <QrCode value="https://…" :size="200" dark="#151652" light="#0000" />
  An inline SVG QR code rendered offline (npm `qrcode`), error correction M, no quiet zone.
  Default: navy modules on a transparent background, 200px. Works in the PDF export
  (the export `--wait` covers the async render).
-->
<script setup lang="ts">
import QRCode from 'qrcode'
import { computed, ref, watchEffect } from 'vue'

const props = withDefaults(defineProps<{
  value: string
  size?: number | string
  dark?: string
  light?: string
}>(), {
  size: 200,
  dark: '#151652',
  light: '#0000',
})

const svg = ref('')
// a request counter: when `value` changes quickly, a slower earlier render must not overwrite a newer one
let seq = 0
watchEffect(async () => {
  const id = ++seq
  const value = props.value
  const color = { dark: props.dark, light: props.light }
  if (!value) {
    svg.value = ''
    return
  }
  try {
    const s = await QRCode.toString(value, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color })
    if (id === seq)
      svg.value = s
  }
  catch (e) {
    console.error('[QrCode]', e)
    if (id === seq)
      svg.value = ''
  }
})

const style = computed(() => {
  const n = Number(props.size) || 200
  return { width: `${n}px`, height: `${n}px` }
})
</script>

<template>
  <div class="or-qr" :style="style" role="img" :aria-label="`QR code: ${value}`" v-html="svg" />
</template>

<style>
.or-qr {
  display: block;
  flex: none;
  line-height: 0;
}
.or-qr svg {
  display: block;
  width: 100%;
  height: 100%;
  shape-rendering: crispEdges;
}
</style>
