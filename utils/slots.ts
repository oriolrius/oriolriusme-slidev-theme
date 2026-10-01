// slidev-theme-oriolrius · slot helpers for the layouts.
//
// Slidev's `::rail::` sugar sends EVERYTHING after the marker to that slot until the next marker.
// Authors naturally write the rail first and the title after it:
//
//   ::rail::
//   <BranchRail compact />
//
//   # Branch 0: the whole agent
//   ```ts ... ```
//   ::bottom::
//
// so the h1 and the code would land in the rail. <SlotPart> splits a slot at its first <h1>:
// part="head" renders what comes before it (the rail components), part="tail" renders the h1
// and everything after it (placed by the layout in the body). Writing `::default::` before the
// h1 also works; both are supported.
import type { PropType, Slot, VNode } from 'vue'
import { defineComponent, Fragment } from 'vue'

function flatten(nodes: VNode[]): VNode[] {
  const out: VNode[] = []
  for (const n of nodes) {
    if (n.type === Fragment && Array.isArray(n.children))
      out.push(...flatten(n.children as VNode[]))
    else
      out.push(n)
  }
  return out
}

function firstTitleIndex(nodes: VNode[]): number {
  return nodes.findIndex(n => n.type === 'h1')
}

export const SlotPart = defineComponent({
  name: 'OrSlotPart',
  props: {
    source: { type: Function as PropType<Slot | undefined>, required: false },
    part: { type: String as PropType<'head' | 'tail'>, default: 'head' },
  },
  setup(props) {
    return () => {
      const nodes = flatten(props.source?.() ?? [])
      const i = firstTitleIndex(nodes)
      if (props.part === 'head')
        return i < 0 ? nodes : nodes.slice(0, i)
      return i < 0 ? [] : nodes.slice(i)
    }
  },
})

// <SlotSplit>: the card-header helper. Renders ONLY the first <h3> of a slot (part="first") or the
// slot WITHOUT that first <h3> (part="rest"). The cards layout uses it to put each card's `### Title`
// in the coloured header band next to the icon, with no change to the slide markdown.
function firstIndexOf(nodes: VNode[], tag: string): number {
  return nodes.findIndex(n => n.type === tag)
}

export const SlotSplit = defineComponent({
  name: 'OrSlotSplit',
  props: {
    source: { type: Function as PropType<Slot | undefined>, required: false },
    tag: { type: String, default: 'h3' },
    part: { type: String as PropType<'first' | 'rest'>, default: 'first' },
  },
  setup(props) {
    return () => {
      const nodes = flatten(props.source?.() ?? [])
      const i = firstIndexOf(nodes, props.tag)
      if (props.part === 'first')
        return i < 0 ? [] : [nodes[i]]
      return i < 0 ? nodes : nodes.filter((_, k) => k !== i)
    }
  },
})

// true when the slot contains a top-level element with that tag (e.g. a card with a ### title)
export function slotHas(source: Slot | undefined, tag: string): boolean {
  return firstIndexOf(flatten(source?.() ?? []), tag) >= 0
}
