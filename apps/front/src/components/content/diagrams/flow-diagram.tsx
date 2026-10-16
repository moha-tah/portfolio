'use client'

import { useEffect, useRef, useState } from 'react'

import type { ContentLang } from '@/lib/content'

import { DIAGRAMS, type DiagramName, type Tone } from './defs'
import styles from './flow-diagram.module.css'

const TONE: Record<Tone, string> = {
  accent: 'var(--accent)',
  ai: 'var(--c-ai)',
  web: 'var(--c-web)',
  infra: 'var(--c-infra)',
  data: 'var(--c-data)',
  motion: 'var(--c-motion)',
  os: 'var(--c-os)',
  mute: 'var(--mute)'
}

/** Architecture diagram drawn in SVG: boxes appear in order, then the data starts flowing. */
export function FlowDiagram({
  name,
  lang
}: {
  name: DiagramName
  lang: ContentLang
}) {
  const def = DIAGRAMS[name]
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure ref={ref} className={styles.fig} data-in={seen || undefined}>
      <div className={styles.scroll}>
        <svg
          viewBox={`0 0 ${def.width} ${def.height}`}
          role="img"
          aria-label={def.aria[lang]}
          style={{ minWidth: Math.min(def.width, 680) }}
        >
          {def.frames?.map((f, i) => (
            <g key={`f${i}`} className={styles.frame}>
              <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={18} />
              <text x={f.x + 16} y={f.y + 22}>
                {f.label[lang].toUpperCase()}
              </text>
            </g>
          ))}
          {def.flows.map((f, i) => (
            <path
              key={`p${i}`}
              d={f.d}
              className={styles[f.kind ?? 'main']}
              style={{
                stroke: f.tone ? TONE[f.tone] : undefined,
                transitionDelay: `${400 + i * 90}ms`
              }}
            />
          ))}
          {def.boxes.map((b, i) => {
            const w = b.w ?? 160
            const h = b.h ?? 100
            const tone = b.tone ? TONE[b.tone] : undefined
            return (
              <g
                key={`b${i}`}
                className={styles.box}
                style={
                  {
                    transitionDelay: `${i * 70}ms`,
                    '--tone': tone
                  } as React.CSSProperties
                }
                data-tone={b.tone ? '' : undefined}
              >
                <rect x={b.x} y={b.y} width={w} height={h} rx={14} />
                {b.tone && <circle cx={b.x + 16} cy={b.y + 18} r={3.5} />}
                <text
                  x={b.x + 16}
                  y={b.y + h / 2 + (b.sub ? -2 : 5)}
                  className={styles.title}
                >
                  {b.title[lang]}
                </text>
                {b.sub && (
                  <text
                    x={b.x + 16}
                    y={b.y + h / 2 + 20}
                    className={styles.sub}
                  >
                    {b.sub[lang].toUpperCase()}
                  </text>
                )}
              </g>
            )
          })}
          {def.labels?.map((lb, i) => (
            <text
              key={`l${i}`}
              x={lb.x}
              y={lb.y}
              textAnchor={lb.anchor ?? 'start'}
              className={styles.label}
              style={{ fill: lb.tone ? TONE[lb.tone] : undefined }}
            >
              {lb.text[lang].toUpperCase()}
            </text>
          ))}
        </svg>
      </div>
      {def.note && (
        <figcaption className="mono dim">{def.note[lang]}</figcaption>
      )}
    </figure>
  )
}
