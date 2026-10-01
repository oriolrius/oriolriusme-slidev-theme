// slidev-theme-oriolrius · Vite additions contributed by the theme.
// Pre-bundle the theme's CommonJS runtime dependency (qrcode) at server start, so Vite never
// discovers it mid-session: a late "dependency optimized" triggers a full page reload, which
// can land in the middle of a `slidev export` run.
import { defineVitePluginsSetup } from '@slidev/types'

export default defineVitePluginsSetup(() => [
  {
    name: 'slidev-theme-oriolrius:optimize-deps',
    config: () => ({
      optimizeDeps: { include: ['qrcode'] },
    }),
  },
])
