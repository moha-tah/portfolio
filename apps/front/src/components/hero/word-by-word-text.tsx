'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
}

export function WordByWordText({ text, className = '', delay = 0 }: Props) {
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
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
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
