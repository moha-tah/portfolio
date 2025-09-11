'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExpandableTextProps {
  text: React.ReactNode
  maxHeight?: number
  className?: string
  textSize?: string
}

export function ExpandableText({
  text,
  maxHeight = 120,
  className,
  textSize = 'text-base'
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)
  const [actualHeight, setActualHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const t = useTranslations('shared')

  const measureHeight = useCallback(() => {
    if (!contentRef.current) return

    const element = contentRef.current

    // Store current styles
    const originalHeight = element.style.height
    const originalOverflow = element.style.overflow

    // Temporarily remove height constraints to measure actual content
    element.style.height = 'auto'
    element.style.overflow = 'visible'

    // Force reflow and measure
    const scrollHeight = element.scrollHeight

    // Restore original styles
    element.style.height = originalHeight
    element.style.overflow = originalOverflow

    // Update state
    setActualHeight(scrollHeight)
    setNeedsExpansion(scrollHeight > maxHeight)
  }, [maxHeight])

  useLayoutEffect(() => {
    measureHeight()
  }, [measureHeight, text])

  useEffect(() => {
    const handleResize = () => {
      // Reset expansion state and remeasure
      setIsExpanded(false)
      // Small delay to let layout settle
      setTimeout(measureHeight, 50)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [measureHeight])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative">
      <motion.div
        ref={contentRef}
        initial={false}
        animate={{
          height: isExpanded
            ? actualHeight || 'auto'
            : needsExpansion
              ? maxHeight
              : 'auto'
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="overflow-hidden"
      >
        <p className={cn('font-medium', textSize, className)}>{text}</p>
      </motion.div>

      {needsExpansion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpanded}
            className="text-muted-foreground hover:text-foreground h-auto p-1 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown className="size-3" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isExpanded ? 'close' : 'read-more'}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.1,
                    ease: 'easeInOut'
                  }}
                >
                  {isExpanded ? t('close') : t('readMore')}
                </motion.span>
              </AnimatePresence>
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
