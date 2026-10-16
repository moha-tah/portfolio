import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Locale, locales } from '@/i18n/config'
import { METADATA_KEYWORDS } from '@/lib/constants'
import { env } from '@/lib/env'

/** Canonical + hreflang alternates for a path that exists in every locale. */
export function alternatesFor(
  path: string,
  locale: Locale,
  only: readonly Locale[] = locales
) {
  const base = env.NEXT_PUBLIC_FRONT_URL
  return {
    canonical: `${base}/${locale}${path}`,
    languages: Object.fromEntries(only.map((l) => [l, `${base}/${l}${path}`]))
  }
}

export async function getDefaultMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  const title = t('title')
  const description = t('description')

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_FRONT_URL),
    title: { default: title, template: `%s · ${title}` },
    description,
    keywords: METADATA_KEYWORDS,
    alternates: alternatesFor('', locale),
    icons: {
      icon: [
        {
          url: '/icons/favicon-light.ico',
          media: '(prefers-color-scheme: light)'
        },
        {
          url: '/icons/favicon-dark.ico',
          media: '(prefers-color-scheme: dark)'
        }
      ]
    },
    openGraph: {
      title,
      description,
      siteName: 'Mohamed Tahiri',
      locale,
      type: 'website'
    },
    twitter: { card: 'summary_large_image', title, description }
  }
}
