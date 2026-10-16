import { useTranslations } from 'next-intl'

import type { MockKind } from '@/content/projects'

import styles from './project-mock.module.css'

/** Small product mock-ups. Barfield work is confidential, so these stand in for screenshots. */
export function ProjectMock({ kind }: { kind: MockKind }) {
  const t = useTranslations('mocks')

  return (
    <div className={styles.vis} aria-hidden="true">
      <div className={styles.mk}>
        <span className={styles.bar}>{t(`${kind}.bar`)}</span>
        {kind === 'chat' && (
          <>
            <div className={styles.q}>{t('chat.q')}</div>
            <div className={styles.trace}>
              <span>
                <b>search_history</b> · {t('chat.t1')}
              </span>
              <span>
                <b>check_recurrence</b> · {t('chat.t2')}
              </span>
              <span>
                <b>search_docs</b> · {t('chat.t3')}
              </span>
            </div>
            <div className={styles.a}>
              {t('chat.a1')} <i>Int. 213</i>
              <i>Int. 377</i>. {t('chat.a2')} <i>Doc. §4</i>
            </div>
          </>
        )}
        {kind === 'dash' && (
          <>
            <div className={styles.kpis}>
              <div>
                <b>7</b>
                <span>{t('dash.k1')}</span>
              </div>
              <div>
                <b>117</b>
                <span>{t('dash.k2')}</span>
              </div>
              <div>
                <b>1</b>
                <span>{t('dash.k3')}</span>
              </div>
            </div>
            <svg viewBox="0 0 300 70" className={styles.spark}>
              <path
                d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 30 L180 34 L210 20 L240 24 L270 12 L300 14 L300 70 L0 70Z"
                fill="var(--c-data)"
                opacity=".12"
              />
              <path
                d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 30 L180 34 L210 20 L240 24 L270 12 L300 14"
                fill="none"
                stroke="var(--c-data)"
                strokeWidth="2"
              />
            </svg>
            <div className={styles.list}>
              <div>
                <span>{t('dash.l1')}</span>
                <i style={{ '--k': 'var(--c-data)' } as React.CSSProperties}>
                  {t('dash.done')}
                </i>
              </div>
              <div>
                <span>{t('dash.l2')}</span>
                <i style={{ '--k': 'var(--accent)' } as React.CSSProperties}>
                  {t('dash.pending')}
                </i>
              </div>
            </div>
          </>
        )}
        {kind === 'video' && (
          <>
            <div className={styles.frame}>
              <span>{t('video.scene')}</span>
              <b>{t('video.title')}</b>
            </div>
            <div className={styles.tl}>
              <div
                style={
                  { '--k': 'var(--c-ai)', width: '92%' } as React.CSSProperties
                }
              />
              <div
                style={
                  {
                    '--k': 'var(--c-motion)',
                    width: '70%'
                  } as React.CSSProperties
                }
              />
              <div
                style={
                  {
                    '--k': 'var(--c-infra)',
                    width: '84%'
                  } as React.CSSProperties
                }
              />
            </div>
          </>
        )}
        {kind === 'search' && (
          <>
            <div className={styles.search}>{t('search.q')}</div>
            <div className={styles.map}>
              <i style={{ left: '22%', top: '30%' }} />
              <i style={{ left: '58%', top: '52%' }} />
              <i style={{ left: '74%', top: '24%' }} />
              <i style={{ left: '40%', top: '72%' }} />
            </div>
          </>
        )}
        {kind === 'packages' && (
          <div className={styles.pkg}>
            <div>
              <b>{t('packages.py')}</b>
              <span>PyPI</span>
            </div>
            <div>
              <b>{t('packages.ts')}</b>
              <span>npm</span>
            </div>
            <div>
              <b>Home Assistant</b>
              <span>{t('packages.ha')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
