// slidev-theme-oriolrius · clicker-aware shortcuts.
//
// Hardware presentation clickers send PageDown / PageUp.
//   themeConfig.clicker: 'clicks' (default) → one press = one click step (v-click, highlights, magic-move)
//   themeConfig.clicker: 'slides'           → one press = one whole slide
//
// Slidev's own PageDown/PageUp bindings are removed BY NAME ('next_page_key' / 'prev_page_key').
// Their key strings are 'pageDown'/'pageUp'; useMagicKeys is case-insensitive, so adding a
// 'PageDown' binding without removing them would fire twice per press (ESADE filtered by key
// string 'PageDown' and never removed them).
// Note: Slidev's CLIENT has no open-in-editor key. The `e` key lives in the Slidev CLI terminal
// (@slidev/cli: `e` → execFile($EDITOR || 'code')); the repo's dev scripts set EDITOR=true so it is a
// no-op (a stray `code` launch can hang WSL2).
import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { configs, useNav } from '@slidev/client'
import { defineShortcutsSetup } from '@slidev/types'
import { useMagicKeys } from '@vueuse/core'
import { computed } from 'vue'

export default defineShortcutsSetup((nav: NavOperations, base: ShortcutOptions[]) => {
  const drop = new Set(['next_page_key', 'prev_page_key'])
  const kept = base.filter(s => !drop.has(s.name ?? ''))

  const mode = ((configs.themeConfig as Record<string, unknown> | undefined)?.clicker ?? 'clicks') as 'clicks' | 'slides'
  const { currentSlideNo, total } = useNav()

  const keys = useMagicKeys()
  const pageDown = computed(() => keys.pagedown.value && !keys.shift.value)
  const pageUp = computed(() => keys.pageup.value && !keys.shift.value)
  const shiftPageDown = computed(() => keys.pagedown.value && keys.shift.value)
  const shiftPageUp = computed(() => keys.pageup.value && keys.shift.value)

  const fwd = () => (mode === 'slides' ? nav.nextSlide() : nav.next())
  const back = () => (mode === 'slides' ? nav.prevSlide() : nav.prev())

  return [
    ...kept,
    { name: 'or_home', key: 'home', fn: () => nav.goFirst(), autoRepeat: false },
    { name: 'or_end', key: 'end', fn: () => nav.goLast(), autoRepeat: false },
    { name: 'or_pgdn', key: pageDown, fn: fwd, autoRepeat: true },
    { name: 'or_pgup', key: pageUp, fn: back, autoRepeat: true },
    { name: 'or_pgdn10', key: shiftPageDown, fn: () => nav.go(Math.min(total.value, currentSlideNo.value + 10)), autoRepeat: true },
    { name: 'or_pgup10', key: shiftPageUp, fn: () => nav.go(Math.max(1, currentSlideNo.value - 10)), autoRepeat: true },
  ]
})
