import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RichText } from '@/components/content/rich-text'
import { ProjectMock } from '@/components/home/work/project-mock'
import { Locale, locales } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getProject, getProjects } from '@/lib/content'
import { alternatesFor } from '@/lib/default-metadata'

import styles from './case.module.css'

type Params = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects('en')
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  )
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  const p = await getProject(slug, locale)
  if (!p) return {}
  return {
    title: p.name,
    description: p.tldr,
    alternates: alternatesFor(`/projects/${slug}`, locale, ['fr', 'en']),
    openGraph: { title: p.name, description: p.tldr, type: 'article' }
  }
}

export default async function CaseStudy({ params }: Params) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const [p, all] = await Promise.all([
    getProject(slug, locale),
    getProjects(locale)
  ])
  if (!p) notFound()
  const t = await getTranslations('case')
  const work = await getTranslations('work')
  const next = all[(all.findIndex((x) => x.slug === slug) + 1) % all.length]

  return (
    <article className={styles.page}>
      <header className={`${styles.head} wrap`}>
        <Link href="/#travaux" className={`${styles.back} mono`}>
          ← {t('back')}
        </Link>
        <span className="mono dim">
          {p.year} · {work(`kind.${p.kind}`)}
        </span>
        <h1 className={styles.title}>{p.name}</h1>
        <p className={styles.tldr} lang={p.lang}>
          {p.tldr}
        </p>
        <dl className={styles.meta} lang={p.lang}>
          {p.meta.map((m) => (
            <div key={m.label}>
              <dt className="mono dim">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        {p.lang !== locale && (
          <p className={`${styles.langNote} mono dim`}>{t('langNote')}</p>
        )}
      </header>

      <div className={`${styles.cover} wrap`}>
        <ProjectMock kind={p.mock} />
      </div>

      <div className={`${styles.body} wrap`}>
        <RichText value={p.body} lang={p.lang} />
      </div>

      <section className={`${styles.stack} wrap`} aria-labelledby="stack-title">
        <h2 id="stack-title" className="mono dim">
          {t('stack')}
        </h2>
        <div className="chips">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </section>

      {next && next.slug !== slug && (
        <Link href={`/projects/${next.slug}`} className={`${styles.next} wrap`}>
          <span className="mono dim">{t('next')}</span>
          <b>{next.name} →</b>
        </Link>
      )}
    </article>
  )
}
