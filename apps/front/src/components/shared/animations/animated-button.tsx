import { motion } from 'framer-motion'

import { ButtonShimmer } from '../button-shimmer'

export function AnimatedButton({
  children,
  delay,
  duration
}: {
  children: React.ReactNode
  delay: number
  duration: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay
      }}
    >
      <div className="shadow-custom group spring-bounce-60 spring-duration-300 relative overflow-hidden rounded-full bg-transparent transition-transform hover:scale-110 hover:-rotate-3 active:scale-95">
        <ButtonShimmer />
        {children}
      </div>
    </motion.div>
  )
}
