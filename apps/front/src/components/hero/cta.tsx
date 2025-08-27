import { motion } from 'framer-motion'
import { File, PhoneCall } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

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
      <div className="shadow-custom group spring-bounce-60 spring-duration-300 relative overflow-hidden rounded-full bg-transparent transition-transform hover:scale-110 hover:-rotate-3 active:scale-95">
        <ButtonShimmer />
        {children}
      </div>
    </motion.div>
  )
}

interface Props {
  t: ReturnType<typeof useTranslations>
  delay: number
  duration?: number
}

export function CallToAction({ t, delay, duration = 0.3 }: Props) {
  return (
    <div className="flex flex-col gap-6 select-none sm:flex-row">
      <ButtonWrapper delay={delay} duration={duration}>
        <Button
          size="xl"
          className="from-primary via-primary to-muted-foreground/50 dark:to-muted/40 border-muted-foreground/50 dark:border-muted/70 border-2 bg-radial-[at_100%_100%]"
        >
          <File className="h-4 w-4" />
          {t('downloadResume')}
        </Button>
      </ButtonWrapper>
      <ButtonWrapper delay={delay + 0.2} duration={duration}>
        <Link href="#contact">
          <Button
            size="xl"
            className={cn(
              'border-secondary-accent from-secondary via-secondary to-secondary-accent w-full border-2 bg-radial-[at_100%_100%] text-white transition-colors duration-500 ease-in-out'
            )}
          >
            <PhoneCall className="h-4 w-4" />
            {t('contactMe')}
          </Button>
        </Link>
      </ButtonWrapper>
    </div>
  )
}
