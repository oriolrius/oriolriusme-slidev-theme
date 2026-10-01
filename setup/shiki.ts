// slidev-theme-oriolrius · Shiki theme for the navy code surface.
//
// Used for BOTH light and dark: on a light deck Slidev paints `var(--shiki-light)` on every span,
// so the light theme must be this navy theme too (ESADE defect 6: vitesse-light on a dark block).
// Contrast measured on #151652; every token is >= 6.28:1. Magic-move reuses this highlighter.
import { defineShikiSetup } from '@slidev/types'

const oriolriusNavy = {
  name: 'oriolrius-navy',
  type: 'dark' as const,
  colors: {
    'editor.background': '#151652',
    'editor.foreground': '#F4F4F4',
  },
  tokenColors: [
    { settings: { foreground: '#F4F4F4' } }, // 15.05
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#9A9CC8', fontStyle: 'italic' }, // 6.28
    },
    {
      scope: [
        'keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control',
        'keyword.operator.new', 'keyword.operator.expression', 'variable.language.this',
      ],
      settings: { foreground: '#FF8533' }, // 6.82
    },
    {
      scope: ['string', 'string.template', 'punctuation.definition.string'],
      settings: { foreground: '#D2B922' }, // 8.44
    },
    {
      scope: ['string.regexp', 'constant.character.escape', 'constant.numeric', 'constant.language'],
      settings: { foreground: '#FFB380' }, // 9.47
    },
    {
      scope: [
        'entity.name.function', 'support.function', 'variable.function',
        'meta.function-call entity.name.function',
      ],
      settings: { foreground: '#4FB3E8' }, // 7.05
    },
    {
      scope: [
        'entity.name.type', 'entity.name.class', 'support.type', 'support.class',
        'meta.type.annotation entity.name.type',
      ],
      settings: { foreground: '#3CCB98' }, // 8.03
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator', 'variable.other.property', 'meta.object-literal.key'],
      settings: { foreground: '#C9CAE6' }, // 10.31
    },
  ],
}

export default defineShikiSetup(() => ({
  themes: {
    dark: oriolriusNavy,
    light: oriolriusNavy,
  },
}))
