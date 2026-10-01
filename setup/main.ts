// slidev-theme-oriolrius · app setup: click-to-zoom for <img class="zoomable">.
//
// Event delegation scoped to .slidev-slide-container (no document-wide MutationObserver,
// never touches the editor pane). Esc or a click closes the overlay.
// The overlay element is created LAZILY on the first zoom: an element appended to <body> at
// startup adds a blank trailing page to `slidev export` PDFs (the exporter prints with
// `media: screen`, so an @media print rule cannot hide it).
// No code buttons: Slidev has a native copy button and the deck disables it (codeCopy: false).
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined')
    return
  const w = window as typeof window & { __orZoomInstalled?: boolean }
  if (w.__orZoomInstalled)
    return // already installed (HMR)
  w.__orZoomInstalled = true

  let overlay: HTMLDivElement | null = null
  let img: HTMLImageElement | null = null

  const close = () => overlay?.classList.remove('active')

  function ensureOverlay() {
    if (overlay)
      return
    overlay = document.createElement('div')
    overlay.className = 'or-zoom'
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-label', 'Zoomed image, press Escape to close')
    img = document.createElement('img')
    overlay.appendChild(img)
    overlay.addEventListener('click', close)
    document.body.appendChild(overlay)
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('active')) {
      e.stopPropagation()
      close()
    }
  }, true)

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement | null)?.closest?.('.slidev-slide-container img.zoomable') as HTMLImageElement | null
    if (!target)
      return
    ensureOverlay()
    img!.src = target.currentSrc || target.src
    img!.alt = target.alt
    // next frame, so the opacity transition runs on a freshly created overlay
    requestAnimationFrame(() => overlay!.classList.add('active'))
  })
})
