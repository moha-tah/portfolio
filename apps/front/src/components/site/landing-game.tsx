'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import styles from './landing-game.module.css'

// Everything is in fractions of the canvas (x of width, y of height) so a round lasts the same on every screen.
const GY = 0.8
const X0 = 0.05
const Y0 = 0.2
const R0 = 0.58
const R1 = 0.97
const AIM = 0.65
const SPEED = 0.21
const SINK = 0.3
const LIFT = -0.07
const LAG = 3.2
const FPM = 2600
const IDEAL = Math.atan2(GY - Y0, AIM - X0)
const BEST_KEY = 'landing-best'

type Msg = { title: string; sub?: string }

export function LandingGame() {
  const t = useTranslations('game')
  const canvas = useRef<HTMLCanvasElement>(null)
  const [msg, setMsg] = useState<Msg>({ title: '' })
  const [best, setBest] = useState<number | null>(null)
  // the canvas loop reads translations through a ref so it never restarts on re-render
  const tRef = useRef(t)
  tRef.current = t

  useEffect(() => {
    const cv = canvas.current
    if (!cv) return
    const g = cv.getContext('2d')
    if (!g) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = matchMedia('(hover: none)').matches
    const css = getComputedStyle(document.documentElement)
    const C = Object.fromEntries(
      [
        'n-sky',
        'n-hz',
        'n-fg',
        'n-mute',
        'l-white',
        'l-red',
        'l-green',
        'l-amber'
      ].map((k) => [k, css.getPropertyValue(`--${k}`).trim()])
    )
    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.7,
      s: Math.random() < 0.15 ? 1.6 : 1,
      ph: Math.random() * 6.28
    }))
    const city = Array.from({ length: 90 }, () => ({
      x: Math.random() * 0.55,
      y: Math.random() ** 2 * 0.03,
      a: Math.random() < 0.3
    }))

    let W = 0
    let H = 0
    let st: 'idle' | 'fly' | 'roll' | 'done' = 'idle'
    let hold = false
    let last = 0
    let raf = 0
    let inView = false
    let record: number | null = null
    try {
      const v = localStorage.getItem(BEST_KEY)
      record = v ? Number(v) : null
    } catch {
      record = null
    }
    setBest(record)
    const p = {
      x: X0,
      y: Y0,
      vy: 0,
      roll: 0,
      smoke: [] as { x: number; r: number; l: number }[]
    }
    const reset = () =>
      Object.assign(p, {
        x: X0,
        y: Y0,
        vy: (GY - Y0) / ((AIM - X0) / SPEED),
        roll: 0,
        smoke: []
      })
    const idle = () =>
      setMsg({
        title: touch ? tRef.current('idleTouch') : tRef.current('idle')
      })

    // PAPI: number of white lights for the current angle to the aiming point
    const whites = () => {
      if (p.x >= AIM) return 2
      const d = ((Math.atan2(GY - p.y, AIM - p.x) - IDEAL) * 180) / Math.PI
      return d > 2.2 ? 4 : d > 0.8 ? 3 : d > -0.8 ? 2 : d > -2.2 ? 1 : 0
    }

    const start = () => {
      reset()
      st = 'fly'
      hold = false
      setMsg({ title: '' })
      cv.style.touchAction = 'none'
      kick()
    }

    const land = () => {
      const tt = tRef.current
      const fpm = Math.round(Math.max(0, p.vy) * FPM)
      const inZone = p.x > AIM - 0.04 && p.x < AIM + 0.15
      p.y = GY
      p.vy = 0
      cv.style.touchAction = 'pan-y'
      for (let i = 0; i < 8; i++)
        p.smoke.push({ x: p.x - i * 0.004, r: 2 + Math.random() * 3, l: 1 })
      if (p.x < R0) {
        st = 'done'
        return setMsg({ title: tt('short'), sub: tt('shortHint') })
      }
      if (fpm > 450) {
        st = 'done'
        return setMsg({
          title: tt('hard', { fpm: String(fpm) }),
          sub: tt('hardHint')
        })
      }
      st = 'roll'
      p.roll = SPEED
      const isRecord = record === null || fpm < record
      if (isRecord) {
        record = fpm
        setBest(fpm)
        try {
          localStorage.setItem(BEST_KEY, String(fpm))
        } catch {
          // storage blocked: the record just won't survive a reload
        }
      }
      const grade =
        fpm < 120 ? tt('kiss') : fpm < 250 ? tt('nice') : tt('landed')
      setMsg({
        title: `${grade} · ${fpm} ft/min${isRecord ? ` · ${tt('record')}` : ''}`,
        sub: `${inZone ? tt('inZone') : tt('long')} · ${tt('replay')}`
      })
    }

    const step = (dt: number) => {
      if (st === 'fly') {
        p.vy += ((hold ? LIFT : SINK) - p.vy) * LAG * dt
        p.x += SPEED * dt
        p.y = Math.max(0.06, p.y + p.vy * dt)
        if (p.y >= GY) land()
        else if (p.x > R1) {
          st = 'done'
          cv.style.touchAction = 'pan-y'
          setMsg({
            title: tRef.current('goAround'),
            sub: tRef.current('goAroundHint')
          })
        }
      } else if (st === 'roll') {
        p.roll *= Math.pow(0.12, dt)
        p.x += p.roll * dt
        if (p.roll < 0.01) st = 'done'
      }
      for (const s of p.smoke) {
        s.r += 10 * dt
        s.l -= 1.1 * dt
      }
      p.smoke = p.smoke.filter((s) => s.l > 0)
    }

    const glow = (
      x: number,
      y: number,
      col: string,
      r: number,
      blur: number
    ) => {
      g.fillStyle = col
      g.shadowColor = col
      g.shadowBlur = blur
      g.beginPath()
      g.arc(x, y, r, 0, 6.283)
      g.fill()
    }

    const plane = (
      x: number,
      y: number,
      rot: number,
      now: number,
      s: number
    ) => {
      g.save()
      g.translate(x, y)
      g.rotate(rot)
      g.scale(s, s)
      g.fillStyle = C['n-fg']
      g.beginPath()
      g.moveTo(24, 0)
      g.quadraticCurveTo(24, -4.5, 15, -4.5)
      g.lineTo(-18, -4.5)
      g.lineTo(-27, -2.5)
      g.lineTo(-27, 0.5)
      g.lineTo(-18, 3.5)
      g.lineTo(15, 3.5)
      g.quadraticCurveTo(24, 3.5, 24, 0)
      g.fill()
      g.beginPath()
      g.moveTo(-15, -4)
      g.lineTo(-23, -16)
      g.lineTo(-28, -16)
      g.lineTo(-26, -2)
      g.closePath()
      g.fill()
      g.globalAlpha = 0.7
      g.fillRect(-7, 1.5, 15, 2)
      g.beginPath()
      g.ellipse(4, 5.8, 5.5, 2.3, 0, 0, 6.283)
      g.fill()
      g.globalAlpha = 1
      g.strokeStyle = C['n-fg']
      g.lineWidth = 1
      g.beginPath()
      g.moveTo(-3, 3.5)
      g.lineTo(-3, 8.5)
      g.moveTo(15, 3.5)
      g.lineTo(15, 8)
      g.stroke()
      g.beginPath()
      g.arc(-3, 9.6, 1.8, 0, 6.283)
      g.fill()
      g.beginPath()
      g.arc(15, 9.2, 1.4, 0, 6.283)
      g.fill()
      g.fillStyle = C['n-sky']
      g.globalAlpha = 0.7
      g.fillRect(-14, -2, 25, 1)
      g.fillRect(17, -2.4, 4, 1.4)
      g.globalAlpha = 1
      if (now % 1000 < 90) glow(0, -5.6, C['l-red'], 1.6, 10)
      g.shadowBlur = 0
      g.restore()
    }

    const draw = (now: number) => {
      if (!W) return
      const X = (x: number) => x * W
      const Y = (y: number) => y * H
      const gy = Y(GY)
      const sky = g.createLinearGradient(0, 0, 0, gy)
      sky.addColorStop(0, C['n-sky'])
      sky.addColorStop(1, C['n-hz'])
      g.fillStyle = sky
      g.fillRect(0, 0, W, gy)
      g.fillStyle = C['n-sky']
      g.fillRect(0, gy, W, H - gy)
      g.fillStyle = C['n-fg']
      for (const s of stars) {
        g.globalAlpha = reduce
          ? 0.5
          : 0.35 + 0.3 * Math.sin(now * 0.0015 + s.ph)
        g.fillRect(s.x * W, s.y * gy, s.s, s.s)
      }
      for (const c of city) {
        g.globalAlpha = 0.5
        g.fillStyle = c.a ? C['l-amber'] : C['n-mute']
        g.fillRect(X(c.x), gy - 2 - Y(c.y), 1.4, 1.4)
      }
      // glide slope guide
      g.globalAlpha = 0.3
      g.strokeStyle = C['n-mute']
      g.setLineDash([3, 6])
      g.beginPath()
      g.moveTo(X(AIM), gy)
      g.lineTo(X(X0 - 0.05), Y(Y0 - ((GY - Y0) * 0.05) / (AIM - X0)))
      g.stroke()
      g.setLineDash([])
      g.globalAlpha = 0.16
      g.fillStyle = C['n-fg']
      g.fillRect(X(R0), gy - 1.5, X(R1 - R0), 3)
      g.globalAlpha = 0.85
      for (let x = AIM - 0.04; x < AIM + 0.1; x += 0.025)
        g.fillRect(X(x), gy - 0.5, Math.max(3, X(0.012)), 1)
      g.globalAlpha = 1
      for (let x = R0; x <= R1 + 1e-6; x += 0.026)
        glow(X(x), gy - 2, C['l-white'], 1.1, 6)
      glow(X(R0), gy - 2, C['l-green'], 1.6, 8)
      glow(X(R1), gy - 2, C['l-red'], 1.6, 8)
      // approach lights with the sequenced flasher running toward the threshold
      const rab = reduce ? -1 : Math.floor(((now % 500) / 500) * 10)
      for (let i = 0; i < 10; i++)
        glow(
          X(R0 - 0.12 + i * 0.012),
          gy - 2,
          i === rab ? C['l-white'] : C['l-amber'],
          i === rab ? 2 : 1,
          i === rab ? 14 : 5
        )
      const w = whites()
      for (let i = 0; i < 4; i++)
        glow(
          X(AIM) - 14 + i * 10,
          gy + 14,
          i < w ? C['l-white'] : C['l-red'],
          3,
          10
        )
      g.shadowBlur = 0
      if (p.y > GY - 0.25 && st !== 'done') {
        const hx = X(Math.min(p.x + 0.07, R1))
        const L = g.createRadialGradient(hx, gy, 2, hx, gy, 60)
        L.addColorStop(0, 'rgba(255,236,200,.4)')
        L.addColorStop(1, 'rgba(255,236,200,0)')
        g.fillStyle = L
        g.fillRect(hx - 70, gy - 30, 140, 40)
      }
      for (const s of p.smoke) {
        g.globalAlpha = s.l * 0.35
        g.fillStyle = C['n-fg']
        g.beginPath()
        g.arc(X(s.x), gy - s.r * 0.6, s.r, 0, 6.283)
        g.fill()
      }
      g.globalAlpha = 1
      const pitch = st === 'fly' ? -Math.atan2(p.vy - 0.12, 0.6) * 0.9 : 0
      plane(X(p.x), Y(p.y) - 10, pitch, now, W < 600 ? 0.8 : 1)
    }

    const loop = (now: number) => {
      raf = 0
      if (!inView) return
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      step(dt)
      draw(now)
      if (st === 'fly' || st === 'roll' || p.smoke.length || !reduce)
        raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (raf || !inView) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    // a press starts a round when idle, steers while flying, and restarts once landed
    const press = () => {
      if (st === 'fly') hold = true
      else start()
    }
    const down = (e: PointerEvent) => {
      e.preventDefault()
      cv.focus({ preventScroll: true })
      press()
    }
    const up = () => {
      hold = false
    }
    const key = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'ArrowUp') return
      if (document.activeElement !== cv && !(st === 'fly' && inView)) return
      e.preventDefault()
      if (!e.repeat || st === 'fly') press()
    }
    const keyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') hold = false
    }
    const size = () => {
      const d = Math.min(2, devicePixelRatio || 1)
      W = cv.clientWidth
      H = cv.clientHeight
      if (!W || !H) return
      cv.width = W * d
      cv.height = H * d
      g.setTransform(d, 0, 0, d, 0, 0)
      draw(performance.now())
    }

    cv.addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    addEventListener('pointercancel', up)
    addEventListener('keydown', key)
    addEventListener('keyup', keyUp)
    const io = new IntersectionObserver((es) => {
      inView = es[0].isIntersecting
      if (inView) kick()
    })
    io.observe(cv)
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    reset()
    idle()
    size()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      cv.removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      removeEventListener('pointercancel', up)
      removeEventListener('keydown', key)
      removeEventListener('keyup', keyUp)
    }
  }, [])

  return (
    <div className={styles.game}>
      <div className={styles.view}>
        <canvas ref={canvas} tabIndex={0} aria-label={t('aria')} />
        <p className={styles.msg} aria-live="polite">
          {msg.title}
          {msg.sub && <span>{msg.sub}</span>}
        </p>
      </div>
      <div className={`${styles.opts} mono`}>
        <span>{t('hold')}</span>
        <span className={styles.papi}>
          <i data-w /> <i data-w /> <i /> <i /> {t('onSlope')}
        </span>
        <span>
          {best === null ? t('noBest') : t('best', { fpm: String(best) })}
        </span>
      </div>
    </div>
  )
}
