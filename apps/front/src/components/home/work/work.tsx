import { getTranslations } from 'next-intl/server'

import { SplitHeading } from '@/components/fx/split-heading'
import type { Locale } from '@/i18n/config'
import { Link } from '@/i18n/navigation'
import { getProjects } from '@/lib/content'

import { ProjectMock } from './project-mock'
import { StackDepth } from './stack-depth'
import styles from './work.module.css'

export async function Work({ locale }: { locale: Locale }) {
  const t = await getTranslations('work')
  const tags = await getTranslations('tags')
  const projects = await getProjects(locale)

  return (
    <section id="travaux" className="sec wrap" aria-labelledby="work-title">
      <div className={styles.head}>
        <div>
          <div className="eyebrow mono">{t('eyebrow')}</div>
          <SplitHeading
            id="work-title"
            className="h-section"
            lead={t('titleLead')}
            tail={t('titleTail')}
          />
        </div>
        <p className="mono dim">{t('count', { count: projects.length })}</p>
      </div>
      <StackDepth>
        <ol className={styles.list}>
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className={styles.item}
              style={{ '--i': i } as React.CSSProperties}
            >
              <Link href={`/projects/${p.slug}`} className={styles.card}>
                <ProjectMock kind={p.mock} />
                <div className={styles.body}>
                  <span className="mono dim">
                    {p.year} · {t(`kind.${p.kind}`)}
                  </span>
                  <h3 className={styles.title}>{p.name}</h3>
                  <p className={styles.desc}>{p.summary}</p>
                  <div className={`${styles.meta} mono`}>
                    {p.tags.map((k) => (
                      <span key={k}>{tags(k)}</span>
                    ))}
                    <span className={styles.go}>
                      {t('read')} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </StackDepth>
    </section>
  )
}
