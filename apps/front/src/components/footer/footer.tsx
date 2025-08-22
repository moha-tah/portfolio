'use client'

import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useObfuscatedEmail } from '@/hooks/use-obfuscated-email'
import { SOCIAL_LINKS } from '@/lib/constants'

import { ContactForm } from './contact-form'
import { SocialIcons } from './social-icons'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const COPY_DURATION_MS = 2000

export function Footer() {
  const t = useTranslations('footer')
  const email = useObfuscatedEmail()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, COPY_DURATION_MS)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <ScrollAnimatedSection
      className="flex flex-col items-center justify-center gap-8 p-4"
      staggerChildren={0.15}
      delayChildren={0.2}
      duration={0.8}
      y={30}
    >
      <Card className="bg-muted/30 border-border/50 w-full max-w-xl rounded-3xl border p-8">
        <div className="flex flex-col items-center space-y-6">
          <AnimatedBadge
            variant="secondary"
            className="bg-foreground text-background"
          >
            {t('contact.badge')}
          </AnimatedBadge>

          {/* Title and Subtitle */}
          <div className="space-y-4 text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tighter md:text-5xl">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-md max-w-sm font-medium">
              {t('contact.subtitle.first')}
            </p>
            <p className="text-muted-foreground text-md max-w-sm font-medium">
              {t('contact.subtitle.second')}
            </p>
          </div>

          <ContactForm />

          {/* or + Email */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <Separator className="max-w-1/3 md:max-w-1/2" />
              <h3 className="text-muted-foreground text-lg font-medium">
                {t('contact.or')}
              </h3>
              <Separator className="max-w-1/3 md:max-w-1/2" />
            </div>
            <div className="relative flex justify-center">
              <p className="text-foreground text-2xl font-semibold tracking-tighter md:text-3xl">
                {email}
              </p>
              <Tooltip>
                <TooltipTrigger
                  className="text-muted-foreground hover:text-foreground hover:bg-muted absolute left-full ml-1 rounded-md p-2 transition-colors md:ml-2"
                  onClick={copyEmail}
                >
                  {copied ? (
                    <Check className="size-4 md:size-5" />
                  ) : (
                    <Copy className="size-4 md:size-5" />
                  )}
                </TooltipTrigger>
                <TooltipContent className="tracking-normal">
                  {copied ? t('contact.copied') : t('contact.copyEmail')}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <SocialIcons email={email} />
        </div>
      </Card>

      <span className="text-muted-foreground text-md">
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
  )
}
