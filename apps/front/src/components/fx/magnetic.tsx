'use client'

import { useEffect, useRef } from 'react'

/** Pulls its child slightly toward the pointer. Inert on touch screens. */
export function Magnetic({
  children,
  strength = 0.25
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(hover: none)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * strength
      const y = (e.clientY - r.top - r.height / 2) * strength * 1.3
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        transition: 'transform 0.5s var(--ease)',
        willChange: 'transform'
      }}
    >
      {children}
    </span>
  )
}
