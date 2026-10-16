'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

import styles from './manifesto.module.css'

/** Words light up one by one as the paragraph crosses the viewport. */
export function Manifesto() {
  const t = useTranslations('manifesto')
  const locale = useLocale()
  const ref = useRef<HTMLParagraphElement>(null)
  const [lit, setLit] = useState(0)
  const text = t('text')
  const accents = t('accents')

  // Segmenter splits Japanese and Korean into real words too, where spaces would not
  const segments = useMemo(() => {
    const marked = accents.split('|').filter(Boolean)
    // prefix match, because Korean and Arabic glue particles onto the word
    return [
      ...new Intl.Segmenter(locale, { granularity: 'word' }).segment(text)
    ].map((s) => ({
      text: s.segment,
      word: !!s.isWordLike,
      accent: marked.some((m) => s.segment.startsWith(m))
    }))
  }, [text, accents, locale])
  const total = segments.filter((s) => s.word).length

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let queued = false
    const update = () => {
      queued = false
      const r = el.getBoundingClientRect()
      const start = innerHeight * 0.85
      const end = innerHeight * 0.25 - r.height * 0.5
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)))
      setLit(Math.round(p * total))
    }
    const onScroll = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(update)
      }
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [total])

  let n = 0
  let prev = false
  return (
    <section
      id="manifeste"
      className="sec wrap"
      aria-labelledby="manifesto-title"
    >
      <div id="manifesto-title" className="eyebrow mono">
        {t('eyebrow')}
      </div>
      <p ref={ref} className={styles.text}>
        {segments.map((s, i) => {
          // punctuation follows the word before it, so commas don't light up early
          if (!s.word)
            return (
              <span key={i} className={styles.m} data-lit={prev || undefined}>
                {s.text}
              </span>
            )
          const on = n++ < lit
          prev = on
          return (
            <span
              key={i}
              className={styles.m}
              data-lit={on || undefined}
              data-accent={s.accent || undefined}
            >
              {s.text}
            </span>
          )
        })}
      </p>
    </section>
  )
}
