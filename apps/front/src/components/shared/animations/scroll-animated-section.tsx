'use client'

import { motion } from 'framer-motion'

import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface ScrollAnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  blur?: number
  staggerChildren?: number
  delayChildren?: number
  id?: string
}

export function ScrollAnimatedSection({
  children,
  className,
  id,
  delay = 0,
  duration = 0.6,
  y = 20,
  blur = 4,
  staggerChildren,
  delayChildren
}: ScrollAnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const containerVariants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren: delayChildren || delay
          }
        }
      }
    : undefined

  const itemVariants = {
    hidden: {
      opacity: 0,
      y,
      filter: `blur(${blur}px)`
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: 'easeOut' as const,
        delay: staggerChildren ? 0 : delay
      }
    }
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants || itemVariants}
    >
      {staggerChildren ? (
        Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )
      ) : (
        children
      )}
    </motion.section>
  )
}
