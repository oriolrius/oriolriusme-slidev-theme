<!--
  end (new): the closing orange band (the site's CTA band).

  Frontmatter props
    kicker?:  string   default "THANK YOU · QUESTIONS?" (navy Yanone)
    qr?:      string   URL encoded in the QR code (bottom-right, navy on a white framed tile, 4-module
                       quiet zone) and linked (clickable in the PDF)
    qrLabel?: string   one line under the QR code
    quoted?:  boolean  true (default): the layout adds the curly quotes around the closing quote and hangs
                       the opening one in the margin, so every line starts flush. Don't type them; if you
                       do, they are detected and not doubled (the opening one still hangs).
  Slots
    default:  1st paragraph = the closing quote (white, 64px bold, <= 2 lines of ~45 characters);
              2nd paragraph = attribution (navy italic)
    links:    <span class="or-chip on-band">…</span> chips (or <a class="or-chip on-band" href>)
  Also renders: the framed oriolrius.me logo (white, top-right) and Oriol's sign-off, bottom-left: the
  Bitmoji-with-coffee avatar and his white signature beside it. No footer; the hairline turns navy.
  Brand rule: nothing under 48px is white on the band; smaller text is navy.
-->
<script setup lang="ts">
import type { Slot, VNode } from 'vue'
import { Fragment, Text } from 'vue'
import avatar from '../assets/avatar-oriol-illustration.png'
import logo from '../assets/logo-framed-white.svg'
import signature from '../assets/signature-white@3x.png'
import QrCode from '../components/QrCode.vue'

const props = withDefaults(defineProps<{
  kicker?: string
  qr?: string
  qrLabel?: string
  quoted?: boolean
  frontmatter?: Record<string, unknown>   // passed by Slidev; declared so it isn't a DOM attribute
}>(), {
  kicker: 'THANK YOU · QUESTIONS?',
  qr: '',
  qrLabel: '',
  quoted: true,
})

// the first text of the first paragraph: did the author type the opening quote mark?
function firstText(nodes: unknown): string {
  if (typeof nodes === 'string')
    return nodes
  if (Array.isArray(nodes)) {
    for (const n of nodes) {
      const t = firstText(n)
      if (t.trim())
        return t
    }
    return ''
  }
  const v = nodes as VNode | null
  if (!v || typeof v !== 'object')
    return ''
  if (v.type === Text)
    return String(v.children ?? '')
  if (v.type === Fragment || typeof v.type === 'string')
    return firstText(v.children)
  return ''
}
// called from the template (inside render), so reading the slot is reactive and warning-free
function quoteClass(slot: Slot | undefined) {
  const typed = /^\s*["“‘«]/.test(firstText(slot?.() ?? []))
  return { 'is-quoted': props.quoted && !typed, 'has-typed-marks': props.quoted && typed }
}
</script>

<template>
  <div class="slidev-layout end surface-band">
    <img class="logo" :src="logo" alt="oriolrius.me">
    <div class="content">
      <div class="quote" :class="quoteClass($slots.default)">
        <slot />
      </div>
      <div v-if="kicker" class="kicker">
        {{ kicker }}
      </div>
      <div v-if="$slots.links" class="links">
        <slot name="links" />
      </div>
    </div>
    <div class="signoff">
      <img class="avatar" :src="avatar" alt="">
      <img class="signature" :src="signature" alt="Oriol Rius signature">
    </div>
    <aside v-if="qr" class="qr">
      <a class="qr-tile" :href="qr" target="_blank" rel="noopener" :title="qr">
        <QrCode :value="qr" dark="#151652" light="#FFFFFF" :size="300" />
      </a>
      <p v-if="qrLabel" class="qr-label">
        {{ qrLabel }}
      </p>
    </aside>
  </div>
</template>

<style scoped>
.end {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 8rem;       /* clear of the logo */
  padding-bottom: 15rem;   /* clear of the sign-off / QR row */
}
.logo {
  position: absolute;
  top: 3.5rem;
  right: var(--or-pad-x);
  height: 64px;
  width: auto;
}
.content {
  position: relative;
  z-index: 1;
  /* 1440px: a 64px bold line of ~45 characters fits; the right edge (x 1536) stays clear of the QR tile,
     which starts below the quote */
  max-width: min(100%, 90rem);
}
.quote :deep(p:first-child) {
  position: relative;
  max-width: 100%;
  margin: 0;
  font-size: 4rem;
  font-weight: 700;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: 0;
  color: var(--or-white);
  text-wrap: balance;
}
/* the opening mark hangs in the margin, so every line of the quote starts flush with the kicker */
.quote.is-quoted :deep(p:first-child)::before {
  content: '\201C';
  position: absolute;
  right: 100%;
}
.quote.is-quoted :deep(p:first-child)::after { content: '\201D'; }
.quote.has-typed-marks :deep(p:first-child) { text-indent: -.45em; }
.quote :deep(p:nth-child(2)) {
  margin: 1.5rem 0 0;
  font-size: var(--or-fs-lead);
  font-weight: 500;
  font-style: italic;
  line-height: var(--or-lh-lead);
  color: var(--or-navy);
}
.quote :deep(p:nth-child(2) strong) { color: var(--or-navy); }
.kicker {
  margin-top: 3rem;
  font-family: var(--or-font-display);
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: var(--or-ls-kicker);
  text-transform: uppercase;
  color: var(--or-navy);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  max-width: 1200px;
}
.links :deep(p) { display: contents; margin: 0; }
/* Oriol's sign-off: the avatar peeking in bottom-left, the signature beside it, on the same baseline */
.signoff {
  position: absolute;
  left: calc(var(--or-pad-x) + 1rem);
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  pointer-events: none;
}
.avatar {
  display: block;
  height: 300px;
  width: auto;
  max-width: none;
}
.signature {
  display: block;
  width: 240px;
  height: auto;
  margin-bottom: 3rem;
}
.qr {
  position: absolute;
  right: calc(var(--or-pad-x) + 12px);
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qr-tile {
  /* 36px of white = 4 modules of quiet zone around a 33-module code at 300px */
  display: block;
  padding: 36px;
  background: var(--or-white);
  outline: var(--or-frame) solid var(--or-white);
  outline-offset: 8px;
  line-height: 0;
  text-decoration: none;
}
.qr-label {
  margin: 1.5rem 0 0;
  white-space: nowrap;
  font-size: var(--or-fs-small);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: .2px;
  color: var(--or-navy);
  text-align: center;
}
</style>
