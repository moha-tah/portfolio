'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'

import { AnimatedTitle } from './animated-title'
import { CallToAction } from './cta'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { TextAnimate } from '../shared/animations/text-animate'

export function Hero() {
  const t = useTranslations('HomePage.hero')
  const locale = useLocale()

  return (
    <section id="hero" className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 px-6 pb-28 sm:py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src="/images/logos/lvmh.png"
              alt="LVMH logo"
              width={200}
              height={200}
              className="dark:invert"
            />
          </motion.div>
          <AnimatedBadge>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
            </span>
            {t('available')}
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
