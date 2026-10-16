/**
 * Tiny Portable Text builder. Local content is written with it so that the exact same
 * blocks can be rendered as a fallback and seeded into Sanity.
 * Inline syntax: **bold**, *italic*, `code`, [label](https://url).
 */

export type PTMarkDef = { _key: string; _type: 'link'; href: string }
export type PTSpan = {
  _type: 'span'
  _key: string
  text: string
  marks: string[]
}
export type PTTextBlock = {
  _type: 'block'
  _key: string
  style: 'normal' | 'h2' | 'h3' | 'blockquote'
  listItem?: 'bullet' | 'number'
  level?: number
  markDefs: PTMarkDef[]
  children: PTSpan[]
}
export type PTObject = { _type: string; _key: string; [field: string]: unknown }
export type PT = (PTTextBlock | PTObject)[]

const counter = new Map<string, number>()

/** Keys stay stable across builds because each document gets its own namespace. */
export function keyer(ns: string) {
  return () => {
    const n = (counter.get(ns) ?? 0) + 1
    counter.set(ns, n)
    return `${ns}${n.toString(36)}`
  }
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

function inline(md: string, key: () => string) {
  const markDefs: PTMarkDef[] = []
  const children: PTSpan[] = []
  for (const part of md.split(INLINE)) {
    if (!part) continue
    let text = part
    let marks: string[] = []
    if (part.startsWith('**')) {
      text = part.slice(2, -2)
      marks = ['strong']
    } else if (part.startsWith('`')) {
      text = part.slice(1, -1)
      marks = ['code']
    } else if (part.startsWith('[')) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
      if (m) {
        const k = key()
        markDefs.push({ _key: k, _type: 'link', href: m[2] })
        text = m[1]
        marks = [k]
      }
    } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      text = part.slice(1, -1)
      marks = ['em']
    }
    children.push({ _type: 'span', _key: key(), text, marks })
  }
  return { markDefs, children }
}

export function builder(ns: string) {
  const key = keyer(ns)
  const block = (
    style: PTTextBlock['style'],
    md: string,
    list?: PTTextBlock['listItem']
  ): PTTextBlock => ({
    _type: 'block',
    _key: key(),
    style,
    ...(list ? { listItem: list, level: 1 } : {}),
    ...inline(md, key)
  })
  return {
    p: (md: string) => block('normal', md),
    h2: (md: string) => block('h2', md),
    h3: (md: string) => block('h3', md),
    quote: (md: string) => block('blockquote', md),
    li: (md: string) => block('normal', md, 'bullet'),
    ol: (md: string) => block('normal', md, 'number'),
    /** Any custom block: diagrams, simulations, callouts… */
    obj: <T extends Record<string, unknown>>(
      type: string,
      fields?: T
    ): PTObject => ({ _type: type, _key: key(), ...(fields ?? {}) }),
    /** A callout carries its own short rich text. */
    callout: (tone: 'note' | 'warn' | 'tip', md: string): PTObject => ({
      _type: 'callout',
      _key: key(),
      tone,
      body: [block('normal', md)]
    })
  }
}

export type Localized<T> = { fr: T; en: T }
