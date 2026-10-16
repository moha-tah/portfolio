import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/i18n/config'
import { getProject } from '@/lib/content'
import { OG_SIZE, ogCard } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Case study'

export default async function Image({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const [p, t] = await Promise.all([
    getProject(slug, locale),
    getTranslations({ locale, namespace: 'work' })
  ])
  return ogCard({
    eyebrow: p ? `${p.year} · ${t(`kind.${p.kind}`)}` : 'Mohamed Tahiri',
    title: p?.name ?? 'Mohamed Tahiri',
    footer: t('read')
  })
}
