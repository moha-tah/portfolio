'use client'

import { useEffect, useRef } from 'react'

export type SkillGroup = {
  key: 'ai' | 'web' | 'infra' | 'data' | 'motion' | 'os'
  label: string
  items: string[]
}

type Node = {
  x: number
  y: number
  bx: number
  by: number
  r: number
  label: string
  k: SkillGroup['key']
  g: number
  hub: boolean
  ph: number
}

// a few honest cross-links between families
const LINKS: [string, string][] = [
  ['Python', 'RAG'],
  ['Claude', 'Remotion'],
  ['Docker', 'Agents'],
  ['NestJS', 'PyPI'],
  ['SQL', 'Évals'],
  ['SQL', 'Evals']
]

/** Interactive skill graph: AI in the middle, the other families around it. Hover a node to light its family. */
export function Constellation({
  groups,
  label
}: {
  groups: SkillGroup[]
  label: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const x = cv?.getContext('2d')
    if (!cv || !x) return
    const css = getComputedStyle(document.documentElement)
    const col: Record<string, string> = Object.fromEntries(
      ['ai', 'web', 'infra', 'data', 'motion', 'os'].map((k) => [
        k,
        css.getPropertyValue(`--c-${k}`).trim()
      ])
    )
    const fg = css.getPropertyValue('--fg').trim()
    const mute = css.getPropertyValue('--mute').trim()
    const line = css.getPropertyValue('--line').trim()
    const display =
      css.getPropertyValue('--font-bricolage').trim() || 'sans-serif'
    const mono = css.getPropertyValue('--font-martian').trim() || 'monospace'
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const rtl = document.documentElement.dir === 'rtl'

    let W = 0
    let H = 0
    let nodes: Node[] = []
    let edges: [number, number][] = []
    let raf = 0
    let visible = false
    let px = -999
    let py = -999

    const layout = () => {
      nodes = []
      edges = []
      const cx = W / 2
      const cy = H / 2
      const ring = Math.min(W, H) * 0.34
      const wide = W > H ? 1.35 : 1
      groups.forEach((grp, gi) => {
        const a = -Math.PI / 2 + ((gi - 1) * Math.PI * 2) / (groups.length - 1)
        const gx =
          gi === 0 ? cx : cx + Math.cos(a) * ring * wide * (rtl ? -1 : 1)
        const gy = gi === 0 ? cy : cy + Math.sin(a) * ring
        const hub =
          nodes.push({
            x: gx,
            y: gy,
            bx: gx,
            by: gy,
            r: gi === 0 ? 9 : 6,
            label: grp.label,
            k: grp.key,
            g: gi,
            hub: true,
            ph: 0
          }) - 1
        if (gi) edges.push([0, hub])
        grp.items.forEach((s, j) => {
          const b = (j / grp.items.length) * Math.PI * 2 + gi
          const rr = (gi === 0 ? 0.42 : 0.2) * ring + ((j * 37) % 18)
          const nx = gx + Math.cos(b) * rr
          const ny = gy + Math.sin(b) * rr
          const n =
            nodes.push({
              x: nx,
              y: ny,
              bx: nx,
              by: ny,
              r: 3.6,
              label: s,
              k: grp.key,
              g: gi,
              hub: false,
              ph: j * 1.7 + gi
            }) - 1
          edges.push([hub, n])
        })
      })
      const find = (l: string) => nodes.findIndex((n) => n.label === l)
      LINKS.forEach(([a, b]) => {
        const i = find(a)
        const j = find(b)
        if (i >= 0 && j >= 0) edges.push([i, j])
      })
    }

    const size = () => {
      const d = Math.min(2, devicePixelRatio || 1)
      W = cv.clientWidth
      H = cv.clientHeight
      if (!W) return
      cv.width = W * d
      cv.height = H * d
      x.setTransform(d, 0, 0, d, 0, 0)
      layout()
      draw(performance.now())
    }

    const draw = (now: number) => {
      x.clearRect(0, 0, W, H)
      const t = now / 1000
      let hov = -1
      let best = 28
      nodes.forEach((n, i) => {
        if (!n.hub && !reduce) {
          n.x = n.bx + Math.sin(t * 0.6 + n.ph) * 5
          n.y = n.by + Math.cos(t * 0.5 + n.ph) * 5
        }
        const d = Math.hypot(n.x - px, n.y - py)
        if (d < best) {
          best = d
          hov = i
        }
      })
      const hg = hov >= 0 ? nodes[hov].g : -1
      cv.style.cursor = hov >= 0 ? 'pointer' : 'default'
      edges.forEach(([a, b]) => {
        const A = nodes[a]
        const B = nodes[b]
        const lit = hg >= 0 && (A.g === hg || B.g === hg)
        x.strokeStyle = lit ? col[B.k] : line
        x.globalAlpha = lit ? 0.7 : 1
        x.lineWidth = lit ? 1.2 : 1
        x.beginPath()
        x.moveTo(A.x, A.y)
        x.lineTo(B.x, B.y)
        x.stroke()
      })
      nodes.forEach((n) => {
        const lit = hg < 0 || n.g === hg
        x.globalAlpha = lit ? 1 : 0.3
        x.fillStyle = col[n.k]
        x.shadowColor = col[n.k]
        x.shadowBlur = n.hub ? 18 : 8
        x.beginPath()
        x.arc(n.x, n.y, n.r, 0, 6.283)
        x.fill()
        x.shadowBlur = 0
        x.fillStyle = n.hub ? fg : mute
        x.font = n.hub
          ? `600 ${W < 600 ? 14 : 17}px ${display}`
          : `400 ${W < 600 ? 10 : 11}px ${mono}`
        x.textAlign = 'center'
        if (n.hub || W > 600 || hg === n.g)
          x.fillText(
            n.hub ? n.label : n.label.toUpperCase(),
            n.x,
            n.y - n.r - 8
          )
      })
      x.globalAlpha = 1
    }

    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      draw(now)
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame)
    }
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      px = e.clientX - r.left
      py = e.clientY - r.top
      if (reduce) draw(performance.now())
    }
    const leave = () => {
      px = py = -999
      if (reduce) draw(performance.now())
    }

    cv.addEventListener('pointermove', move)
    cv.addEventListener('pointerleave', leave)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      kick()
    })
    io.observe(cv)
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      cv.removeEventListener('pointermove', move)
      cv.removeEventListener('pointerleave', leave)
    }
  }, [groups])

  return <canvas ref={ref} role="img" aria-label={label} />
}
