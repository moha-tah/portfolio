'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Magnetic } from '@/components/fx/magnetic'

import styles from './hero.module.css'
import type { ParticleScene } from './particle-scene'

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function Hero() {
  const t = useTranslations('hero')
  const section = useRef<HTMLElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const sec = section.current
    const el = host.current
    if (!sec || !el) return
    let scene: ParticleScene | null = null
    let disposed = false
    let visible = true

    const progress = () => {
      const r = sec.getBoundingClientRect()
      return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)))
    }
    const update = () => {
      const p = progress()
      scene?.setMorph(
        smooth(0.12, 0.38, p) + smooth(0.58, 0.84, p),
        smooth(0.3, 0.5, p)
      )
      setStage(p < 0.25 ? 0 : p < 0.62 ? 1 : 2)
    }
    const onMove = (e: PointerEvent) =>
      scene?.setPointer(
        e.clientX / innerWidth - 0.5,
        e.clientY / innerHeight - 0.5
      )

    const boot = async () => {
      try {
        const probe = document.createElement('canvas')
        if (!probe.getContext('webgl2') && !probe.getContext('webgl'))
          throw new Error('no webgl')
        const [THREE, { createParticleScene }] = await Promise.all([
          import('three'),
          import('./particle-scene')
        ])
        // the name is sampled from the display font, so it has to be loaded first
        await document.fonts.ready
        if (disposed) return
        const css = getComputedStyle(document.documentElement)
        scene = createParticleScene(THREE, {
          host: el,
          fontFamily:
            css.getPropertyValue('--font-bricolage').trim() || 'sans-serif',
          fg: css.getPropertyValue('--fg').trim(),
          accent: css.getPropertyValue('--accent').trim(),
          reduce: matchMedia('(prefers-reduced-motion: reduce)').matches
        })
        update()
        if (visible) scene.start()
      } catch {
        setFallback(true)
      }
    }
    boot()

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) scene?.start()
      else scene?.stop()
    })
    io.observe(sec)
    addEventListener('scroll', update, { passive: true })
    addEventListener('pointermove', onMove)
    return () => {
      disposed = true
      io.disconnect()
      removeEventListener('scroll', update)
      removeEventListener('pointermove', onMove)
      scene?.dispose()
    }
  }, [])

  const captions = [
    t.rich('caption0', { b: (c) => <strong>{c}</strong> }),
    t.rich('caption1', { b: (c) => <strong>{c}</strong> }),
    t.rich('caption2', { b: (c) => <strong>{c}</strong> })
  ]
  const steps = [t('steps.name'), t('steps.route'), t('steps.network')]

  return (
    <section ref={section} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div ref={host} className={styles.gl} aria-hidden="true" />
        {fallback && (
          <p className={styles.fallback} aria-hidden="true">
            Mohamed
            <br />
            Tahiri
          </p>
        )}
        <div className={styles.hud}>
          <ol className={`${styles.steps} mono`} aria-hidden="true">
            {steps.map((s, i) => (
              <li key={s} data-on={i === stage || undefined}>
                {s}
              </li>
            ))}
          </ol>
          <div className={styles.low}>
            <div>
              <h1 id="hero-title" className="sr-only">
                {t('h1')}
              </h1>
              {/* every caption is in the DOM so the first frame and crawlers get the text */}
              <p className={styles.cap}>
                {captions.map((c, i) => (
                  <span
                    key={i}
                    data-on={i === stage || undefined}
                    aria-hidden={i !== stage || undefined}
                  >
                    {c}
                  </span>
                ))}
              </p>
            </div>
            <div className={styles.cta}>
              <Magnetic>
                <a className="btn btn-pri" href="#travaux">
                  {t('ctaWork')} <span aria-hidden="true">↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href="#contact">
                  {t('ctaContact')}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
