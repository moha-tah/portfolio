'use client'

import { useEffect, useRef } from 'react'

/** As each sticky card gets covered by the next one, it shrinks and dims a little, like a deck. */
export function StackDepth({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = [...root.querySelectorAll<HTMLElement>('li')]
    let queued = false
    const update = () => {
      queued = false
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        const a = card.getBoundingClientRect()
        const b = next.getBoundingClientRect()
        // 0 while the next card is still below, 1 once it fully covers this one
        const covered = Math.min(
          1,
          Math.max(0, 1 - (b.top - a.top) / Math.max(1, a.height))
        )
        const inner = card.firstElementChild as HTMLElement | null
        if (!inner) return
        inner.style.transform = `scale(${1 - covered * 0.05})`
        inner.style.filter = `brightness(${1 - covered * 0.35})`
      })
    }
    const onScroll = () => {
      if (!queued) {
        queued = true
        requestAnimationFrame(update)
      }
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
