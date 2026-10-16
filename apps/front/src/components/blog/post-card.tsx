import { useFormatter, useTranslations } from 'next-intl'

import type { PostCategory } from '@/content/posts'
import { Link } from '@/i18n/navigation'
import type { PostCard as Post } from '@/lib/content'

import styles from './post-card.module.css'

const HUE: Record<PostCategory, string> = {
  ai: 'var(--c-ai)',
  product: 'var(--c-web)',
  infra: 'var(--c-infra)',
  data: 'var(--c-data)',
  motion: 'var(--c-motion)'
}

/** Article card with a generated cover: the same slug always gets the same light. */
export function PostCard({
  post,
  featured
}: {
  post: Post
  featured?: boolean
}) {
  const t = useTranslations('blog')
  const format = useFormatter()
  const angle = [...post.slug].reduce(
    (a, c) => (a * 31 + c.charCodeAt(0)) % 360,
    7
  )

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.card}
      data-featured={featured || undefined}
    >
      <div className={styles.cover} aria-hidden="true">
        <i
          style={
            {
              '--k': HUE[post.category],
              '--a': `${angle}deg`
            } as React.CSSProperties
          }
        />
        <span className={styles.grid} />
      </div>
      <div className={styles.body}>
        <div className={`${styles.meta} mono dim`}>
          <span>{t(`categories.${post.category}`)}</span>
          <span>
            <time dateTime={post.publishedAt}>
              {format.dateTime(new Date(post.publishedAt), {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
            {' · '}
            {t('minutes', { count: post.minutes })}
          </span>
        </div>
        <h3>{post.title}</h3>
        {featured && <p>{post.excerpt}</p>}
      </div>
    </Link>
  )
}
