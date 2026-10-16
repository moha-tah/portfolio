'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './split-heading.module.css'

type Props = {
  /** Plain words, then the muted tail rendered in <em>. */
  lead: string
  tail?: string
  id?: string
  className?: string
  as?: 'h2' | 'h1'
}

/** Section title whose words lift into place when it scrolls into view. Readable at rest. */
export function SplitHeading({
  lead,
  tail,
  id,
  className,
  as: Tag = 'h2'
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let i = 0
  // Japanese runs words together, so no space goes between the lead and the muted tail
  const gap = /[぀-ヿ一-龯]$/.test(lead) ? '' : ' '
  const words = (text: string, last = ' ') =>
    text
      .split(' ')
      .filter(Boolean)
      .map((w, n, all) => (
        <span
          key={i}
          className={styles.w}
          style={{ transitionDelay: `${i++ * 45}ms` }}
        >
          {w}
          {n < all.length - 1 ? ' ' : last}
        </span>
      ))

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${className ?? ''} ${styles.split}`}
      data-in={seen || undefined}
    >
      {words(lead, tail ? gap : '')}
      {tail && <em>{words(tail, '')}</em>}
    </Tag>
  )
}
