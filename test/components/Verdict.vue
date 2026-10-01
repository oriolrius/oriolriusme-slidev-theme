<!--
  Verdict · deck component ("The Agent That Lied")
  The outcome of a run, as a stamp in the brand's frame motif.

  Usage
    <Verdict kind="lies" />                          LIES             slide 14 (and 02's story)
    <Verdict kind="lies" note="but bounded" />       LIES · but bounded   slide 15
    <Verdict kind="honest" />                        FAILS HONESTLY   slide 19
    <Verdict kind="works" />                         VERIFIED         slide 22
    <Verdict kind="works" inline />                  small and unrotated, for table cells (slide 23)

  Props
    kind:     'lies' | 'honest' | 'works'   required
                lies    LIES            fa-masks-theater          text --or-accent-text, frame --or-accent
                honest  FAILS HONESTLY  fa-triangle-exclamation   text --or-fg-title,   frame --or-fg-muted
                                                                  (on navy: text + frame #F4F4F4)
                works   VERIFIED        fa-circle-check           text + frame --or-pass
    note?:    string    default ''. Appended as " · note" in regular weight, sentence case.
    inline?:  boolean   default false. 20px text, 2px frame, no rotation, .35em right margin.

  Default stamp: Roboto 500 uppercase 40px (--or-fs-ui × 2), 5px square frame, padding .35em .8em,
  rotated −3°, never wraps, never stretches in a flex column. Colours come from role tokens, so the same
  markup is AA on paper (#C95000 / #0C8760), mist (#BE4C00 / #0A7C58) and navy (#FF8533 / #3CCB98).
  Deck component (not part of the theme). Copy of the deck's component, kept in sync for the showcase.
-->
<script setup lang="ts">
import { computed } from 'vue'

type Kind = 'lies' | 'honest' | 'works'

const props = withDefaults(defineProps<{
  kind: Kind
  note?: string
  inline?: boolean
}>(), {
  note: '',
  inline: false,
})

const KINDS: Record<Kind, { label: string, icon: string }> = {
  lies: { label: 'Lies', icon: 'fa-masks-theater' },
  honest: { label: 'Fails honestly', icon: 'fa-triangle-exclamation' },
  works: { label: 'Verified', icon: 'fa-circle-check' },
}
const k = computed(() => {
  const found = KINDS[props.kind as Kind]
  if (!found && import.meta.env.DEV)
    console.warn(`[Verdict] unknown kind "${props.kind}" (use lies | honest | works)`)
  return found ?? KINDS.lies
})
</script>

<template>
  <span
    class="or-verdict" :class="[`kind-${kind}`, { 'is-inline': inline }]"
    :title="`${k.label}${note ? ` · ${note}` : ''}`"
  >
    <i class="fas" :class="k.icon" aria-hidden="true" />
    <span class="v-text"><span class="v-label">{{ k.label }}</span><span v-if="note" class="v-note">{{ ` · ${note}` }}</span></span>
  </span>
</template>

<style>
.or-verdict {
  --v-c: var(--or-accent-text, #C95000);
  --v-frame: var(--or-accent, #FF6600);
  display: inline-flex;
  align-items: center;
  flex: none;
  width: max-content;   /* never stretches in a flex column (e.g. a code-focus bottom slot) */
  max-width: 100%;
  gap: .5em;
  padding: .35em .8em;
  border: 5px solid var(--v-frame);
  font-family: var(--or-font-ui);
  font-size: calc(var(--or-fs-ui, 1.25rem) * 2);   /* 40px: the payoff outranks the 28px quote beside it */
  font-weight: 500;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  color: var(--v-c);
  transform: rotate(-3deg);
  vertical-align: middle;
}
.or-verdict .v-label {
  letter-spacing: 1px;
  text-transform: uppercase;
}
.or-verdict .v-note {
  font-weight: 400;
  letter-spacing: .3px;
  text-transform: none;
}
.or-verdict.kind-honest { --v-c: var(--or-fg-title, #54595F); --v-frame: var(--or-fg-muted, #54595F); }
/* navy moments are navy + #F4F4F4 + orange: #8C8FBF is muted small text, never a frame */
.surface-navy .or-verdict.kind-honest { --v-c: var(--or-gray-100, #F4F4F4); --v-frame: var(--or-gray-100, #F4F4F4); }
.or-verdict.kind-works { --v-c: var(--or-pass, #0C8760); --v-frame: var(--or-pass, #0C8760); }
.or-verdict.is-inline {
  gap: .4em;
  padding: .15em .45em;
  border-width: 2px;
  font-size: var(--or-fs-ui, 1.25rem);
  transform: none;
  margin-right: .35em;
}
.or-verdict.is-inline .v-label { letter-spacing: .5px; }
</style>
