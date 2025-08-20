'use client'

import { useTranslations } from 'next-intl'

import { useAnimatedPassions } from '@/hooks/use-animated-passions'

import { AnimatedText } from './animated-text'
import { CallToAction } from './cta'
import { HeroBadge } from './hero-badge'
import { WordByWordText } from '../shared/word-by-word-text'

export function Hero() {
  const { currentIndex, currentPassion, passions } = useAnimatedPassions()
  const t = useTranslations('HomePage.hero')

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 px-12 py-20 lg:py-40">
          <HeroBadge />
          <div className="flex flex-col gap-4">
            <AnimatedText
              currentIndex={currentIndex}
              delay={0.2}
              duration={0.5}
              passions={passions}
            />
            <WordByWordText
              text={t('readyToJoin')}
              className="text-muted-foreground max-w-2xl text-center text-lg leading-relaxed tracking-tight md:text-xl"
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
    </div>
  )
}
