<!--
  <Terminal title="npm run agent · branch 0" illustrative>

  ```text
  $ npm run agent
  …
  ```

  </Terminal>
  A dark terminal window: 40px title bar (three square dots, the title, an ILLUSTRATIVE <Tag> on the
  right when `illustrative`), then the default slot, which must be ONE fenced `text` code block
  written with blank lines around it. Code on navy-900, 2px navy-500 border, no orange bar.
  `size` = 20 (default) | 22 | 24 px: use 24 when the terminal IS the evidence the room must read
  (a cold open) and its lines fit. Looks the same on paper and on navy.
-->
<script setup lang="ts">
import { computed } from 'vue'
import Tag from './Tag.vue'

const props = withDefaults(defineProps<{
  title?: string
  illustrative?: boolean
  size?: 20 | 22 | 24 | '20' | '22' | '24'
}>(), {
  title: '',
  illustrative: false,
  size: 20,
})

const style = computed(() => {
  const n = Number(props.size)
  const px = [20, 22, 24].includes(n) ? n : 20
  return { '--slidev-code-font-size': `${px}px` }
})
</script>

<template>
  <figure class="or-terminal" :style="style">
    <figcaption class="or-terminal-bar">
      <span class="dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="title">{{ title }}</span>
      <Tag v-if="illustrative" kind="illustrative" />
    </figcaption>
    <div class="or-terminal-body">
      <slot />
    </div>
  </figure>
</template>

<style>
.slidev-layout .or-terminal {
  --slidev-code-background: var(--or-navy-900);
  --slidev-code-font-size: 20px;
  --slidev-code-line-height: 1.5;
  --slidev-code-margin: 0;
  --slidev-code-padding: 1.1rem;
  border: 2px solid var(--or-navy-500);
  background: var(--or-navy-900);
  border-radius: 0;
  text-align: left;
}
.slidev-layout .or-terminal-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 40px;
  padding: 0 .9rem;
  background: var(--or-navy-900);
  border-bottom: 1px solid var(--or-navy-700);
}
.slidev-layout .or-terminal-bar .dots { display: inline-flex; gap: 7px; }
.slidev-layout .or-terminal-bar .dots i {
  display: block;
  width: 10px;
  height: 10px;
  background: var(--or-navy-500);
}
.slidev-layout .or-terminal-bar .title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--or-font-ui);
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: .3px;
  color: var(--or-navy-300);
}
.slidev-layout .or-terminal-bar .or-tag {
  --or-fg-muted: var(--or-navy-300);
  flex: none;
  top: 0;
}
.slidev-layout .or-terminal-body > p { margin: 0; }
.slidev-layout .or-terminal .slidev-code {
  border-left: 0;
  color: #F4F4F4;
}
/* a terminal wraps long lines at its right edge instead of hiding them */
.slidev-layout .or-terminal .slidev-code > code { min-width: 0; }
.slidev-layout .or-terminal .slidev-code > code > .line {
  white-space: pre-wrap;
  word-break: break-all;
}
.slidev-layout .or-terminal .slidev-code-wrapper { margin: 0; }
</style>
