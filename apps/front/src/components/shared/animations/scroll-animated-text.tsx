'use client'

import { motion } from 'framer-motion'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface ScrollAnimatedTextProps {
  title: string
  description: string
  delay?: number
  duration?: number
}

export function ScrollAnimatedText({
  title,
  description,
  delay = 0.2,
  duration = 0.5
}: ScrollAnimatedTextProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.h2
        className="text-4xl font-medium lg:text-5xl"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.p className="subtitle" variants={itemVariants}>
        {description}
      </motion.p>
    </motion.div>
  )
}
