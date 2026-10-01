<!--
  BranchRail · deck component ("The Agent That Lied")
  The five git branches of TejasQ/basically-ai-harness (0 → 4) as square nodes joined by a 3px line.

  Usage
    <BranchRail show-commits />                  section band of slide 11: labels + real commit messages
    <BranchRail compact />                       rail row of slide 12: nothing built yet (all outlined)
    <BranchRail :current="2" compact />          rail row of slides 13–22 (0 on 13–14, 1 on 15, …)

  Props
    current?:     0 | 1 | 2 | 3 | 4 | null   default null (= all outlined). A string ("2") also works.
    compact?:     boolean   default false. 40px nodes, no labels (the full label is the hover title).
                            Same height as <HarnessParts> tiles, so both sit on one line in the rail row.
    showCommits?: boolean   default false. Labelled form only: an italic caption with the real commit
                            message under each label: "Simplify" · "Add guardrails and context compression" ·
                            "Add harness" · "Fix lies" · "Finish".

  States (colours come from the surface: paper / mist / navy / band)
                 paper, mist           navy (demo)            band (section)
    past         slate fill, white 0-4 #F4F4F4 fill, navy     white fill, navy digit
    current      #FF6600 fill, navy    #FF8533 fill, navy     navy fill, white digit
    future       slate outline         #8C8FBF outline + digit navy outline
    line         slate once passed, hairline ahead (#F4F4F4 / navy-500 on navy; white / navy on band)

  Labelled form (not compact): 44px nodes, labels "bare loop · guardrails · a home · verify · login hook"
  in Ubuntu 500 22px, each step 17rem wide (5 × 272 = 1360px), centred by the parent.
  Deck component (not part of the theme). Copy of the deck's component, kept in sync for the showcase.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  current?: number | string | null
  compact?: boolean
  showCommits?: boolean
}>(), {
  current: null,
  compact: false,
  showCommits: false,
})

const LABELS = ['bare loop', 'guardrails', 'a home', 'verify', 'login hook']
const COMMITS = ['Simplify', 'Add guardrails and context compression', 'Add harness', 'Fix lies', 'Finish']

const cur = computed(() => {
  if (props.current === null || props.current === undefined || props.current === '')
    return -1
  const n = Number(props.current)
  return Number.isInteger(n) && n >= 0 && n <= 4 ? n : -1
})
const nodes = computed(() => LABELS.map((label, i) => ({
  i,
  label,
  commit: COMMITS[i],
  state: i < cur.value ? 'past' : i === cur.value ? 'current' : 'future',
})))
</script>

<template>
  <div
    class="or-branchrail" :class="compact ? 'compact' : 'with-labels'"
    role="list" aria-label="Branches 0 to 4 of TejasQ/basically-ai-harness"
  >
    <div
      v-for="n in nodes" :key="n.i" class="br-step" :class="`is-${n.state}`" role="listitem"
      :aria-current="n.state === 'current' ? 'step' : undefined"
      :title="`branch ${n.i} · ${n.label} · “${n.commit}”`"
    >
      <span class="br-node">{{ n.i }}</span>
      <template v-if="!compact">
        <span class="br-label">{{ n.label }}</span>
        <span v-if="showCommits" class="br-commit">“{{ n.commit }}”</span>
      </template>
    </div>
  </div>
</template>

<style>
.or-branchrail {
  --br-size: 40px;
  --br-gap: 14px;
  --br-border: 3px;
  --br-past: var(--or-slate);        /* navy is for dark moments; on paper the neutral dark is slate */
  --br-past-fg: var(--or-white);
  --br-cur: var(--or-orange);
  --br-cur-fg: var(--or-navy);
  --br-future: var(--or-slate);
  --br-line: var(--or-hairline);
  --br-line-done: var(--or-slate);
  --br-text: var(--or-fg-body, #575757);
  display: flex;
  align-items: flex-start;
  flex: none;
  font-family: var(--or-font-ui);
}
/* navy moments are navy + #F4F4F4 + orange: no lavender fills. #8C8FBF only survives as the
   future node's thin outline and digit (its "muted text" role) */
.surface-navy .or-branchrail {
  --br-past: var(--or-gray-100);
  --br-past-fg: var(--or-navy);
  --br-cur: var(--or-orange-bright);
  --br-cur-fg: var(--or-navy);
  --br-future: var(--or-navy-300);
  --br-line: var(--or-navy-500);
  --br-line-done: var(--or-gray-100);
}
.surface-band .or-branchrail {
  --br-past: var(--or-white);
  --br-past-fg: var(--or-navy);
  --br-cur: var(--or-navy);         /* white is already "done" on the band: current must differ */
  --br-cur-fg: var(--or-white);
  --br-future: var(--or-navy);
  --br-line: var(--or-navy);
  --br-line-done: var(--or-white);
  --br-text: var(--or-navy);
}
.or-branchrail .br-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.or-branchrail.compact { gap: var(--br-gap); }
.or-branchrail.with-labels { --br-size: 44px; }
.or-branchrail.with-labels .br-step { width: 17rem; text-align: center; }
/* connectors: from the previous node's centre to this node's centre (drawn under the nodes) */
.or-branchrail .br-step + .br-step::before {
  content: '';
  position: absolute;
  z-index: 0;
  top: calc(var(--br-size) / 2 - 1.5px);
  height: 3px;
  background: var(--br-line);
}
.or-branchrail.compact .br-step + .br-step::before { left: calc(-1 * var(--br-gap)); width: var(--br-gap); }
.or-branchrail.with-labels .br-step + .br-step::before { left: -50%; right: 50%; }
.or-branchrail .br-step.is-past + .br-step::before { background: var(--br-line-done); }
.or-branchrail .br-node {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--br-size);
  height: var(--br-size);
  font-size: calc(var(--br-size) * .5);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: 0;
  border: var(--br-border) solid var(--br-future);
  color: var(--br-future);
  background: var(--or-bg, #fff);
}
.or-branchrail .is-past .br-node {
  background: var(--br-past);
  border-color: var(--br-past);
  color: var(--br-past-fg);
}
.or-branchrail .is-current .br-node {
  background: var(--br-cur);
  border-color: var(--br-cur);
  color: var(--br-cur-fg);
}
.or-branchrail .br-label {
  margin-top: .75rem;
  font-family: var(--or-font-sans);
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: .2px;
  white-space: nowrap;
  color: var(--br-text);
}
.or-branchrail .br-commit {
  margin-top: .3rem;
  max-width: 16rem;
  font-family: var(--or-font-sans);
  font-size: 1.375rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.25;
  color: var(--br-text);
  text-wrap: balance;
}
</style>
