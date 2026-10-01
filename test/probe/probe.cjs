// slidev-theme-oriolrius · acceptance probe (theme-spec §14.3)
//
// Usage (from the repo root):
//   ./node_modules/.bin/slidev build test/slides.md --out /tmp/or-theme-build
//   node test/probe/serve.mjs /tmp/or-theme-build 47321 &   # static SPA server (kill it afterwards)
//   node test/probe/probe.cjs http://127.0.0.1:47321 [firstSlide] [lastSlide]
//
// Works on any deck built with this theme (e.g. the talk: build harness.md instead).
// Every slide is probed TWICE: at click 0 (what the room sees first) and at ?clicks=99 (the final state,
// which is what the PDF shows), so content revealed by v-click / magic-move is checked too.
// Prints one line per slide with every failed check (and WARN lines for sparse slides), then a summary.
// Exit code 1 on failures.
const path = require('node:path')

const { chromium } = require(require.resolve('playwright-chromium', { paths: [process.cwd(), __dirname] }))

const BASE = process.argv[2] || 'http://127.0.0.1:47321'
const FIRST = Number(process.argv[3] || 1)
const LAST_ARG = process.argv[4] ? Number(process.argv[4]) : null

function lum(hex) {
  const c = hex.map(v => v / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
function contrast(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}
function rgb(s) {
  const m = String(s).match(/rgba?\(([^)]+)\)/)
  if (!m)
    return null
  return m[1].split(',').slice(0, 3).map(v => Number.parseFloat(v))
}

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
  // static builds don't expose window.__slidev__: walk /n until slide n no longer exists
  const LAST = LAST_ARG ?? 999
  const failures = []
  const loadedFonts = new Set()

  const warnings = []
  for (let n = FIRST; n <= LAST; n++) {
   const passes = []
   for (const final of [false, true]) {
    await page.goto(`${BASE}/${n}${final ? '?clicks=99' : ''}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(final ? 1200 : 700)
    if (!LAST_ARG && !(await page.evaluate(no => !!document.querySelector(`.slidev-page-${no}`), n)))
      break
    const r = await page.evaluate((final) => {
      const out = { problems: [], info: {}, warnings: [] }
      const page = [...document.querySelectorAll('.slidev-page')].find(e => e.offsetParent !== null && e.getBoundingClientRect().width > 0)
      if (!page)
        return { problems: ['no visible .slidev-page'], info: {} }
      const content = document.querySelector('#slide-content')
      const origin = content.getBoundingClientRect()
      const scale = origin.width / 1920
      const R = (el) => {
        const b = el.getBoundingClientRect()
        return { x: (b.left - origin.left) / scale, y: (b.top - origin.top) / scale, w: b.width / scale, h: b.height / scale, r: (b.right - origin.left) / scale, b: (b.bottom - origin.top) / scale }
      }
      const layout = page.querySelector('.slidev-layout')
      if (!layout)
        return { problems: ['no .slidev-layout root'], info: {} }
      const cls = [...layout.classList]
      const name = cls.find(c => !['slidev-layout', 'w-full', 'h-full', 'grid', 'place-content-center'].includes(c) && !c.startsWith('surface') && !c.startsWith('gap') && c !== 'dense') || '?'
      out.info.layout = name
      const cs = getComputedStyle

      // 1. h1 size + single line
      const h1 = layout.querySelector('h1')
      if (h1) {
        const s = cs(h1)
        out.info.h1 = s.fontSize
        const lines = Math.round(h1.getBoundingClientRect().height / scale / (Number.parseFloat(s.lineHeight) || Number.parseFloat(s.fontSize) * 1.2))
        const expected = { cover: 104, section: 72 }[name] ?? 56   // dense keeps the 56px title
        if (Math.abs(Number.parseFloat(s.fontSize) - expected) > 0.5)
          out.problems.push(`h1 ${s.fontSize} (expected ${expected}px)`)
        if (lines > 1 && !['cover', 'section'].includes(name))
          out.problems.push(`h1 wraps to ${lines} lines`)
      }

      // 2. vertical overflow: in-flow content must end at the layouts' content line (1080 - 88 = 992), with 4px of
      //    tolerance; the footer's framed logo starts at 1022: a boxed panel ending on the line keeps 30px clear
      const DECOR = '.portrait, .logo, .signoff, .signoff *, .avatar, .signature, .qr, .qr *, .source, .source *, .or-footer, .or-footer *, .or-progress'
      const limitB = ['cover', 'end'].includes(name) || layout.closest('.slidev-page')?.querySelector('[data-no-footer]') ? 1080 : 996
      let maxB = 0
      let worst = null
      for (const el of layout.querySelectorAll('*')) {
        if (el.matches(DECOR) || el.closest('.or-zoom'))
          continue
        const st = cs(el)
        if (st.display === 'none' || st.visibility === 'hidden' || st.position === 'fixed')
          continue
        const b = R(el)
        if (b.w === 0 || b.h === 0)
          continue
        if (b.b > maxB) {
          maxB = b.b
          worst = el
        }
        if (b.r > 1920 - 96 + 3 && !el.closest('.portrait') && st.position !== 'absolute')
          out.problems.push(`x-overflow ${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')} right=${b.r.toFixed(0)}`)
      }
      out.info.contentBottom = Math.round(maxB)
      if (maxB > limitB + 1)
        out.problems.push(`y-overflow: content ends at ${maxB.toFixed(0)} > ${limitB} (${worst?.tagName.toLowerCase()}.${[...(worst?.classList ?? [])].slice(0, 2).join('.')})`)
      // (cover and end clip decorative bleeds on purpose: the portrait and the avatar leave the canvas)
      if (!['cover', 'end'].includes(name) && layout.scrollHeight > layout.clientHeight + 1)
        out.problems.push(`layout scrollHeight ${layout.scrollHeight} > ${layout.clientHeight}`)

      // 3. code blocks never scroll horizontally (the theme hides scrollbars)
      for (const pre of layout.querySelectorAll('pre.slidev-code')) {
        if (pre.scrollWidth > pre.clientWidth + 1)
          out.problems.push(`code overflows its block by ${(pre.scrollWidth - pre.clientWidth) / 1}px`)
      }

      // 4. links and inline code never wrap mid-token
      for (const a of layout.querySelectorAll('a')) {
        if (a.getClientRects().length > 1 && !/\s/.test(a.textContent.trim()))
          out.problems.push(`link wraps: ${a.textContent.trim().slice(0, 40)}`)
      }
      for (const c of layout.querySelectorAll(':not(pre) > code')) {
        if (c.getClientRects().length > 1 && !c.closest('.or-pins'))
          out.problems.push(`inline code wraps: ${c.textContent.slice(0, 40)}`)
      }

      // 4b. the code-focus `source` credit is one line: it must not be ellipsised
      for (const src of layout.querySelectorAll('.source')) {
        if (src.scrollWidth > src.clientWidth + 1)
          out.problems.push(`source line ellipsised (${src.scrollWidth} > ${src.clientWidth}px): shorten it`)
      }

      // 4c. typography: no straight quotes in rendered text (raw HTML, slots and frontmatter strings are
      //     not typographer-processed). Code, terminals and the footer are exempt.
      const straight = new Set()
      const walker = document.createTreeWalker(layout, NodeFilter.SHOW_TEXT)
      for (let t = walker.nextNode(); t; t = walker.nextNode()) {
        const el = t.parentElement
        if (!el || el.closest('pre, code, .slidev-code, .or-terminal, .or-footer, script, style, svg, .katex'))
          continue
        if (/["']/.test(t.textContent))
          straight.add(t.textContent.trim().slice(0, 40))
      }
      if (straight.size)
        out.problems.push(`straight quotes (type “ ” ’): ${[...straight].slice(0, 3).map(s => JSON.stringify(s)).join(' | ')}`)

      // 4d. sparse slide (final state only): an interior vertical gap between content blocks > 220px
      //     (> 140px on code-focus, where the anchored plain strip is included: the items above it are centred
      //     between the code and the strip, so a gap that big means the bottom slot is short of content)
      if (final && !['cover', 'section', 'end'].includes(name)) {
        const spans = []
        for (const el of layout.querySelectorAll('*')) {
          if (el.matches(DECOR) || el.closest('.or-footer'))
            continue
          const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())
          // a painted box (a panel, a callout, a card body) is content too: its area is not empty page
          const bgc = cs(el).backgroundColor
          const painted = el !== layout && bgc && bgc !== 'transparent' && !/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(bgc)
          if (!own && !painted && !el.matches('img, svg, pre, .or-qr, i[class*="fa-"]'))
            continue
          const st = cs(el)
          if (st.visibility === 'hidden' || st.display === 'none' || Number.parseFloat(st.opacity) < 0.05)
            continue
          const b = R(el)
          if (b.w === 0 || b.h === 0)
            continue
          spans.push([b.y, b.b])
        }
        spans.sort((a, b) => a[0] - b[0])
        let end = null
        let worstGap = 0
        let at = 0
        for (const [y0, y1] of spans) {
          if (end !== null && y0 - end > worstGap) {
            worstGap = y0 - end
            at = end
          }
          end = end === null ? y1 : Math.max(end, y1)
        }
        const sparseLimit = name === 'code-focus' ? 140 : 220
        if (worstGap > sparseLimit)
          out.warnings.push(`sparse: ${Math.round(worstGap)}px of empty height below y=${Math.round(at)}`)
      }

      // 5. the text floor: nothing under 20px except the sanctioned meta texts
      const SMALL_OK = '.or-ts, .or-ts *, .or-footer *, .source, .source *, .br-node, .hp-tile *, .or-terminal-bar .title, .katex *'
      const small = new Set()
      for (const el of layout.querySelectorAll('*')) {
        if (!el.childNodes.length || el.matches(SMALL_OK))
          continue
        const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
        if (!hasText)
          continue
        const fs = Number.parseFloat(cs(el).fontSize)
        if (fs < 19.5)
          small.add(`${el.tagName.toLowerCase()}.${[...el.classList][0] ?? ''}@${fs}px`)
      }
      if (small.size)
        out.problems.push(`text under 20px: ${[...small].slice(0, 4).join(', ')}`)

      // 6. code token colours (for the contrast check done in node)
      out.info.code = [...layout.querySelectorAll('pre.slidev-code')].slice(0, 2).map((pre) => {
        const bg = cs(pre).backgroundColor
        const fam = cs(pre.querySelector('code') || pre).fontFamily.split(',')[0]
        const colors = [...new Set([...pre.querySelectorAll('span')].filter(s => s.children.length === 0 && s.textContent.trim()).map(s => cs(s).color))]
        return { bg, fam, colors }
      })

      // 7. brand fonts actually loaded on this slide (aggregated in node)
      out.info.loaded = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight}`)

      // 8. footer (= the logo) visibility: every slide except cover / end (they carry the framed logo).
      //    The footer is a per-slide layer (slide-bottom.vue): it must be INSIDE this slide's page, so it fades
      //    with its slide and shows on overview / presenter thumbnails too.
      const footer = page.querySelector('.or-footer')
      if ([...document.querySelectorAll('.or-footer')].some(f => !f.closest('.slidev-page')))
        out.problems.push('footer rendered outside the slide (a global layer): it would not fade with its slide')
      out.info.footer = footer ? (footer.classList.contains('is-dark') ? 'dark' : footer.classList.contains('is-band') ? 'band' : 'light') : 'hidden'
      if (['cover', 'end'].includes(name) && footer)
        out.problems.push('footer visible on a cover/end slide')
      if (!['cover', 'end'].includes(name) && !footer && !layout.closest('.slidev-page')?.querySelector('[data-no-footer]'))
        out.problems.push('no footer (no logo) on this slide')
      if (name === 'demo' && footer && !footer.classList.contains('is-dark'))
        out.problems.push('demo footer is not the light-on-navy variant')
      const photo = cls.includes('is-photo')   // a section divider with `image`: a dark photo band
      if (name === 'section' && footer && !footer.classList.contains(photo ? 'is-dark' : 'is-band'))
        out.problems.push(`section footer is not the ${photo ? 'dark (photo)' : 'band'} variant`)
      if (['cover', 'end'].includes(name) && !layout.querySelector('img.logo'))
        out.problems.push('cover/end without the framed logo')

      // 9. text contrast (WCAG 2.x) against the real, composited background of every visible text element.
      //    Large text (>= 24px, or >= 18.66px bold) needs 3:1, everything else 4.5:1. Code tokens are check 6.
      //    Parses rgb()/rgba() and color(srgb …) (what color-mix() computes to).
      const parse = (s) => {
        s = String(s)
        let m = s.match(/rgba?\(([^)]+)\)/)
        if (m) {
          const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number.parseFloat)
          return [p[0], p[1], p[2], p[3] ?? 1]
        }
        m = s.match(/color\(srgb\s+([^)]+)\)/)
        if (m) {
          const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number.parseFloat)
          return [p[0] * 255, p[1] * 255, p[2] * 255, p[3] ?? 1]
        }
        return null
      }
      const over = (top, bot) => {
        const a = top[3]
        return [0, 1, 2].map(i => top[i] * a + bot[i] * (1 - a)).concat(1)
      }
      const L = (c) => {
        const v = c.slice(0, 3).map(x => x / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
        return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
      }
      const ratio = (a, b) => {
        const [x, y] = [L(a), L(b)].sort((p, q) => q - p)
        return (x + 0.05) / (y + 0.05)
      }
      const bgOf = (el) => {
        const layers = []
        for (let e = el; e; e = e.parentElement) {
          const st = cs(e)
          if (st.backgroundImage && st.backgroundImage !== 'none' && !e.matches('.slidev-layout'))
            return null // text over an image/gradient: not measurable here
          const c = parse(st.backgroundColor)
          if (c && c[3] > 0) {
            layers.push(c)
            if (c[3] >= 1)
              break
          }
        }
        let acc = [255, 255, 255, 1]
        for (const c of layers.reverse()) acc = over(c, acc)
        return acc
      }
      const lowContrast = new Set()
      for (const el of layout.querySelectorAll('*')) {
        if (el.closest('pre, .slidev-code, svg, .or-qr, .or-footer, .katex'))
          continue
        const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
        if (!hasText)
          continue
        const st = cs(el)
        if (st.visibility === 'hidden' || st.display === 'none')
          continue
        let hidden = false
        for (let e = el; e && e !== layout.parentElement; e = e.parentElement) {
          if (Number.parseFloat(cs(e).opacity) < 0.99) { hidden = true; break }
        }
        if (hidden)
          continue // v-click hidden / dimmed on purpose
        const fg = parse(st.color)
        const bg = bgOf(el)
        if (!fg || !bg)
          continue
        const fs = Number.parseFloat(st.fontSize)
        const large = fs >= 23.9 || (fs >= 18.6 && Number.parseInt(st.fontWeight, 10) >= 700)
        const need = large ? 3 : 4.5
        const r = ratio(over(fg, bg), bg)
        if (r < need - 0.005)
          lowContrast.add(`${el.tagName.toLowerCase()}.${[...el.classList][0] ?? ''} "${el.textContent.trim().slice(0, 24)}" ${r.toFixed(2)}:1 @${fs}px`)
      }
      if (lowContrast.size)
        out.problems.push(`low contrast: ${[...lowContrast].slice(0, 4).join(' | ')}`)
      return out
    }, final)
    passes.push(r)
   }
   if (!passes.length)
     break
   // one report per slide: a problem seen in only one of the two passes is labelled with it
   const r = passes[passes.length - 1]
   const label = (x, i) => (passes.length > 1 && !passes[1 - i].problems.includes(x) ? `${i ? '[final] ' : '[click 0] '}${x}` : x)
   r.problems = [...new Set(passes.flatMap((p, i) => p.problems.map(x => label(x, i))))]
   for (const w of passes.flatMap(p => p.warnings ?? []))
     warnings.push(`${String(n).padStart(2, '0')} ${w}`)
   for (const f of passes.flatMap(p => p.info.loaded ?? []))
     loadedFonts.add(f)
    // code contrast (node side)
    for (const c of r.info.code ?? []) {
      const bg = rgb(c.bg)
      if (!/Ubuntu Sans Mono/.test(c.fam))
        r.problems.push(`code font is ${c.fam}`)
      for (const col of c.colors) {
        const fg = rgb(col)
        if (bg && fg && contrast(fg, bg) < 4.5)
          r.problems.push(`code token ${col} on ${c.bg} = ${contrast(fg, bg).toFixed(2)}:1`)
      }
    }
    const tag = `${String(n).padStart(2, '0')} ${String(r.info.layout ?? '?').padEnd(15)} h1=${r.info.h1 ?? '-'} bottom=${r.info.contentBottom ?? '-'} footer=${r.info.footer ?? '-'}`
    if (r.problems.length) {
      failures.push(n)
      console.log(`FAIL ${tag}\n     - ${r.problems.join('\n     - ')}`)
    }
    else {
      console.log(`ok   ${tag}`)
    }
  }

  for (const w of warnings)
    console.log(`WARN ${w}`)

  // fonts: the brand families must have been loaded on some slide (bundled @fontsource / FA files)
  const want = ['Ubuntu 300', 'Ubuntu 400', 'Ubuntu 500', 'Ubuntu 700', 'Ubuntu Sans Mono Variable', 'Yanone Kaffeesatz Variable', 'Roboto Variable', 'Font Awesome 6 Free 900']
  const fonts = want.map(w => [w, [...loadedFonts].some(f => f.startsWith(w))])
  for (const [f, ok] of fonts)
    console.log(`${ok ? 'ok  ' : 'FAIL'} font loaded: ${f}`)

  // presenter view: the notes must NOT inherit slide sizes (no leaks)
  await page.goto(`${BASE}/presenter/3`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const notes = await page.evaluate(() => {
    const p = document.querySelector('.slidev-note p')
    return p ? getComputedStyle(p).fontSize : 'no notes'
  })
  console.log(`${notes === '28px' ? 'FAIL' : 'ok  '} presenter notes font-size ${notes}`)

  console.log(`\n${failures.length ? `FAILED slides: ${failures.join(', ')}` : 'all slides pass'}`)
  await browser.close()
  process.exit(failures.length || fonts.some(([, ok]) => !ok) ? 1 : 0)
})()
