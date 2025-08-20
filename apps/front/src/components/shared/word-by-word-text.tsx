'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export function WordByWordText({
  text,
  className = '',
  delay = 0,
  duration = 0.5
}: Props) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    })
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)',
      transition: {
        duration,
        ease: 'easeInOut' as const
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        opacity: { duration },
        filter: { duration }
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-1 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
