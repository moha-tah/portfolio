import { motion } from 'framer-motion'
import { File, PhoneCall } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Passion } from './passions'
import { ButtonShimmer } from '../shared/button-shimmer'
import { Button } from '../ui/button'

function ButtonWrapper({
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
      <div className="group spring-bounce-60 spring-duration-300 relative overflow-hidden rounded-full transition-transform hover:scale-110 hover:-rotate-3 active:scale-95">
        <ButtonShimmer />
        {children}
      </div>
    </motion.div>
  )
}

interface Props {
  currentPassion: Passion
  t: ReturnType<typeof useTranslations>
  delay: number
  duration?: number
}

export function CallToAction({
  currentPassion,
  t,
  delay,
  duration = 0.3
}: Props) {
  return (
    <div className="flex flex-col gap-6 select-none sm:flex-row">
      <ButtonWrapper delay={delay} duration={duration}>
        <Button
          size="xl"
          variant="secondary"
          className="dark:to-background/90 dark:from-muted/90 border border-black/50 bg-gradient-to-b from-white to-gray-300 dark:border-white/50"
        >
          <File className="h-4 w-4" />
          {t('downloadResume')}
        </Button>
      </ButtonWrapper>
      <ButtonWrapper delay={delay + 0.2} duration={duration}>
        <a href="#contact">
          <Button
            size="xl"
            className={cn(
              'w-full border-2 border-white/50 transition-colors duration-500 ease-in-out dark:border-black/50',
              currentPassion.backgroundColor
            )}
          >
            <PhoneCall className="h-4 w-4" />
            {t('contactMe')}
          </Button>
        </a>
      </ButtonWrapper>
    </div>
  )
}
