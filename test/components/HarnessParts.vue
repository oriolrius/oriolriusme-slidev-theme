<!--
  HarnessParts · deck component ("The Agent That Lied")
  The six parts of an agent harness (slide 10) as 40px icon tiles, always in the same order, so the map
  from slide 10 visibly fills in, in the rail row of the Part 02 slides.

  Usage
    <HarnessParts />                                                                  slide 12: all dimmed
    <HarnessParts :active="['tools','model','context','loop']" :missing="['guardrails','verify']" />   13
    <HarnessParts :active="['tools','model','context','loop','guardrails']" :new="['guardrails','context']" :missing="['verify']" />  15
    <HarnessParts :active="['tools','model','context','loop','guardrails']" :missing="['verify']" />   16
    <HarnessParts active="all" :new="['verify']" />                                    17
    <HarnessParts active="all" />                                                      18, 21
    <HarnessParts active="tools,model,loop" />                                        string shorthand

  Props
    active?:  Part[] | 'all' | string   default []. Orange icon. A comma-separated string also works.
    new?:     Part[]                     default []. 2px orange frame + one 0.8s pulse when the slide is
                                         shown (frozen in PDF/PNG export). A new part is also active.
    missing?: Part[]                     default []. Dashed outline + a small × badge, straddling the top
                                         edge and flush with the tile's right edge: it never widens the
                                         component, so the rail sits at the same x on every slide (it used
                                         to reserve 7px when verify was missing, and jumped on 12→13, 16→17).
    Part = 'tools' | 'model' | 'context' | 'guardrails' | 'loop' | 'verify'

  Tiles, in order (Font Awesome 6 solid, the glyphs of slide 10):
    tools fa-toolbox · model fa-brain · context fa-layer-group · guardrails fa-shield-halved ·
    loop fa-rotate · verify fa-magnifying-glass
  Inactive parts are the surface's muted colour at 40%. Each tile has a title ("Verify (missing)").
  Colours come from role tokens, so it works on paper, mist, navy and band.
  Deck component (not part of the theme). Copy of the deck's component, kept in sync for the showcase.
-->
<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

type Part = 'tools' | 'model' | 'context' | 'guardrails' | 'loop' | 'verify'

const props = withDefaults(defineProps<{
  active?: Part[] | 'all' | string
  new?: Part[]
  missing?: Part[]
}>(), {
  active: () => [],
  new: () => [],
  missing: () => [],
})

const PARTS: { id: Part, icon: string, name: string }[] = [
  { id: 'tools', icon: 'fa-toolbox', name: 'Tool registry' },
  { id: 'model', icon: 'fa-brain', name: 'Model' },
  { id: 'context', icon: 'fa-layer-group', name: 'Context' },
  { id: 'guardrails', icon: 'fa-shield-halved', name: 'Guardrails' },
  { id: 'loop', icon: 'fa-rotate', name: 'Agent loop' },
  { id: 'verify', icon: 'fa-magnifying-glass', name: 'Verify' },
]

const { isPrintMode } = useNav()

const tiles = computed(() => {
  const all = props.active === 'all'
  const list = Array.isArray(props.active)
    ? props.active
    : all ? [] : String(props.active ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const active = new Set(list)
  const fresh = new Set(props.new ?? [])
  const missing = new Set(props.missing ?? [])
  return PARTS.map(p => ({
    ...p,
    active: all || active.has(p.id) || fresh.has(p.id),
    fresh: fresh.has(p.id),
    missing: missing.has(p.id),
  }))
})
</script>

<template>
  <div
    class="or-harnessparts" :class="{ 'or-is-print': isPrintMode }"
    role="list" aria-label="The six parts of an agent harness"
  >
    <span
      v-for="t in tiles" :key="t.id" class="hp-tile" role="listitem"
      :class="{ 'is-active': t.active, 'is-new': t.fresh, 'is-missing': t.missing }"
      :title="`${t.name}${t.missing ? ' (missing)' : t.fresh ? ' (new)' : ''}`"
    >
      <i class="hp-icon fas" :class="t.icon" aria-hidden="true" />
      <i v-if="t.missing" class="hp-x fas fa-xmark" aria-hidden="true" />
    </span>
  </div>
</template>

<style>
.or-harnessparts {
  --hp-size: 40px;
  --hp-badge: 14px;
  --hp-on: var(--or-accent, #FF6600);
  --hp-off: var(--or-fg-muted, #54595F);
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 10px;
}
.or-harnessparts .hp-tile {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--hp-size);
  height: var(--hp-size);
  border: 2px solid transparent;
  font-size: 22px;
  line-height: 1;
  color: var(--hp-off);
}
.or-harnessparts .hp-icon { opacity: .4; }
.or-harnessparts .hp-tile.is-active { color: var(--hp-on); }
.or-harnessparts .hp-tile.is-active .hp-icon { opacity: 1; }
.or-harnessparts .hp-tile.is-missing {
  border: 2px dashed var(--hp-off);
  color: var(--hp-off);
}
.or-harnessparts .hp-tile.is-missing .hp-icon { opacity: .6; }
.or-harnessparts .hp-x {
  position: absolute;
  top: calc(var(--hp-badge) / -2);
  right: -2px;                 /* flush with the outer edge of the 2px dashed border */
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--hp-badge);
  height: var(--hp-badge);
  font-size: 10px;
  background: var(--hp-off);
  color: var(--or-bg, #fff);
}
.or-harnessparts .hp-tile.is-new {
  border: 2px solid var(--hp-on);
  animation: or-hp-new .8s var(--or-ease, cubic-bezier(.25, .1, .25, 1)) 1 both;
}
@keyframes or-hp-new {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--or-accent, #FF6600) 55%, transparent); }
  60% { box-shadow: 0 0 0 10px color-mix(in srgb, var(--or-accent, #FF6600) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 transparent; }
}
/* frozen in exports: @media print does not apply during `slidev export` (the theme's AGENTS.md), so the
   print-mode class from useNav() is used too; the theme's styles/print.css also kills .or-is-print animations */
@media print { .or-harnessparts .hp-tile.is-new { animation: none; } }
.or-harnessparts.or-is-print .hp-tile.is-new { animation: none; }
</style>
