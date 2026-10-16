import { getTranslations } from 'next-intl/server'

import { PostCard } from '@/components/blog/post-card'
import { SplitHeading } from '@/components/fx/split-heading'
import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getPosts } from '@/lib/content'

import styles from './notes.module.css'

export async function Notes({ locale }: { locale: Locale }) {
  const t = await getTranslations('notes')
  const posts = (await getPosts(locale)).slice(0, 3)
  if (!posts.length) return null
  const [first, ...rest] = posts

  return (
    <section id="blog" className="sec wrap" aria-labelledby="notes-title">
      <div className={styles.head}>
        <div>
          <div className="eyebrow mono">{t('eyebrow')}</div>
          <SplitHeading
            id="notes-title"
            className="h-section"
            lead={t('titleLead')}
            tail={t('titleTail')}
          />
        </div>
        <Link href="/blog" className="btn">
          {t('all')} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={styles.list}>
        <PostCard post={first} featured />
        {rest.length > 0 && (
          <div className={styles.rest}>
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
