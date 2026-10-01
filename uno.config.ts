// slidev-theme-oriolrius · UnoCSS additions (merged by Slidev with its own config).
// Brand colours as utilities so authors never write style="color: …":
//   text-or-accent · text-or-accent-text · text-or-navy · text-or-slate · text-or-body · text-or-muted
//   (and bg-or-* / border-or-* for the same names)
import { defineConfig } from 'unocss'

export default defineConfig({
  // Presenter notes cite the talk as [mm:ss] or [mm:ss–mm:ss]. UnoCSS scans notes too and would
  // read "[10:01]" as an arbitrary-property utility (`[prop:value]`), emitting invalid CSS that
  // breaks `slidev build` / export ("lightningcss minify: Unexpected token Semicolon").
  // A CSS property never starts with a digit, so any "[<digit>…" candidate is blocked.
  blocklist: [
    /^\[\d/,
  ],
  theme: {
    colors: {
      or: {
        'accent': 'var(--or-accent)', // non-text glyphs (hero icons): #FF6600 on paper
        'accent-text': 'var(--or-accent-text)',
        'navy': 'var(--or-navy)',
        'slate': 'var(--or-slate)',
        'body': 'var(--or-fg-body)',
        'muted': 'var(--or-fg-muted)',
      },
    },
  },
})
