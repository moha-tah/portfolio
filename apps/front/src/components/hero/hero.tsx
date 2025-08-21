'use client'

import { useTranslations } from 'next-intl'

import { useAnimatedPassions } from '@/hooks/use-animated-passions'

import { AnimatedText } from './animated-text'
import { CallToAction } from './cta'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { WordByWordText } from '../shared/animations/word-by-word-text'

export function Hero() {
  const { currentIndex, currentPassion, passions } = useAnimatedPassions()
  const t = useTranslations('HomePage.hero')

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 px-12 py-20 lg:py-40">
          <AnimatedBadge>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            {t('available')}
          </AnimatedBadge>
          <div className="flex flex-col gap-4">
            <AnimatedText
              currentIndex={currentIndex}
              delay={0.2}
              duration={0.5}
              passions={passions}
            />
            <WordByWordText
              text={t('readyToJoin')}
              className="subtitle"
              delay={0.5}
              duration={0.5}
            />
          </div>
          <CallToAction
            currentPassion={currentPassion}
            t={t}
            delay={1.5}
            duration={0.5}
          />
        </div>
      </div>
    </section>
  )
}
