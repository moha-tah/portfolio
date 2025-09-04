'use server'

import { Locale } from '@/i18n/config'

interface WarningLocaleBannerProps {
  locale: Locale
}

export async function WarningLocaleBanner({
  locale
}: WarningLocaleBannerProps) {
  if (['fr', 'en', 'ar'].includes(locale)) {
    return null
  }

  return (
    <div className="bg-background/90 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto p-1">
        <p className="text-muted-foreground text-center text-sm">
          This language is translated with AI, it may not be 100% accurate.
        </p>
      </div>
    </div>
  )
}
