'use client'

import { useEffect, useRef, useState } from 'react'

interface UseViewportIntersectionOptions {
  threshold?: number
  rootMargin?: string
}

export function useViewportIntersection({
  threshold = 0.5,
  rootMargin = '-10% 0px -25% 0px'
}: UseViewportIntersectionOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return { ref, isIntersecting }
}
