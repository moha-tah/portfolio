import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getFormatter,
  getTranslations,
  setRequestLocale
} from 'next-intl/server'

import {
  ReadingProgress,
  ShareButton,
  Toc
} from '@/components/blog/article-chrome'
import { PostCard } from '@/components/blog/post-card'
import { RichText, headingsOf } from '@/components/content/rich-text'
import { Locale, locales } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getPost, getPosts } from '@/lib/content'
import { alternatesFor } from '@/lib/default-metadata'

import styles from './article.module.css'

type Params = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts('en')
  return locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(`/blog/${slug}`, locale, ['fr', 'en']),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Mohamed Tahiri']
    }
  }
}

export default async function Article({ params }: Params) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [post, all] = await Promise.all([
    getPost(slug, locale),
    getPosts(locale)
  ])
  if (!post) notFound()
  const t = await getTranslations('blog')
  const format = await getFormatter()
  const others = all.filter((p) => p.slug !== slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: post.lang,
    author: {
      '@type': 'Person',
      name: 'Mohamed Tahiri',
      url: 'https://mohamedtahiri.com'
    }
  }

  return (
    <article id="article" className={styles.page}>
      <ReadingProgress target="article" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={`${styles.head} wrap`}>
        <Link href="/blog" className={`${styles.back} mono`}>
          ← {t('back')}
        </Link>
        <div className={`${styles.meta} mono dim`}>
          <span>{t(`categories.${post.category}`)}</span>
          <time dateTime={post.publishedAt}>
            {format.dateTime(new Date(post.publishedAt), {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          <span>{t('minutes', { count: post.minutes })}</span>
        </div>
        <h1 className={styles.title} lang={post.lang}>
          {post.title}
        </h1>
        <p className={styles.lead} lang={post.lang}>
          {post.excerpt}
        </p>
        <div className={styles.byline}>
          <span className={styles.avatar} aria-hidden="true">
            MT
          </span>
          <span>
            <b>Mohamed Tahiri</b>
            <span className="mono dim">{t('role')}</span>
          </span>
          <ShareButton />
        </div>
        {post.lang !== locale && (
          <p className={`${styles.langNote} mono dim`}>{t('langNote')}</p>
        )}
      </header>

      <div className={`${styles.body} wrap`}>
        <aside className={styles.side}>
          <Toc items={headingsOf(post.body)} />
        </aside>
        <RichText value={post.body} lang={post.lang} />
      </div>

      <footer className={`${styles.end} wrap`}>
        <div className={styles.endRow}>
          <p className="mono dim">{t('thanks')}</p>
          <ShareButton />
        </div>
        {others.length > 0 && (
          <div className={styles.more}>
            <p className="mono dim">{t('next')}</p>
            <div className={styles.moreGrid}>
              {others.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  )
}
