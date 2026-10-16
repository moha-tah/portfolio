'use client'

import { useId, useMemo, useState } from 'react'

import type { ContentLang } from '@/lib/content'
import { type Cluster, DOCS, SUGGESTIONS } from '@/lib/search/corpus'
import { dense } from '@/lib/search/engine'

import styles from './embedding-map.module.css'
import s from './shared.module.css'

const W = 640
const H = 420
const PAD = 40

const COLOR: Record<Cluster, string> = {
  energy: 'var(--c-infra)',
  errors: 'var(--c-motion)',
  mechanics: 'var(--c-os)',
  digital: 'var(--c-ai)'
}

const UI = {
  fr: {
    head: 'Carte du sens · projection 2D simplifiée',
    placeholder: 'Tapez une question…',
    clusters: {
      energy: 'Batterie & autonomie',
      errors: 'Codes d’erreur',
      mechanics: 'Mécanique',
      digital: 'Appli & firmware'
    } as Record<Cluster, string>,
    lost: 'Le modèle ne reconnaît rien dans cette question : le point reste au centre.',
    near: 'Plus proches voisins',
    note: 'Chaque fiche devient un point. Les fiches qui parlent de la même chose se regroupent, même sans partager un seul mot.'
  },
  en: {
    head: 'Meaning map · simplified 2D projection',
    placeholder: 'Type a question…',
    clusters: {
      energy: 'Battery & range',
      errors: 'Error codes',
      mechanics: 'Mechanics',
      digital: 'App & firmware'
    } as Record<Cluster, string>,
    lost: 'The model recognizes nothing in this question: the point stays in the middle.',
    near: 'Nearest neighbours',
    note: 'Every article becomes a point. Articles about the same thing cluster together, even when they share no words at all.'
  }
}

const px = ([x, y]: [number, number]): [number, number] => [
  PAD + x * (W - PAD * 2),
  PAD + y * (H - PAD * 2)
]

export function EmbeddingMap({ lang }: { lang: ContentLang }) {
  const ui = UI[lang]
  const id = useId()
  const [query, setQuery] = useState(SUGGESTIONS[lang][1].q)
  const [hover, setHover] = useState<number | null>(null)

  const { point, near, lost } = useMemo(() => {
    const hits = dense(query, lang)
    const top = hits.filter((h) => h.score > 0)
    if (!top.length)
      return { point: [W / 2, H / 2] as [number, number], near: [], lost: true }
    // the query lands near its best matches: a softmax-weighted average of their positions
    const weights = top.map((h) => Math.exp(h.score * 9))
    const sum = weights.reduce((a, b) => a + b, 0)
    let x = 0
    let y = 0
    top.forEach((h, i) => {
      const [dx, dy] = px(DOCS.find((d) => d.id === h.id)!.pos)
      x += (dx * weights[i]) / sum
      y += (dy * weights[i]) / sum
    })
    return {
      point: [x, y] as [number, number],
      near: top.slice(0, 3).map((h) => h.id),
      lost: false
    }
  }, [query, lang])

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <span className="mono">{ui.head}</span>
        <ul className={styles.legend}>
          {(Object.keys(COLOR) as Cluster[]).map((c) => (
            <li
              key={c}
              className="mono dim"
              style={{ '--k': COLOR[c] } as React.CSSProperties}
            >
              {ui.clusters[c]}
            </li>
          ))}
        </ul>
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
        </div>
        <div className={s.chips}>
          {SUGGESTIONS[lang].map((x) => (
            <button
              key={x.q}
              aria-pressed={x.q === query}
              onClick={() => setQuery(x.q)}
            >
              {x.q}
            </button>
          ))}
        </div>
        <div className={styles.stage}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`${ui.near}: ${near.map((n) => DOCS.find((d) => d.id === n)!.title[lang]).join(', ')}`}
          >
            {near.map((n, i) => {
              const [x, y] = px(DOCS.find((d) => d.id === n)!.pos)
              return (
                <line
                  key={n}
                  x1={point[0]}
                  y1={point[1]}
                  x2={x}
                  y2={y}
                  className={styles.link}
                  style={{ opacity: 1 - i * 0.25 }}
                />
              )
            })}
            {DOCS.map((d) => {
              const [x, y] = px(d.pos)
              const isNear = near.includes(d.id)
              const label = isNear || hover === d.id
              return (
                <g
                  key={d.id}
                  className={styles.doc}
                  data-near={isNear || undefined}
                  onPointerEnter={() => setHover(d.id)}
                  onPointerLeave={() => setHover(null)}
                  style={{ '--k': COLOR[d.cluster] } as React.CSSProperties}
                >
                  <circle cx={x} cy={y} r={isNear ? 8 : 6} />
                  {label && (
                    <text
                      x={x + (x > W * 0.6 ? -14 : 14)}
                      y={y + 4}
                      textAnchor={x > W * 0.6 ? 'end' : 'start'}
                    >
                      {d.title[lang]}
                    </text>
                  )}
                </g>
              )
            })}
            <g
              className={styles.query}
              style={{ transform: `translate(${point[0]}px, ${point[1]}px)` }}
              data-lost={lost || undefined}
            >
              <circle r={26} className={styles.halo} />
              <circle r={7} />
            </g>
          </svg>
        </div>
        <p className={s.note}>{lost ? ui.lost : ui.note}</p>
      </div>
    </div>
  )
}
