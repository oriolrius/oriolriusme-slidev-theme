<!--
  <QuoteCard who="Tejas Kumar" t="09:26">So we hit a login screen…</QuoteCard>
  <QuoteCard who="Tejas Kumar" src="blog">A model saying it finished is a claim…</QuoteCard>
  <QuoteCard who="Tejas Kumar" t="09:26" pointer="none">…</QuoteCard>
  The site's testimonial box: a 2px orange outline with a diamond pointer on the left.
  Text: Ubuntu 300 italic (body size, title colour). Footer: `who` in bold orange + <Ts :t> or "(src)".
  On navy the outline is #FF8533 and the text #F4F4F4 (role tokens).

  pointer?: 'auto' | 'down' | 'up' | 'none'   (default 'auto')
    auto = 'up' when the card sits in a BOTTOM slot (demo `verdict`, code-focus / diagram `bottom`,
           two-cols-header `bottom`, four-grid `callout`), 'down' everywhere else. A bottom card's
           down-pointer would aim at whatever sits below it: the footer's framed logo (it read as if
           oriolrius.me were the speaker) or the "In plain words" strip. Up, it points at the content
           the quote comments on.
    down / up = force it; none = no pointer (a plain framed quote).
-->
<script setup lang="ts">
import Ts from './Ts.vue'

withDefaults(defineProps<{
  who: string
  t?: string
  src?: string
  pointer?: 'auto' | 'down' | 'up' | 'none'
}>(), {
  t: '',
  src: '',
  pointer: 'auto',
})
</script>

<template>
  <blockquote class="or-quotecard" :class="`pointer-${pointer}`">
    <div class="or-quotecard-text">
      <slot />
    </div>
    <footer class="or-quotecard-by">
      <span class="who">{{ who }}</span>
      <Ts v-if="t" :t="t" />
      <span v-else-if="src" class="src">({{ src }})</span>
    </footer>
  </blockquote>
</template>

<style>
/* the outline is a graphic, so it takes the NON-text accent (#FF6600 like every frame and bar;
   the site's testimonial border is #FF6600 too). On navy it is the brighter #FF8533 of the demo chip. */
.slidev-layout .or-quotecard {
  --or-quote-line: var(--or-accent);
  position: relative;
  padding: 1.1rem 1.75rem 1.2rem;
  border: var(--or-outline, 2px) solid var(--or-quote-line);
  border-radius: 0;
  background: var(--or-bg);
  font-size: var(--or-fs-body);
  font-style: normal;
  font-weight: 300;
  line-height: var(--or-lh-body);
  color: var(--or-fg-title);
  text-align: left;
}
/* the diamond pointer, bottom-left, like the site's testimonials (its tip hangs ~11px outside the box) */
.slidev-layout .or-quotecard::after {
  content: '';
  position: absolute;
  left: 2.25rem;
  bottom: -10px;
  width: 16px;
  height: 16px;
  background: var(--or-bg);
  border-right: var(--or-outline, 2px) solid var(--or-quote-line);
  border-bottom: var(--or-outline, 2px) solid var(--or-quote-line);
  transform: rotate(45deg);
}
/* up: top-left, pointing at the content above (forced, or automatic in a bottom slot) */
.slidev-layout .or-quotecard.pointer-up::after,
.slidev-layout :is(.verdict, .bottom, .col-bottom, .callout-area) .or-quotecard.pointer-auto::after {
  top: -10px;
  bottom: auto;
  transform: rotate(225deg);
}
.slidev-layout .or-quotecard.pointer-none::after { content: none; }
.slidev-layout.surface-navy .or-quotecard,
.slidev-layout .surface-navy .or-quotecard { --or-quote-line: var(--or-orange-bright); }
.slidev-layout .or-quotecard-text {
  font-style: italic;
  color: var(--or-fg-title);
}
.slidev-layout .or-quotecard-text > * { margin: 0; }
.slidev-layout .or-quotecard-text::before { content: '\201C'; }
.slidev-layout .or-quotecard-text::after { content: '\201D'; }
.slidev-layout .or-quotecard-text > p { display: inline; }
.slidev-layout .or-quotecard-by {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .6rem;
  margin-top: .6rem;
  font-size: var(--or-fs-small);
  font-style: normal;
  line-height: 1.3;
}
.slidev-layout .or-quotecard-by .who {
  font-weight: 700;
  color: var(--or-accent-text);
}
.slidev-layout .or-quotecard-by .src {
  font-weight: 400;
  color: var(--or-fg-muted);
}
.slidev-layout.surface-navy .or-quotecard-text { color: #F4F4F4; }
</style>
