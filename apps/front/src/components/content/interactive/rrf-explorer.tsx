'use client'

import { useMemo, useState } from 'react'

import type { ContentLang } from '@/lib/content'
import { SUGGESTIONS } from '@/lib/search/corpus'
import { bm25, dense, docById } from '@/lib/search/engine'

import styles from './rrf-explorer.module.css'
import s from './shared.module.css'

const ROW_H = 52

const UI = {
  fr: {
    head: 'La fusion, pas à pas',
    query: 'Question',
    doc: 'Fiche',
    words: 'Rang mots',
    meaning: 'Rang sens',
    score: 'Score fusionné',
    k: 'k',
    quote: (q: string) => `« ${q} »`,
    low: 'k petit : la 1ʳᵉ place de chaque liste écrase tout.',
    high: 'k grand : être bien classé dans les deux listes compte davantage.',
    absent: '—'
  },
  en: {
    head: 'Fusion, step by step',
    query: 'Question',
    doc: 'Article',
    words: 'Words rank',
    meaning: 'Meaning rank',
    score: 'Fused score',
    k: 'k',
    quote: (q: string) => `“${q}”`,
    low: 'Small k: first place in either list outweighs everything.',
    high: 'Large k: ranking well in both lists matters more.',
    absent: '—'
  }
}

export function RrfExplorer({ lang }: { lang: ContentLang }) {
  const ui = UI[lang]
  const query = SUGGESTIONS[lang][1].q
  const [k, setK] = useState(60)

  const rows = useMemo(() => {
    const rank = (list: { id: number; score: number }[]) =>
      new Map(
        list
          .filter((h) => h.score > 0)
          .slice(0, 5)
          .map((h, i) => [h.id, i + 1])
      )
    const a = rank(bm25(query, lang))
    const b = rank(dense(query, lang))
    const ids = [...new Set([...a.keys(), ...b.keys()])]
    const scored = ids.map((id) => {
      const ra = a.get(id) ?? null
      const rb = b.get(id) ?? null
      const score = (ra ? 1 / (k + ra) : 0) + (rb ? 1 / (k + rb) : 0)
      return { id, ra, rb, score }
    })
    const order = [...scored]
      .sort((x, y) => y.score - x.score || x.id - y.id)
      .map((r) => r.id)
    return { list: scored, order, max: Math.max(...scored.map((r) => r.score)) }
  }, [query, lang, k])

  const top = rows.list.find((r) => r.id === rows.order[0])!
  const term = (r: number | null) => (r ? `1/(${k}+${r})` : '0')

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <span className="mono">{ui.head}</span>
        <label className={s.range}>
          {ui.k}
          <input
            type="range"
            min={1}
            max={100}
            value={k}
            onChange={(e) => setK(+e.target.value)}
          />
          <output>{k}</output>
        </label>
      </div>
      <div className={s.body}>
        <p className="mono dim">
          {ui.query} · {ui.quote(query)}
        </p>
        <div className={styles.table} role="table">
          <div className={`${styles.tr} ${styles.th} mono dim`} role="row">
            <span role="columnheader">{ui.doc}</span>
            <span role="columnheader">{ui.words}</span>
            <span role="columnheader">{ui.meaning}</span>
            <span role="columnheader">{ui.score}</span>
          </div>
          <div
            className={styles.rows}
            style={{ height: rows.list.length * ROW_H }}
          >
            {rows.list.map((r) => {
              const i = rows.order.indexOf(r.id)
              return (
                <div
                  key={r.id}
                  role="row"
                  className={styles.tr}
                  data-first={i === 0 || undefined}
                  style={{ transform: `translateY(${i * ROW_H}px)` }}
                >
                  <span role="cell" className={styles.title}>
                    {docById(r.id).title[lang]}
                  </span>
                  <span role="cell" className="mono">
                    {r.ra ?? ui.absent}
                  </span>
                  <span role="cell" className="mono">
                    {r.rb ?? ui.absent}
                  </span>
                  <span role="cell" className={styles.score}>
                    <i style={{ width: `${(r.score / rows.max) * 100}%` }} />
                    <b className="mono">{r.score.toFixed(4)}</b>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <p className={styles.formula}>
          <span className="mono dim">{docById(top.id).title[lang]}</span>
          <code>
            {term(top.ra)} + {term(top.rb)} = {top.score.toFixed(4)}
          </code>
        </p>
        <p className={s.note}>{k < 20 ? ui.low : ui.high}</p>
      </div>
    </div>
  )
}
