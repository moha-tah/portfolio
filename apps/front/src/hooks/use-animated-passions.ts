'use client'

import { useEffect, useMemo, useState } from 'react'

import { passionsList } from '@/components/hero/passions'

const PASSION_DURATION = 2000

export function useAnimatedPassions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const passions = useMemo(() => passionsList, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prev) => (prev === passions.length - 1 ? 0 : prev + 1))
    }, PASSION_DURATION)

    return () => clearTimeout(timeoutId)
  }, [currentIndex, passions.length])

  const currentPassion = passions[currentIndex]

  return {
    currentIndex,
    currentPassion,
    passions,
    duration: PASSION_DURATION
  }
}
