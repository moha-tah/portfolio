'use client'

import { useTranslations } from 'next-intl'

import { useAnimatedPassions } from '@/hooks/use-animated-passions'

import { AnimatedText } from './animated-text'
import { CallToAction } from './cta'
import { Label } from './label'

export function Hero() {
  const { currentIndex, currentPassion, passions } = useAnimatedPassions()
  const t = useTranslations('HomePage.hero')

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <Label />
          <div className="flex flex-col gap-4">
            <AnimatedText currentIndex={currentIndex} passions={passions} />
            <p className="text-muted-foreground max-w-2xl text-center text-lg leading-relaxed tracking-tight md:text-xl">
              {t('readyToJoin')}
            </p>
          </div>
          <CallToAction currentPassion={currentPassion} t={t} />
        </div>
      </div>
    </div>
  )
}
