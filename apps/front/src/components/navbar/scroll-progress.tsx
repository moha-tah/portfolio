'use client'

import { MotionProps, motion, useScroll } from 'motion/react'
import React from 'react'

import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        'from-secondary via-secondary-accent to-secondary fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r',
        className
      )}
      style={{
        scaleX: scrollYProgress
      }}
      {...props}
    />
  )
})

ScrollProgress.displayName = 'ScrollProgress'
