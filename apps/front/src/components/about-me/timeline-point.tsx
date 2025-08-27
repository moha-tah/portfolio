'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface TimelinePointProps {
  isActive: boolean
  progress: number
}

export function TimelinePoint({
  isActive,
  progress: _progress
}: TimelinePointProps) {
  return (
    <motion.div
      className={cn(
        'absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full transition-colors duration-300',
        isActive ? 'base-radial-gradient' : 'bg-muted'
      )}
      animate={{
        scale: isActive ? 1.2 : 1
      }}
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
    />
  )
}
