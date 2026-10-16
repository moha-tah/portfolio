'use client'

import { useMemo, useState } from 'react'

import type { ContentLang } from '@/lib/content'
import { CHUNK_TEXT } from '@/lib/search/corpus'

import styles from './chunking-demo.module.css'
import s from './shared.module.css'

const UI = {
  fr: {
    head: 'Découpage · taille et chevauchement',
    size: 'Taille (mots)',
    overlap: 'Chevauchement',
    question: 'Question',
    chunks: (n: number) => `${n} passage${n > 1 ? 's' : ''}`,
    whole: 'La réponse tient dans un seul passage.',
    split: (n: number) =>
      `La réponse est coupée sur ${n} passages : aucun ne suffit seul.`,
    noise: (p: number) =>
      `Le passage qui la contient fait ${p} % de bruit autour de la réponse.`
  },
  en: {
    head: 'Chunking · size and overlap',
    size: 'Size (words)',
    overlap: 'Overlap',
    question: 'Question',
    chunks: (n: number) => `${n} chunk${n > 1 ? 's' : ''}`,
    whole: 'The answer fits in a single chunk.',
    split: (n: number) =>
      `The answer is split across ${n} chunks: none is enough on its own.`,
    noise: (p: number) =>
      `The chunk that holds it is ${p} % noise around the answer.`
  }
}

const HUES = [
  'var(--c-ai)',
  'var(--c-data)',
  'var(--c-infra)',
  'var(--c-web)',
  'var(--c-os)',
  'var(--c-motion)'
]

export function ChunkingDemo({ lang }: { lang: ContentLang }) {
  const ui = UI[lang]
  const { text, question, answer } = CHUNK_TEXT[lang]
  const [size, setSize] = useState(24)
  const [overlap, setOverlap] = useState(0)

  const words = useMemo(() => text.split(' '), [text])
  const answerStart = useMemo(
    () => text.slice(0, text.indexOf(answer)).split(' ').length - 1,
    [text, answer]
  )
  const answerEnd = answerStart + answer.split(' ').length

  const { chunks, owner, holding, best } = useMemo(() => {
    const step = Math.max(1, size - overlap)
    const out: [number, number][] = []
    for (let i = 0; i < words.length; i += step) {
      out.push([i, Math.min(words.length, i + size)])
      if (i + size >= words.length) break
    }
    // which chunk "owns" each word for coloring: the first one that contains it
    const own = words.map((_, w) => out.findIndex(([a, b]) => w >= a && w < b))
    const hold = out.filter(([a, b]) => b > answerStart && a < answerEnd)
    const full = out.find(([a, b]) => a <= answerStart && b >= answerEnd)
    return { chunks: out, owner: own, holding: hold.length, best: full }
  }, [words, size, overlap, answerStart, answerEnd])

  const noise = best
    ? Math.round((1 - (answerEnd - answerStart) / (best[1] - best[0])) * 100)
    : 0

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <span className="mono">{ui.head}</span>
        <div className={s.controls}>
          <label className={s.range}>
            {ui.size}
            <input
              type="range"
              min={8}
              max={70}
              value={size}
              onChange={(e) => setSize(+e.target.value)}
            />
            <output>{size}</output>
          </label>
          <label className={s.range}>
            {ui.overlap}
            <input
              type="range"
              min={0}
              max={Math.min(20, size - 4)}
              value={Math.min(overlap, size - 4)}
              onChange={(e) => setOverlap(+e.target.value)}
            />
            <output>{Math.min(overlap, size - 4)}</output>
          </label>
        </div>
      </div>
      <div className={s.body}>
        <p className="mono dim">
          {ui.question} · {question}
        </p>
        <p className={styles.text}>
          {words.map((w, i) => {
            const c = owner[i]
            const inAnswer = i >= answerStart && i < answerEnd
            const boundary = chunks.some(([a]) => a === i) && i > 0
            const shared = chunks.filter(([a, b]) => i >= a && i < b).length > 1
            return (
              <span key={i}>
                {boundary && <i className={styles.cut} aria-hidden="true" />}
                <span
                  className={styles.w}
                  data-answer={inAnswer || undefined}
                  data-shared={shared || undefined}
                  style={
                    { '--k': HUES[c % HUES.length] } as React.CSSProperties
                  }
                >
                  {w}
                </span>{' '}
              </span>
            )
          })}
        </p>
        <div className={styles.verdict}>
          <span className="mono">{ui.chunks(chunks.length)}</span>
          <span data-ok={!!best || undefined}>
            {best ? ui.whole : ui.split(holding)}
          </span>
          {best && <span className="dim">{ui.noise(noise)}</span>}
        </div>
      </div>
    </div>
  )
}
