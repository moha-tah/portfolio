'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcherV2 = ({ className }: ThemeSwitcherProps) => {
  const t = useTranslations('shared.modeToggle')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const themes: {
    key: 'light' | 'dark' | 'system'
    icon: React.ElementType
    label: string
  }[] = [
    {
      key: 'system',
      icon: Monitor,
      label: t('system')
    },
    {
      key: 'light',
      icon: Sun,
      label: t('light')
    },
    {
      key: 'dark',
      icon: Moon,
      label: t('dark')
    }
  ]

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        'bg-background ring-border relative flex h-8 rounded-full p-1 ring-1',
        className
      )}
    >
      <TooltipProvider>
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = theme === key

          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="relative h-6 w-6 rounded-full hover:scale-110"
                  onClick={() => setTheme(key)}
                  aria-label={label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTheme"
                      className="bg-secondary absolute inset-0 rounded-full"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <Icon
                    className={cn(
                      'relative m-auto h-4 w-4',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          )
        })}
      </TooltipProvider>
    </div>
  )
}
