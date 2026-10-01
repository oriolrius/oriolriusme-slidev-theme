<!--
  <Tag kind="inference|self-reported|opinion|illustrative" note="…" />
  A confidence label for anything that is not verified fact. Inline (fits in an h1).
    inference     fa-diagram-project, DASHED outline   (my reconstruction from evidence)
    self-reported fa-bullhorn                          (a vendor's number about itself)
    opinion       fa-lightbulb                         (a hope / a view)
    illustrative  fa-flask                             (reconstructed output, e.g. terminal replays)
  Label = kind + " · note" when `note` is set. Roboto 500 20px uppercase.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  kind: 'inference' | 'self-reported' | 'opinion' | 'illustrative'
  note?: string
}>(), {
  note: '',
})

const ICONS: Record<string, string> = {
  'inference': 'fa-diagram-project',
  'self-reported': 'fa-bullhorn',
  'opinion': 'fa-lightbulb',
  'illustrative': 'fa-flask',
}
const icon = computed(() => ICONS[props.kind] ?? 'fa-circle-info')
const label = computed(() => props.note ? `${props.kind} · ${props.note}` : props.kind)
</script>

<template>
  <span class="or-tag" :class="`kind-${kind}`" :title="label">
    <i class="fas" :class="icon" aria-hidden="true" />
    <span class="or-tag-label">{{ label }}</span>
  </span>
</template>

<style>
.or-tag {
  display: inline-flex;
  align-items: center;
  gap: .45em;
  padding: .12em .5em .1em;
  border: 1.5px solid var(--or-fg-muted, #54595F);
  border-radius: var(--or-radius-ui, 4px);
  font-family: var(--or-font-ui);
  font-size: var(--or-fs-ui, 1.25rem);
  font-weight: 500;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: .5px;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  color: var(--or-fg-muted, #54595F);
  position: relative;
  top: -.08em;
}
.or-tag i { font-size: .85em; color: inherit; }
.or-tag.kind-inference { border-style: dashed; }
</style>
