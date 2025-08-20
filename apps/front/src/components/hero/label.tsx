import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Button } from '../ui/button'

interface LabelProps {
  delay?: number
  duration?: number
}

export function Label({ delay = 0.1, duration = 0.6 }: LabelProps) {
  const t = useTranslations('HomePage.hero')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        ease: 'easeOut' as const,
        delay
      }}
    >
      <Button
        variant="secondary"
        size="sm"
        className="gap-4 shadow-none"
        tabIndex={-1}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
          </span>
          {t('available')}
        </div>
      </Button>
    </motion.div>
  )
}
