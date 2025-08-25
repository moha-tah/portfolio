import { Viewport } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import { METADATA_KEYWORDS } from '@/lib/constants'
import { env } from '@/lib/env'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00FF00' },
    { media: '(prefers-color-scheme: dark)', color: '#FF0000' }
  ]
}

export async function getDefaultMetadata() {
  const t = await getTranslations('shared')
  const locale = await getLocale()

  const baseUrl = env.NEXT_PUBLIC_FRONT_URL
  const title = t('defaultTitle')
  const description = t('defaultDescription')

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: METADATA_KEYWORDS,
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
      siteName: title,
      locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/metadatas/og-preview-${locale === 'fr' ? 'fr' : 'en'}.jpg`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `${baseUrl}/images/metadatas/twitter-preview-${locale === 'fr' ? 'fr' : 'en'}.jpg`
      ]
    }
  }
}
