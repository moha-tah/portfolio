'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import DarkVeil from './animations/dark-veil'

export function Background() {
  const { theme, systemTheme } = useTheme()
  const [scrollOpacity, setScrollOpacity] = useState(1)

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isLightMode = currentTheme === 'light'

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = 1000
      const minOpacity = 0.3
      const maxOpacity = 1

      const opacity = Math.max(
        minOpacity,
        maxOpacity - (scrollY / maxScroll) * (maxOpacity - minOpacity)
      )

      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-6xl min-w-screen overflow-visible select-none"
      style={{ opacity: scrollOpacity }}
    >
      <DarkVeil hueShift={isLightMode ? 215 : 33} />
    </div>
  )
}
