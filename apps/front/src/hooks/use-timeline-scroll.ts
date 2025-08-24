'use client'

import { useEffect, useRef, useState } from 'react'

import type { TimelinePointState } from '@/types/timeline'

interface UseTimelineScrollOptions {
  stepCount: number
}

export function useTimelineScroll({ stepCount }: UseTimelineScrollOptions) {
  const [points, setPoints] = useState<TimelinePointState[]>([])
  const [lineProgress, setLineProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const pointRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setPoints(
      Array.from({ length: stepCount }, (_, index) => ({
        id: index,
        isActive: false,
        progress: 0
      }))
    )
    pointRefs.current = Array.from({ length: stepCount }, () => null)
  }, [stepCount])

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2

      setPoints((prevPoints) =>
        prevPoints.map((point, index) => {
          const pointElement = pointRefs.current[index]
          if (!pointElement) {
            return point
          }

          const rect = pointElement.getBoundingClientRect()
          const pointCenter = rect.top + rect.height / 2
          const distanceFromCenter = pointCenter - viewportCenter

          const isActive = pointCenter <= viewportCenter
          const progress = Math.max(
            0,
            Math.min(1, 1 - distanceFromCenter / viewportHeight)
          )

          return {
            ...point,
            isActive,
            progress
          }
        })
      )

      const timelineRect = timelineRef.current.getBoundingClientRect()
      const timelineTop = timelineRect.top
      const timelineHeight = timelineRect.height

      if (timelineTop <= viewportCenter) {
        const visibleFromTop = Math.max(0, viewportCenter - timelineTop)
        const progressPercentage = Math.min(1, visibleFromTop / timelineHeight)
        setLineProgress(progressPercentage)
      } else {
        setLineProgress(0)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const setPointRef = (index: number) => (element: HTMLDivElement | null) => {
    pointRefs.current[index] = element
  }

  return {
    points,
    lineProgress,
    timelineRef,
    setPointRef
  }
}
