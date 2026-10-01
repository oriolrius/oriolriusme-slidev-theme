// slidev-theme-oriolrius · style entry (Slidev imports <theme>/styles/index.ts)
// The import order matters: fonts, icons, then tokens → base → code → layouts → components → print.

// fonts: bundled through npm, offline-safe (Vite hashes the woff2 files).
// Never request Ubuntu 600 (it does not exist: the site's "600" renders as 700).
import '@fontsource/ubuntu/300.css'
import '@fontsource/ubuntu/300-italic.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/400-italic.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/500-italic.css'
import '@fontsource/ubuntu/700.css'
import '@fontsource/ubuntu/700-italic.css'
import '@fontsource-variable/ubuntu-sans-mono'
import '@fontsource-variable/yanone-kaffeesatz'
import '@fontsource-variable/roboto'
// arrows + check marks missing from every brand font (tiny DejaVu subsets, unicode-range)
import './symbols.css'

// icons: Font Awesome 6 Free (solid + regular + brands), webfonts bundled via relative url()
import '@fortawesome/fontawesome-free/css/all.min.css'

// theme
import './tokens.css'
import './base.css'
import './code.css'
import './layouts.css'
import './components.css'
import './print.css'
