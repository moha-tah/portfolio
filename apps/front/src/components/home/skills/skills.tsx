import { getTranslations } from 'next-intl/server'

import { SplitHeading } from '@/components/fx/split-heading'

import { Constellation, type SkillGroup } from './constellation'
import styles from './skills.module.css'

export async function Skills() {
  const t = await getTranslations('skills')

  const groups: SkillGroup[] = [
    {
      key: 'ai',
      label: t('groups.ai'),
      items: ['Agents', 'RAG', t('evals'), 'Claude', 'Rerank', 'Embeddings']
    },
    {
      key: 'web',
      label: t('groups.web'),
      items: ['Next.js', 'React', 'NestJS', t('nativeApps')]
    },
    {
      key: 'infra',
      label: t('groups.infra'),
      items: ['Terraform', 'AWS', 'GCP', 'Docker', 'CI/CD']
    },
    {
      key: 'data',
      label: t('groups.data'),
      items: ['Python', 'SQL', 'Airflow', 'DuckDB']
    },
    { key: 'motion', label: t('groups.motion'), items: ['Remotion', t('tts')] },
    {
      key: 'os',
      label: t('groups.os'),
      items: ['PyPI', 'npm', 'Home Assistant']
    }
  ]

  return (
    <section
      id="competences"
      className="sec wrap"
      aria-labelledby="skills-title"
    >
      <div className="eyebrow mono">{t('eyebrow')}</div>
      <SplitHeading
        id="skills-title"
        className="h-section"
        lead={t('titleLead')}
        tail={t('titleTail')}
      />
      <div className={styles.box}>
        <Constellation groups={groups} label={t('aria')} />
        <ul className={`${styles.legend} mono`}>
          {groups.map((g) => (
            <li
              key={g.key}
              style={{ '--k': `var(--c-${g.key})` } as React.CSSProperties}
            >
              {g.label}
            </li>
          ))}
        </ul>
        <p className={`${styles.hint} mono dim`}>{t('hint')}</p>
      </div>
    </section>
  )
}
