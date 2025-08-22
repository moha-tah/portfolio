'use client'

import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'

type props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme, systemTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const changeTheme = async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark')
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  }

  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        'transition-transform duration-300 hover:scale-110 hover:rotate-12',
        className
      )}
      aria-label={'theme.toggle'}
    >
      {currentTheme === 'dark' ? <SunDim /> : <Moon />}
    </button>
  )
}
