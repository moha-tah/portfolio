'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Passion } from './passions'
import { TextShimmer } from '../shared/text-shimmer'

interface Props {
  currentIndex: number
  delay: number
  duration: number
  passions: Passion[]
}

export function AnimatedText({
  currentIndex,
  delay,
  duration,
  passions
}: Props) {
  const t = useTranslations('HomePage.hero')

  return (
    <motion.h1
      className="max-w-2xl text-center text-5xl font-semibold tracking-tighter md:text-7xl"
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay
      }}
    >
      <TextShimmer
        duration={2}
        className="[--base-color:var(--color-primary)] [--base-gradient-color:theme(colors.gray.600/90)] dark:[--base-color:var(--color-primary)]"
      >
        {`${t('MohamedTahiri')},`}
      </TextShimmer>
      <br />
      <span>{t('passionateAbout')}</span>
      <span className="relative flex w-full justify-center overflow-hidden text-center md:pt-1 md:pb-4">
        &nbsp;
        {passions.map((passion: Passion, index: number) => (
          <motion.span
            key={index}
            className={cn('absolute font-bold', passion.color)}
            initial={{ opacity: 0, y: '-100' }}
            transition={{ type: 'spring', stiffness: 50 }}
            animate={
              currentIndex === index
                ? {
                    y: 0,
                    opacity: 1
                  }
                : {
                    y: currentIndex > index ? -150 : 150,
                    opacity: 0
                  }
            }
          >
            {t(`passions.${passion.name}`)}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  )
}
