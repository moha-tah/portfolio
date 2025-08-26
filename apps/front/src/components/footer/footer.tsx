'use client'

import { useTranslations } from 'next-intl'

import { useObfuscatedEmail } from '@/hooks/use-obfuscated-email'
import { SOCIAL_LINKS } from '@/lib/constants'

import { ContactForm } from './contact-form'
import { SocialIcons } from './social-icons'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { CopyButton } from '../shared/copy-button'
import { ShineBorder } from '../shared/shine-border'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'

export function Footer() {
  const t = useTranslations('footer')
  const email = useObfuscatedEmail()

  return (
    <footer id="contact">
      <ScrollAnimatedSection
        className="flex flex-col items-center justify-center gap-20 px-10"
        staggerChildren={0.15}
        delayChildren={0.2}
        duration={0.8}
        y={30}
      >
        <Card className="w-full rounded-3xl p-8 md:w-2xl dark:bg-radial-[at_50%_100%] dark:from-white/10 dark:via-transparent dark:via-70% dark:to-transparent">
          <ShineBorder
            shineColor={[
              'var(--color-secondary)',
              'var(--color-secondary-accent)',
              'var(--color-secondary)'
            ]}
          />
          <div className="flex flex-col items-center space-y-6">
            <AnimatedBadge
              variant="secondary"
              className="from-secondary-accent via-secondary to-secondary bg-radial-[at_0%_0%] text-white"
            >
              {t('contact.badge')}
            </AnimatedBadge>

            {/* Title and Subtitle */}
            <div className="text-center">
              <h2 className="text-foreground pb-4 text-5xl font-bold tracking-tighter sm:text-6xl">
                {t('contact.title')}
                {/* <SparklesText>{t('contact.title')}</SparklesText> */}
              </h2>
              <p className="text-muted-foreground text-md max-w-lg font-medium md:text-lg">
                {t('contact.subtitle.first')}
              </p>
              <p className="text-muted-foreground text-md max-w-lg font-medium md:text-lg">
                {t('contact.subtitle.second')}
              </p>
            </div>

            <ContactForm />

            {/* or + Email */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <Separator className="max-w-16 md:max-w-20" />
                <h3 className="text-muted-foreground text-lg font-medium">
                  {t('contact.or')}
                </h3>
                <Separator className="max-w-16 md:max-w-20" />
              </div>
              <div className="relative flex justify-center">
                <p className="text-foreground text-2xl font-semibold tracking-tighter md:text-3xl">
                  {email}
                </p>
                <CopyButton
                  text={email}
                  copyText={t('contact.copyEmail')}
                  copiedText={t('contact.copied')}
                />
              </div>
            </div>

            <SocialIcons email={email} />
          </div>
        </Card>

        <span className="text-muted-foreground md:text-md pb-4 text-sm">
          {t.rich('badge', {
            linkToMe: (chunks) => (
              <a
                href={SOCIAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:text-foreground font-semibold underline hover:no-underline">
                  {chunks}
                </span>
              </a>
            ),
            linkToCode: (chunks) => (
              <a
                href={`${SOCIAL_LINKS.gitHub}/portfolio`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:text-foreground font-semibold underline hover:no-underline">
                  {chunks}
                </span>
              </a>
            )
          })}
        </span>
      </ScrollAnimatedSection>
    </footer>
  )
}
