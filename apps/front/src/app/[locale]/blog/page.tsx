import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PostCard } from '@/components/blog/post-card'
import { SplitHeading } from '@/components/fx/split-heading'
import type { Locale } from '@/i18n/config'
import { getPosts } from '@/lib/content'
import { alternatesFor } from '@/lib/default-metadata'

import styles from './blog.module.css'

type Params = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
    alternates: alternatesFor('/blog', locale)
  }
}

export default async function BlogIndex({ params }: Params) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')
  const posts = await getPosts(locale)
  const [first, ...rest] = posts

  return (
    <section className={`${styles.page} wrap`} aria-labelledby="blog-title">
      <div className="eyebrow mono">{t('eyebrow')}</div>
      <SplitHeading
        as="h1"
        id="blog-title"
        className={styles.title}
        lead={t('titleLead')}
        tail={t('titleTail')}
      />
      <p className={styles.intro}>{t('intro')}</p>
      {locale !== 'fr' && locale !== 'en' && (
        <p className="mono dim">{t('langNote')}</p>
      )}
      {first ? (
        <div className={styles.list}>
          <PostCard post={first} featured />
          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mono dim">{t('empty')}</p>
      )}
    </section>
  )
}
