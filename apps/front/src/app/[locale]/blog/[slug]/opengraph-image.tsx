import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/i18n/config'
import { getPost } from '@/lib/content'
import { OG_SIZE, ogCard } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Article'

export default async function Image({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const [post, t] = await Promise.all([
    getPost(slug, locale),
    getTranslations({ locale, namespace: 'blog' })
  ])
  return ogCard({
    eyebrow: post
      ? `${t('eyebrow')} · ${t(`categories.${post.category}`)}`
      : t('eyebrow'),
    title: post?.title ?? 'Mohamed Tahiri',
    footer: post ? t('minutes', { count: post.minutes }) : ''
  })
}
