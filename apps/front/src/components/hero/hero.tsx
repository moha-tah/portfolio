'use client'

import { useLocale, useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { AnimatedTitle } from './animated-title'
import { CallToAction } from './cta'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { TextAnimate } from '../shared/animations/text-animate'

export function Hero() {
  const t = useTranslations('HomePage.hero')
  const locale = useLocale()

  const amIAvailable = false

  return (
    <section id="hero" className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 px-6 pb-28 sm:py-20 lg:py-32">
          <AnimatedBadge>
            <span className="relative flex size-2">
              <span
                className={cn(
                  'absolute inline-flex size-2 animate-ping rounded-full opacity-75',
                  amIAvailable ? 'bg-green-400' : 'bg-red-400'
                )}
              ></span>
              <span
                className={cn(
                  'relative inline-flex size-2 rounded-full',
                  amIAvailable ? 'bg-green-500' : 'bg-red-500'
                )}
              ></span>
            </span>
            {amIAvailable ? t('available') : t('notAvailable')}
          </AnimatedBadge>
          <div className="flex flex-col gap-4">
            <AnimatedTitle delay={0.2} duration={0.5} />
            <TextAnimate
              delay={0.5}
              duration={0.5}
              className="subtitle"
              animation="blurInUp"
              by="word"
              once
            >
              {t('readyToJoin')}
            </TextAnimate>
          </div>
          <CallToAction t={t} locale={locale} delay={1.5} duration={0.5} />
        </div>
      </div>
    </section>
  )
}
