# slidev-theme-oriolrius: maintainer notes

This file is for **changing** the theme. For **using** it, read `README.md` (the API). The gotchas it avoids are
listed under "Rules" and "Export gotchas" below.

## Map

| Path | What |
|---|---|
| `package.json` | Theme metadata, `slidev.defaults` (canvas 1920, `transition: fade`, fonts provider none, primary orange, `favicon` as an inline SVG data URI, `titleTemplate: '%s · oriolrius.me'`), font/icon/qrcode deps. `files` must list every folder a layout imports from (`utils` included) and every layer file (`global-top.vue`, `slide-bottom.vue`). |
| `styles/index.ts` | Style entry. Import order: fonts (@fontsource) → Font Awesome → `symbols.css` → tokens → base → code → layouts → components → print. |
| `styles/tokens.css` | Raw brand hex + role tokens (incl. `--or-fg-dim`) + surfaces (paper/mist/navy/band, also as islands) + `dense` + Slidev `--slidev-code-*` vars. `--or-pad-bottom` (88px) sets the content line, y 992. |
| `styles/base.css` | Element rules under `.slidev-layout` (h1–h4, p, lists, links, blockquote, tables, inline code). |
| `styles/code.css` | Code blocks, **always** under `.slidev-layout` (the slide root exists in play, presenter, per-slide AND the stacked `/print` / browser-exporter routes; `.slidev-slide-container` does not exist in the last two). |
| `styles/layouts.css` | Restyled built-ins: `center`, `two-cols-header`, `dense`. |
| `styles/components.css` | CSS classes (`or-frame`, `or-box`, `callout`, `or-chip`, `or-pins`, `or-step`, `or-stats`, `or-predict`, `or-checklist`, `or-table` roomy/airy, `or-meter`, `or-aside`, …) + QuoteCard spacing + the zoom overlay. |
| `styles/symbols.css` + `styles/fonts/` | "Or Symbols": DejaVu subsets for arrows/checks the brand fonts lack (unicode-range; mono has `size-adjust: 93%`). |
| `styles/print.css` | Export-time rules. See "Export gotchas" below. |
| `layouts/*.vue` | cover, section, code-focus, demo, diagram, end, concepts, cards, four-grid. |
| `components/*.vue` | Terminal, QuoteCard, Ts, Tag, QrCode (auto-registered). |
| `utils/slots.ts` | `<SlotPart>`: splits a slot at its first `<h1>`, so `::rail::` can come before the title. `<SlotSplit>`: renders only the first `<h3>` of a slot, or the slot without it (the cards header title). |
| `slide-bottom.vue` / `global-top.vue` | Footer (framed logo + title + n/N, no hairline), a PER-SLIDE layer: it reads `useSlideContext()`, fades with its slide and shows on overview/presenter thumbnails / 3px progress hairline (global: it animates between slides). |
| `setup/main.ts` | Click-to-zoom (lazy overlay, event delegation). |
| `setup/shortcuts.ts` | Clicker-aware PageUp/PageDown (removes Slidev's bindings **by name**). The `e` key is the CLI's, not the client's: the repo scripts set `EDITOR=true`. |
| `setup/shiki.ts` | `oriolrius-navy` Shiki theme used for BOTH light and dark. |
| `setup/vite-plugins.ts` | Pre-bundles `qrcode`, so Vite never re-optimises mid-session. |
| `uno.config.ts` | `text-or-*` colour utilities + a blocklist for `[mm:ss]` note timestamps. |
| `assets/` | Logos, portrait, signature, avatar, `favicon.svg` (the source of the data-URI favicon in `package.json`). **Imported** by layouts (Vite hashes them); never referenced as `/…` URLs. |
| `test/slides.md` | Showcase = living docs. Every layout, prop, slot, component and class has a slide here. |
| `test/probe/` | `serve.mjs` (static SPA server) + `probe.cjs` (acceptance checks). |

## Rules (each one fixed a real ESADE-theme bug)

1. **Sizes are variables.** Element rules read `--or-fs-*`, and layouts change the variable on their root. **No
   `!important` on font sizes**, ever.
2. **Specificity policy.** Typography sits at (0,1,1) (`.slidev-layout h1`). **Margins, `text-wrap` and the
   two-cols-header gap go through `:where()` at (0,1,0)**, so Uno utilities (`mt-8`, `text-balance`, `gap-x-16`) win
   by load order. Nothing is bare; everything is under `.slidev-layout`.
3. **Code CSS stays under `.slidev-layout`.** Never style bare `pre`, `code` or `.shiki`: Slidev's editor pane is a
   textarea over a Shiki `<pre>` (never inside a `.slidev-layout`). Don't scope to `.slidev-slide-container`: the
   stacked `/print` route and the browser exporter render slides in `.print-slide-container` without it. Set the
   `--slidev-code-*` vars; Slidev applies them with `!important`.
4. **Every custom layout root** is a single element with `class="slidev-layout <name>"`. Derived values use
   `computed()` (HMR-safe). Slot content is styled with `:deep()`. Add `flex: none` or `min-width: 0` wherever a
   flex/grid child could grow. **Declare `frontmatter?: Record<string, unknown>` in every layout's props**: Slidev
   passes it, and an undeclared prop falls through as a `frontmatter="[object Object]"` DOM attribute.
5. **Colour only via role tokens** in rules. Surfaces re-point tokens; components never branch per surface unless
   contrast demands it (e.g. `.surface-navy .callout`).
6. **Contrast floor.** Orange text on paper is `#C95000`, on mist `#BE4C00`, on navy `#FF8533`. LARGE orange text
   (≥ 24px: h3, stats, predict letters, kickers) uses `--or-accent-text-large` = `#E85A12` (AA-large on paper, mist and
   the peach tint). SMALL orange text (< 24px: `<Ts>`, dense links) inside a tinted box (callout, or-box) uses
   `--or-ink-small` = `#A84300`, because the tints drop the other inks to 3.8-4.2:1. White on the orange band only at
   ≥ 48px bold (card header titles on orange are navy). Text is ≥ 20px everywhere, except the `<Ts>` chip (18px), the
   footer meta (16px), the terminal title (18px) and the code-focus `source` credit (18px). Graphics (frames,
   outlines, bars, the QuoteCard border) use the non-text accent `#FF6600`, never the text inks. Navy is a surface
   for dark moments and code, never a second accent on paper (tables, info callouts and past BranchRail nodes are
   slate).
7. **Never request Ubuntu 600** (it doesn't exist). Ubuntu 300 is used only at ≥ 24px.
8. **Assets** are imported from `assets/`. A theme's `public/` is served under `/theme/…`, so it is useless for
   markdown URLs.
9. **Deck-specific components** (BranchRail, HarnessParts, Verdict) live in the deck's `components/`. Keep the copies in
   `test/components/` in sync (copy them over from the deck after changing them there).
10. **The logo is on every slide.** Cover and end carry the big framed logo; every other layout gets the framed logo
    through the footer (`slide-bottom.vue`), in the variant matching the surface: orange on paper/mist, white letters
    in an orange frame on navy (`demo`, photo dividers), all white on the band (`section`). A new layout that hides
    the footer must place the logo itself. The footer is a **per-slide** layer, never a global one: a
    `global-bottom.vue` sits outside the slide transition, so it switched instantly while the slides cross-faded (a
    pale band logo on a fading peach ground, "6 / 35" beside slide 5) and was missing from the overview. Layouts end
    on the content line (y 992, `--or-pad-bottom` 88px): 30px of air above the logo frame. `probe.cjs` checks both
    (limit 996, footer inside the slide).
11. **Motion is fade only** (brand rule): the default transition is `fade`, and entrance motion (the self-drawing
    frame) must render complete when animations are off: register animated custom properties with an
    `initial-value` equal to the END state (`@property --or-draw { initial-value: 360deg }`).
12. **No opacity for "dimmed" content that carries colour.** Orange at 45% over navy is a muddy brown (#7F4843).
    Step content back with role colours instead (`--or-fg-dim`, `--or-line`), as `.or-predict` does. (Code-line
    dimming keeps opacity: it is text on one surface and must keep the function's shape.)
13. **Typographic quotes.** Slidev has no typographer: every text in the showcase and the README examples uses
    “ ” ‘ ’. The probe fails on straight quotes in rendered text.

## Export gotchas (learned the hard way, 2026-09-24)

- `slidev export` emulates **`media: screen`** while printing, so an `@media print` rule does **not** apply during
  export. For export-time behaviour, target `html.print` (set on the stacked `/print` page) **and** a Vue class from
  `useNav().isPrintMode` (per-slide export runs the play route). See `print.css` and `.or-is-print` in
  `demo.vue` / `HarnessParts.vue`.
- **Anything appended to `<body>` at startup adds a blank trailing PDF page.** That is why the zoom overlay is created
  lazily on the first click.
- Presenter notes are scanned by UnoCSS. `[10:01]` looks like an arbitrary-property utility and emits invalid CSS
  (`lightningcss minify: Unexpected token Semicolon`), which breaks build and export. `uno.config.ts` blocklists
  `^\[\d`.
- **Stacked PNG export** (no `--per-slide`) screenshots one ~100k-px-tall page. Chromium can leave tiles blank or
  capture before the code font loads. **Always use `--per-slide` for PNGs.** The per-slide PDF is correct. (Until
  2026-09-24 part of the stacked-mode code problems was a scoping bug: code CSS was under `.slidev-slide-container`,
  which the `/print` route doesn't render. It is under `.slidev-layout` now.)
- **A theme's `public/` is copied to `/theme/<path relative to the deck root>/…`**, not to `/`: don't rely on it
  for URLs (the favicon is an inline data URI for that reason).
- The Tailwind reset puts a system mono on `code`, so `code.css` makes code children `font-family: inherit`.
- This WSL box has Ubuntu and Ubuntu Mono **installed**, which can hide a failing webfont. The probe checks
  `document.fonts` status. For ground truth per node, use CDP `CSS.getPlatformFontsForNode`: custom fonts are flagged.

## Change loop (do this for every change)

```bash
pnpm probe      # build + serve + probe (scripts/probe.sh): must print "built in" and "all slides pass"
rm -rf /tmp/or-png && ./node_modules/.bin/slidev export test/slides.md --format png --per-slide \
   --output /tmp/or-png --timeout 90000 --wait 1000
```

Then **look at** the PNGs you touched (Read them). Check for overflow, clipping, mid-token wraps, low contrast,
misalignment and a two-line h1. `slidev export` captures click 0 only in some modes: for click states, build, serve and
screenshot `/<n>?clicks=<k>` (the probe does `?clicks=99` for every slide). When you add a layout, prop, component or class, add a showcase slide **and** a
README section in the same change.

Live preview: `pnpm dev` (port 3042, `--remote --bind 0.0.0.0`, reachable from Windows/Orca) in a visible
terminal. Never run it as a background task.

## Versioning, secrets and CI

- **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`…), checked by commitizen on `commit-msg` and in CI.
- **Releases: notes are mandatory, not only the changelog.** The changelog lists commits; the release notes explain
  the change to a reader. Steps:
  1. `cz bump --get-next` → the next version `X.Y.Z`.
  2. Write `release-notes/vX.Y.Z.md` and commit it (`docs(release): notes for vX.Y.Z`). It must cover: a one-paragraph
     summary; **Highlights** (what changed and why it matters, in prose, grouped by area); **Breaking changes /
     upgrade steps** (or "None"); **How it was verified** (build, probe, CI, what was looked at). Write it for someone
     who never saw the commits.
  3. `cz bump` (bumps `package.json` + `.cz.toml`, updates `CHANGELOG.md`, tags `vX.Y.Z`).
  4. `git push`, then `git push origin vX.Y.Z` separately (a tag pushed together with its branch did not trigger the
     tag run on GitHub).
  5. CI builds the GitHub release from `release-notes/vX.Y.Z.md` + the changelog section, and **fails without the
     notes file**. Check the published release page afterwards. Decks pin the tag
  (`github:oriolrius/oriolriusme-slidev-theme#vX.Y.Z`); bump the pin there after a release.
- **Hooks**: `pre-commit install` once per clone. `pre-commit` runs gitleaks on staged changes + file hygiene,
  `commit-msg` runs `cz check`, `pre-push` runs gitleaks over the full history. Never commit tokens, `.env` files,
  private hostnames or local paths; this repo is public.
- **CI** (`.github/workflows/ci.yml`): gitleaks (history + tree), pre-commit hygiene, `cz check`, then the showcase
  build + acceptance probe (`pnpm probe`) in Chromium.
