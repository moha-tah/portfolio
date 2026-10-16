'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import styles from './article-chrome.module.css'

/** Thin accent bar across the top that fills as the article is read. */
export function ReadingProgress({ target }: { target: string }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = document.getElementById(target)
    if (!el) return
    let queued = false
    const update = () => {
      queued = false
      const r = el.getBoundingClientRect()
      setP(
        Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
      )
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
  }, [target])
  return (
    <div
      className={styles.progress}
      style={{ transform: `scaleX(${p})` }}
      aria-hidden="true"
    />
  )
}

/** Sticky table of contents that follows the section being read. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const t = useTranslations('blog')
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((x): x is HTMLElement => !!x)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  if (!items.length) return null
  return (
    <nav className={styles.toc} aria-label={t('toc')}>
      <p className="mono dim">{t('toc')}</p>
      <ol>
        {items.map((i) => (
          <li key={i.id} data-on={i.id === active || undefined}>
            <a href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ShareButton() {
  const t = useTranslations('blog')
  const [done, setDone] = useState(false)
  return (
    <button
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(location.href.split('#')[0])
          setDone(true)
          setTimeout(() => setDone(false), 1800)
        } catch {
          // clipboard refused: nothing else to do, the URL is in the address bar
        }
      }}
    >
      {done ? t('copied') : t('share')}
    </button>
  )
}
