import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/i18n/config'
import { OG_SIZE, ogCard } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Mohamed Tahiri'

export default async function Image({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  const caption = t.markup('caption0', { b: (chunks) => chunks })
  return ogCard({
    eyebrow: t('steps.route'),
    title: caption,
    footer: 'mohamedtahiri.com'
  })
}
