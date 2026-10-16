'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'

import { SplitHeading } from '@/components/fx/split-heading'
import { PLACES, distanceKm } from '@/lib/geo/land'

import styles from './path.module.css'
import { RouteMap } from './route-map'

const LEGS = ['utc', 'napta', 'barfield'] as const

export function Path() {
  const t = useTranslations('path')
  const locale = useLocale()
  const [at, setAt] = useState(0)
  const legs = useRef<(HTMLLIElement | null)[]>([])

  // the leg closest to the middle of the viewport drives the map
  useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      let best = 0
      let bd = Infinity
      legs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - innerHeight * 0.55)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      setAt(best)
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
  }, [])

  const places = useMemo(
    () => ({
      compiegne: t('places.compiegne'),
      paris: t('places.paris'),
      miami: t('places.miami')
    }),
    [t]
  )
  const nf = new Intl.NumberFormat(locale)
  const km = (v: number, step: number) => nf.format(Math.round(v / step) * step)
  const caption = [
    places.compiegne,
    t('hop', {
      from: places.compiegne,
      to: places.paris,
      km: km(distanceKm(PLACES.compiegne, PLACES.paris), 10)
    }),
    t('hop', {
      from: places.paris,
      to: places.miami,
      km: km(distanceKm(PLACES.paris, PLACES.miami), 100)
    })
  ][at]

  return (
    <section id="parcours" className="sec wrap" aria-labelledby="path-title">
      <div className="eyebrow mono">{t('eyebrow')}</div>
      <SplitHeading
        id="path-title"
        className="h-section"
        lead={t('titleLead')}
        tail={t('titleTail')}
      />
      <div className={styles.grid}>
        <div className={styles.map}>
          <RouteMap at={at} places={places} label={t('mapAria')} />
          <span className="mono dim" aria-live="polite">
            {caption}
          </span>
        </div>
        <ol className={styles.legs}>
          {LEGS.map((k, i) => (
            <li
              key={k}
              ref={(el) => {
                legs.current[i] = el
              }}
              className={styles.leg}
              data-on={at === i || undefined}
            >
              <span className="mono">{t(`legs.${k}.when`)}</span>
              <h3>{t(`legs.${k}.title`)}</h3>
              <p>{t(`legs.${k}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
