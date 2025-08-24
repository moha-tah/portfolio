'use client'

import { motion } from 'framer-motion'

interface TimelineLineProps {
  progress: number
}

export function TimelineLine({ progress }: TimelineLineProps) {
  return (
    <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2">
      <div className="bg-secondary absolute inset-0" />

      <motion.div
        className="bg-primary absolute top-0 left-0 w-full"
        initial={{ height: '0%' }}
        animate={{ height: `${progress * 100}%` }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
      />
    </div>
  )
}
