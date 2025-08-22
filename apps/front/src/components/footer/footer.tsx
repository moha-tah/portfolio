'use client'

import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useObfuscatedEmail } from '@/hooks/use-obfuscated-email'

import { SocialIcons } from './social-icons'
import { AnimatedBadge } from '../shared/animations/animated-badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const COPY_DURATION_MS = 2000

export function Footer() {
  const t = useTranslations('shared.footer')
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
    <footer className="flex flex-col items-center justify-center gap-8 p-8">
      <Card className="bg-muted/30 border-border/50 w-full max-w-xl rounded-3xl border p-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Contact Badge */}
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
            <p className="text-muted-foreground text-md font-medium">
              {t('contact.subtitle.first')}
            </p>
            <p className="text-muted-foreground text-md font-medium">
              {t('contact.subtitle.second')}
            </p>
          </div>

          {/* Form */}
          <div className="w-sm space-y-3">
            <Input
              placeholder={t('contact.form.namePlaceholder')}
              className="bg-background border-border h-12 rounded-2xl"
            />
            <Input
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              className="bg-background border-border h-12 rounded-2xl"
            />
            <Button className="bg-foreground text-background hover:bg-foreground/90 h-12 w-full rounded-2xl">
              {t('contact.form.sendButton')}
            </Button>
          </div>

          {/* Let's Connect */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <Separator className="max-w-1/2" />
              <h3 className="text-muted-foreground text-lg font-medium">
                {t('contact.or')}
              </h3>
              <Separator className="max-w-1/2" />
            </div>
            <div className="relative flex justify-center">
              <p className="text-foreground text-3xl font-semibold tracking-tighter">
                {email}
              </p>
              <Tooltip>
                <TooltipTrigger
                  className="text-muted-foreground hover:text-foreground hover:bg-muted absolute left-full ml-2 rounded-md p-2 transition-colors"
                  onClick={copyEmail}
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </TooltipTrigger>
                <TooltipContent className="tracking-normal">
                  {copied ? t('contact.copied') : t('contact.copyEmail')}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Social Icons */}
          <SocialIcons email={email} />
        </div>
      </Card>

      {/* Original Badge */}
      <AnimatedBadge
        variant="secondary"
        className="text-muted-foreground shadow-none"
      >
        {t('badge')}
      </AnimatedBadge>
    </footer>
  )
}
