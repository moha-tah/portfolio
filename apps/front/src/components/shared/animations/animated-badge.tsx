'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { Badge } from '../../ui/badge'
import { ButtonShimmer } from '../button-shimmer'

interface Props {
  variant?: 'default' | 'secondary'
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function AnimatedBadge({
  variant = 'default',
  className,
  delay = 0.1,
  duration = 0.6,
  children
}: Props) {
  return (
    <motion.div
      className="mx-auto w-fit"
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        ease: 'easeOut' as const,
        delay
      }}
    >
      <Badge
        variant={variant}
        className={cn(
          'shadow-custom h-8 cursor-default gap-1.5 rounded-4xl px-3 text-sm transition-colors duration-200',
          className
        )}
      >
        <div className="group relative flex items-center gap-2">
          <ButtonShimmer className="h-16 w-6" />
          {children}
        </div>
      </Badge>
    </motion.div>
  )
}
