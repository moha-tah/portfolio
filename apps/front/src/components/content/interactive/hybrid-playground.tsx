'use client'

import { useId, useMemo, useState } from 'react'

import type { ContentLang } from '@/lib/content'
import { DOCS, SUGGESTIONS } from '@/lib/search/corpus'
import {
  type Hit,
  bm25,
  dense,
  rerank,
  rrf,
  tokenize
} from '@/lib/search/engine'

import styles from './hybrid-playground.module.css'
import s from './shared.module.css'

const ROWS = 5
const ROW_H = 58

const UI = {
  fr: {
    head: 'Terrain de jeu · 12 fiches d’aide fictives',
    placeholder: 'Posez une question à l’aide en ligne…',
    clear: 'Effacer',
    words: 'Mots · BM25',
    meaning: 'Sens · embeddings',
    hybrid: 'Hybride · RRF',
    reranked: 'Reclassé',
    rerank: 'Reclasser le top 5',
    k: 'k de la fusion',
    nothing: 'Rien trouvé',
    expected: 'Bonne réponse',
    rank: (n: number | null) =>
      n === null ? 'absente' : n === 1 ? '1ʳᵉ' : `${n}ᵉ`,
    note: 'BM25 est calculé pour de vrai sur le texte. Les embeddings sont simulés par un petit lexique de concepts, assez pour reproduire leurs forces et leurs angles morts.'
  },
  en: {
    head: 'Playground · 12 fictional help articles',
    placeholder: 'Ask the help center something…',
    clear: 'Clear',
    words: 'Words · BM25',
    meaning: 'Meaning · embeddings',
    hybrid: 'Hybrid · RRF',
    reranked: 'Reranked',
    rerank: 'Rerank the top 5',
    k: 'fusion k',
    nothing: 'Nothing found',
    expected: 'Right answer',
    rank: (n: number | null) =>
      n === null
        ? 'missing'
        : n === 1
          ? '1st'
          : n === 2
            ? '2nd'
            : n === 3
              ? '3rd'
              : `${n}th`,
    note: 'BM25 is computed for real on the text. Embeddings are simulated with a small concept lexicon, enough to reproduce their strengths and blind spots.'
  }
}

/** Highlights the query terms BM25 actually matched in a title. */
function Marked({
  text,
  terms,
  lang
}: {
  text: string
  terms: Set<string>
  lang: ContentLang
}) {
  return (
    <>
      {text.split(/(\s+)/).map((w, i) => {
        const t = tokenize(w, lang)[0]
        return t && terms.has(t) ? <mark key={i}>{w}</mark> : w
      })}
    </>
  )
}

function Column({
  title,
  hits,
  expect,
  terms,
  lang,
  tone
}: {
  title: string
  hits: Hit[]
  expect: number | null
  terms?: Set<string>
  lang: ContentLang
  tone: string
}) {
  const ui = UI[lang]
  const ranked = hits.filter((h) => h.score > 0)
  const max = ranked[0]?.score || 1
  const pos = expect === null ? -1 : ranked.findIndex((h) => h.id === expect)
  return (
    <div
      className={styles.col}
      style={{ '--tone': tone } as React.CSSProperties}
    >
      <div className={styles.colHead}>
        <span className="mono">{title}</span>
        {expect !== null && (
          <span className={`mono ${pos === 0 ? styles.good : styles.bad}`}>
            {ui.expected} · {ui.rank(pos < 0 ? null : pos + 1)}
          </span>
        )}
      </div>
      <ol className={styles.list} style={{ height: ROWS * ROW_H }}>
        {DOCS.map((d) => {
          const i = ranked.findIndex((h) => h.id === d.id)
          const shown = i >= 0 && i < ROWS
          const hit = ranked[i]
          return (
            <li
              key={d.id}
              className={styles.row}
              data-expected={d.id === expect || undefined}
              aria-hidden={!shown || undefined}
              style={{
                transform: `translateY(${(shown ? i : ROWS) * ROW_H}px)`,
                opacity: shown ? 1 : 0
              }}
            >
              <span className={styles.n}>{shown ? i + 1 : ''}</span>
              <span className={styles.t}>
                {terms ? (
                  <Marked text={d.title[lang]} terms={terms} lang={lang} />
                ) : (
                  d.title[lang]
                )}
              </span>
              <span className={styles.bar}>
                <i
                  style={{
                    width: `${hit ? Math.max(4, (hit.score / max) * 100) : 0}%`
                  }}
                />
              </span>
            </li>
          )
        })}
        {!ranked.length && <li className={styles.empty}>{ui.nothing}</li>}
      </ol>
    </div>
  )
}

export function HybridPlayground({ lang }: { lang: ContentLang }) {
  const ui = UI[lang]
  const sugg = SUGGESTIONS[lang]
  const id = useId()
  const [query, setQuery] = useState(sugg[0].q)
  const [k, setK] = useState(60)
  const [rerankOn, setRerankOn] = useState(false)

  const expected = sugg.find((x) => x.q === query)?.expect ?? null
  const { words, meaning, hybrid, final, terms } = useMemo(() => {
    const w = bm25(query, lang)
    const m = dense(query, lang)
    const h = rrf([w, m], k)
    return {
      words: w,
      meaning: m,
      hybrid: h,
      final: rerank(query, lang, h),
      terms: new Set(tokenize(query, lang))
    }
  }, [query, lang, k])

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <span className="mono">{ui.head}</span>
        <div className={s.controls}>
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
          <label className={s.toggle}>
            <input
              type="checkbox"
              checked={rerankOn}
              onChange={(e) => setRerankOn(e.target.checked)}
            />
            <i />
            {ui.rerank}
          </label>
        </div>
      </div>
      <div className={s.body}>
        <div className={s.input}>
          <label htmlFor={`${id}-q`} className="sr-only">
            {ui.placeholder}
          </label>
          <input
            id={`${id}-q`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ui.placeholder}
            autoComplete="off"
            spellCheck={false}
          />
          {query && <button onClick={() => setQuery('')}>{ui.clear}</button>}
        </div>
        <div className={s.chips}>
          {sugg.map((x) => (
            <button
              key={x.q}
              aria-pressed={x.q === query}
              onClick={() => setQuery(x.q)}
            >
              {x.q}
            </button>
          ))}
        </div>
        <div className={styles.cols} data-four={rerankOn || undefined}>
          <Column
            title={ui.words}
            hits={words}
            expect={expected}
            terms={terms}
            lang={lang}
            tone="var(--c-os)"
          />
          <Column
            title={ui.meaning}
            hits={meaning}
            expect={expected}
            lang={lang}
            tone="var(--c-ai)"
          />
          <Column
            title={ui.hybrid}
            hits={hybrid}
            expect={expected}
            lang={lang}
            tone="var(--accent)"
          />
          {rerankOn && (
            <Column
              title={ui.reranked}
              hits={final}
              expect={expected}
              lang={lang}
              tone="var(--c-data)"
            />
          )}
        </div>
        <p className={s.note}>{ui.note}</p>
      </div>
    </div>
  )
}
