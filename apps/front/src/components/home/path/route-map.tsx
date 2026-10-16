'use client'

import { useEffect, useRef } from 'react'

import { type LonLat, PLACES, greatCircle, isLandSmooth } from '@/lib/geo/land'

type Props = {
  /** Which leg of the path is in focus: 0 Compiègne, 1 Paris, 2 Miami. */
  at: number
  places: { compiegne: string; paris: string; miami: string }
  label: string
}

const grid = (l: number, r: number, b: number, t: number, g: number) => {
  const out: LonLat[] = []
  for (let la = t; la > b; la -= g)
    for (let lo = l; lo < r; lo += g)
      if (isLandSmooth(lo, la)) out.push([lo, la])
  return out
}

/**
 * Dotted map with a camera: tight on Compiègne and Paris (70 km apart), then pulling out over
 * the Atlantic while the Paris → Miami arc draws itself.
 */
export function RouteMap({ at, places, label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const atRef = useRef(at)
  atRef.current = at
  const kick = useRef<() => void>(() => {})

  useEffect(() => {
    const cv = ref.current
    const x = cv?.getContext('2d')
    if (!cv || !x) return
    const css = getComputedStyle(document.documentElement)
    const acc = css.getPropertyValue('--accent').trim()
    const fg = css.getPropertyValue('--fg').trim()
    const mute = css.getPropertyValue('--mute').trim()
    const mono = css.getPropertyValue('--font-martian').trim() || 'monospace'
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    // two dot layers: a fine one for the zoomed-in France view, a coarse one for the whole Atlantic
    const coarse = grid(-104, 24, 2, 68, 1.1)
    const fine = grid(-10, 15, 42, 56.5, 0.14)
    const arc = greatCircle(PLACES.paris, PLACES.miami, 80)

    let W = 0
    let H = 0
    let raf = 0
    let visible = false
    const cam = { cx: 2.7, cy: 49.25, span: 11 }
    let hop = 0

    const view = (i: number) =>
      i === 0
        ? { cx: 2.7, cy: 49.25, span: 11 }
        : i === 1
          ? { cx: 2.45, cy: 49.05, span: 10 }
          : { cx: -42, cy: 36, span: Math.max(118, (64 * W) / Math.max(1, H)) }

    const ss = (a: number, b: number, v: number) => {
      const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
      return t * t * (3 - 2 * t)
    }

    const size = () => {
      const d = Math.min(2, devicePixelRatio || 1)
      W = cv.clientWidth
      H = cv.clientHeight
      if (!W) return
      cv.width = W * d
      cv.height = H * d
      x.setTransform(d, 0, 0, d, 0, 0)
      start()
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible || !W) return
      const at = atRef.current
      const tv = view(at)
      const k = reduce ? 1 : 0.055
      cam.cx += (tv.cx - cam.cx) * k
      cam.cy += (tv.cy - cam.cy) * k
      cam.span = Math.exp(
        Math.log(cam.span) + (Math.log(tv.span) - Math.log(cam.span)) * k
      )
      hop += ((at >= 1 ? 1 : 0) - hop) * (reduce ? 1 : 0.08)
      const s = W / cam.span
      const P = ([lo, la]: LonLat): [number, number] => [
        W / 2 + (lo - cam.cx) * s,
        H / 2 - (la - cam.cy) * s
      ]
      // 0 when zoomed on France, 1 when the whole Atlantic is in view
      const zt = Math.min(
        1,
        Math.max(
          0,
          (Math.log(cam.span) - Math.log(10)) /
            (Math.log(view(2).span) - Math.log(10))
        )
      )

      x.clearRect(0, 0, W, H)
      x.fillStyle = mute
      const layer = (pts: LonLat[], g: number, alpha: number) => {
        if (alpha < 0.02) return
        const r = Math.min(2.4, Math.max(0.8, g * s * 0.42))
        x.globalAlpha = alpha
        for (const q of pts) {
          const [a, b] = P(q)
          if (a > -4 && a < W + 4 && b > -4 && b < H + 4)
            x.fillRect(a - r / 2, b - r / 2, r, r)
        }
      }
      layer(fine, 0.14, 0.7 * (1 - ss(0.05, 0.45, zt)))
      layer(coarse, 1.1, 0.7 * ss(0.15, 0.6, zt))
      x.globalAlpha = 1

      if (hop > 0.01) {
        const a = P(PLACES.compiegne)
        const b = P(PLACES.paris)
        x.strokeStyle = acc
        x.globalAlpha = 1 - zt
        x.setLineDash([4, 5])
        x.lineWidth = 1.4
        x.beginPath()
        x.moveTo(...a)
        x.lineTo(a[0] + (b[0] - a[0]) * hop, a[1] + (b[1] - a[1]) * hop)
        x.stroke()
        x.setLineDash([])
        x.globalAlpha = 1
      }

      const ap = at === 2 ? ss(0.2, 0.95, zt) : 0
      if (ap > 0.01) {
        const pts = arc.map(P)
        const n = Math.max(1, Math.round(ap * (pts.length - 1)))
        x.strokeStyle = acc
        x.lineWidth = 1.6
        x.shadowColor = acc
        x.shadowBlur = 10
        x.beginPath()
        x.moveTo(...pts[0])
        for (let i = 1; i <= n; i++) x.lineTo(...pts[i])
        x.stroke()
        x.shadowBlur = 0
        const a = pts[Math.min(n, pts.length - 2)]
        const b = pts[Math.min(n + 1, pts.length - 1)]
        x.save()
        x.translate(...pts[n])
        x.rotate(Math.atan2(b[1] - a[1], b[0] - a[0]))
        x.fillStyle = fg
        x.beginPath()
        x.moveTo(8, 0)
        x.lineTo(-6, -6)
        x.lineTo(-3, 0)
        x.lineTo(-6, 6)
        x.closePath()
        x.fill()
        x.restore()
      }

      const marks: [LonLat, string, number, number][] = [
        [PLACES.compiegne, places.compiegne, 0, 1 - ss(0.2, 0.5, zt)],
        [PLACES.paris, places.paris, 1, 1],
        [PLACES.miami, places.miami, 2, 1]
      ]
      for (const [ll, name, i, vis] of marks) {
        if (vis < 0.02) continue
        const [a, b] = P(ll)
        if (a < -40 || a > W + 40 || b < -40 || b > H + 40) continue
        const lit = at === i
        x.globalAlpha = vis * (lit ? 1 : 0.65)
        x.fillStyle = lit ? acc : fg
        x.beginPath()
        x.arc(a, b, lit ? 4 : 3, 0, 6.283)
        x.fill()
        if (lit) {
          x.strokeStyle = acc
          x.lineWidth = 1
          x.beginPath()
          x.arc(a, b, 10 + (reduce ? 0 : Math.sin(now * 0.004) * 2), 0, 6.283)
          x.stroke()
        }
        x.font = `500 11px ${mono}`
        x.textAlign = 'left'
        x.fillText(name.toUpperCase(), a + 14, b + (i === 1 ? 16 : -8))
        x.globalAlpha = 1
      }
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame)
    }
    kick.current = start

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      start()
    })
    io.observe(cv)
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [places])

  useEffect(() => kick.current(), [at])

  return <canvas ref={ref} role="img" aria-label={label} />
}
