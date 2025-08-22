'use server'

import { getTranslations } from 'next-intl/server'

import { Locale, locales } from '@/i18n/config'

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }))
}

export default async function NoScriptBanner() {
  const t = await getTranslations('shared.noScriptBanner')

  return (
    <noscript>
      <div className="bg-background/90 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto p-4">
          <p className="text-muted-foreground text-center text-lg font-bold">
            {t('message')}
          </p>
        </div>
      </div>
    </noscript>
  )
}
