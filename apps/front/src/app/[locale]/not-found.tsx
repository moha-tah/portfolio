'use client'

import { ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { AnimatedBadge } from '@/components/shared/animations/animated-badge'
import { AnimatedButton } from '@/components/shared/animations/animated-button'
import { TextAnimate } from '@/components/shared/animations/text-animate'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound')

  return {
    title: t('title'),
    description: t('description')
  }
}

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="flex flex-col items-center justify-center gap-12 sm:gap-24">
      <section className="w-full">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center gap-8 px-6 pb-28 sm:py-20 lg:py-32">
            <AnimatedBadge>
              <span className="font-mono text-lg">404</span>
            </AnimatedBadge>
            <div className="flex flex-col gap-4 text-center">
              <TextAnimate
                delay={0.2}
                duration={0.5}
                className="text-4xl font-bold tracking-tight sm:text-6xl"
                animation="blurInUp"
                by="word"
                once
              >
                {t('title')}
              </TextAnimate>
              <TextAnimate
                delay={0.5}
                duration={0.5}
                className="subtitle max-w-[600px]"
                animation="blurInUp"
                by="word"
                once
              >
                {t('description')}
              </TextAnimate>
            </div>
            <AnimatedButton delay={1.0} duration={0.5}>
              <Link href="/">
                <Button
                  size="xl"
                  className="from-primary via-primary to-muted-foreground/50 dark:to-muted/40 border-muted-foreground/50 dark:border-muted/70 border-2 bg-radial-[at_100%_100%]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  {t('goHome')}
                </Button>
              </Link>
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
