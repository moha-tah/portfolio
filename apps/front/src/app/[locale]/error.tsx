'use client'

import { AlertTriangle, ArrowUpRight, RotateCcw } from 'lucide-react'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { AnimatedBadge } from '@/components/shared/animations/animated-badge'
import { AnimatedButton } from '@/components/shared/animations/animated-button'
import { TextAnimate } from '@/components/shared/animations/text-animate'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { env } from '@/lib/env'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('error')

  return {
    title: t('title'),
    description: t('description')
  }
}

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('error')

  return (
    <div className="flex flex-col items-center justify-center gap-12 sm:gap-24">
      <section className="w-full">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center gap-8 px-6 pb-28 sm:py-20 lg:py-32">
            <AnimatedBadge>
              <AlertTriangle className="text-destructive h-5 w-5" />
              <span className="text-destructive font-mono text-lg">ERROR</span>
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
              {env.NODE_ENV === 'local' && (
                <details className="mt-4 text-left">
                  <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
                    {t('technicalDetails')}
                  </summary>
                  <pre className="bg-muted text-muted-foreground mt-2 overflow-x-auto rounded-md p-4 text-xs">
                    {error.message}
                    {error.digest && `\nDigest: ${error.digest}`}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <AnimatedButton delay={1.0} duration={0.5}>
                <Button
                  onClick={reset}
                  size="xl"
                  variant="outline"
                  className="border-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t('tryAgain')}
                </Button>
              </AnimatedButton>
              <AnimatedButton delay={1.2} duration={0.5}>
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
        </div>
      </section>
    </div>
  )
}
