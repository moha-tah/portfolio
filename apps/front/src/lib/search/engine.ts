import type { ContentLang } from '@/lib/content'

import { CONCEPTS, type Concept, DOCS, type Doc, LEXICON } from './corpus'

const STOP: Record<ContentLang, Set<string>> = {
  fr: new Set(
    'le la les un une des de du d l a au aux et ou en dans sur pour par avec sans ma mon mes ce cette ces qui que quoi est sont fait font il elle on se s n ne pas plus moins tres trop'.split(
      ' '
    )
  ),
  en: new Set(
    'the a an of to in on for with without my is are it its and or by at this that these those do does make makes get gets faster'.split(
      ' '
    )
  )
}

const fold = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ')

/** Lowercase, accent-free tokens. Hyphenated codes like "e-07" or "bx-220" stay whole. */
export function tokenize(text: string, lang: ContentLang): string[] {
  const tokens = fold(text).match(/[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? []
  return tokens
    .filter((t) => !STOP[lang].has(t))
    .map((t) =>
      t.length > 4 && t.endsWith('s') && !/\d/.test(t) ? t.slice(0, -1) : t
    )
}

export type Hit = { id: number; score: number }

/** Real BM25 over title + text. */
export function bm25(
  query: string,
  lang: ContentLang,
  docs: Doc[] = DOCS,
  k1 = 1.2,
  b = 0.75
): Hit[] {
  const q = tokenize(query, lang)
  const tf = docs.map((d) => tokenize(`${d.title[lang]} ${d.text[lang]}`, lang))
  const avg = tf.reduce((s, t) => s + t.length, 0) / tf.length
  const df = (term: string) => tf.filter((t) => t.includes(term)).length
  return docs
    .map((d, i) => {
      let score = 0
      for (const term of new Set(q)) {
        const f = tf[i].filter((t) => t === term).length
        if (!f) continue
        const idf = Math.log(
          1 + (docs.length - df(term) + 0.5) / (df(term) + 0.5)
        )
        score +=
          (idf * (f * (k1 + 1))) / (f + k1 * (1 - b + (b * tf[i].length) / avg))
      }
      return { id: d.id, score }
    })
    .sort((a, b) => b.score - a.score || a.id - b.id)
}

/** Concept vector of a free-text query, through the toy lexicon. */
export function embed(
  query: string,
  lang: ContentLang
): Record<Concept, number> {
  const v = Object.fromEntries(CONCEPTS.map((c) => [c, 0])) as Record<
    Concept,
    number
  >
  const text = ` ${fold(query)} `
  const tokens = tokenize(query, lang)
  for (const [stem, weights] of LEXICON[lang]) {
    // multi-word stems match the folded sentence, single stems match the start of a token
    const hit = stem.includes(' ')
      ? text.includes(stem)
      : tokens.some((t) => t.startsWith(stem))
    if (!hit) continue
    for (const [c, w] of Object.entries(weights)) v[c as Concept] += w as number
  }
  return v
}

const cosine = (
  a: Record<Concept, number>,
  b: Partial<Record<Concept, number>>
) => {
  let dot = 0
  let na = 0
  let nb = 0
  for (const c of CONCEPTS) {
    const x = a[c]
    const y = b[c] ?? 0
    dot += x * y
    na += x * x
    nb += y * y
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0
}

/** "Semantic" search: cosine between the query's concepts and each document's. */
export function dense(
  query: string,
  lang: ContentLang,
  docs: Doc[] = DOCS
): Hit[] {
  const v = embed(query, lang)
  return docs
    .map((d) => ({ id: d.id, score: cosine(v, d.vec) }))
    .sort((a, b) => b.score - a.score || a.id - b.id)
}

/** Reciprocal rank fusion: each list votes 1 / (k + rank) for every document it ranks. */
export function rrf(lists: Hit[][], k = 60): Hit[] {
  const scores = new Map<number, number>()
  for (const list of lists) {
    list
      .filter((h) => h.score > 0)
      .forEach((h, i) =>
        scores.set(h.id, (scores.get(h.id) ?? 0) + 1 / (k + i + 1))
      )
  }
  return [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score || a.id - b.id)
}

/**
 * Stand-in for a cross-encoder: it reads the query and each candidate together, so exact codes
 * and meaning both count. Only the top candidates are re-scored, as in production.
 */
export function rerank(
  query: string,
  lang: ContentLang,
  candidates: Hit[],
  top = 5
): Hit[] {
  const q = new Set(tokenize(query, lang))
  const v = embed(query, lang)
  const head = candidates.slice(0, top).map((h) => {
    const d = DOCS.find((x) => x.id === h.id)!
    const words = tokenize(`${d.title[lang]} ${d.text[lang]}`, lang)
    const overlap = words.filter((w) => q.has(w)).length / Math.max(1, q.size)
    const code = [...q].some((t) => /\d/.test(t) && words.includes(t)) ? 0.6 : 0
    return {
      id: h.id,
      score: 0.55 * cosine(v, d.vec) + 0.25 * Math.min(1, overlap) + code
    }
  })
  return [...head.sort((a, b) => b.score - a.score), ...candidates.slice(top)]
}

export const docById = (id: number) => DOCS.find((d) => d.id === id)!
