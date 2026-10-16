'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { SOCIAL_LINKS } from '@/lib/constants'

import styles from './contact/contact.module.css'

const LandingGame = dynamic(
  () => import('./landing-game').then((m) => m.LandingGame),
  { ssr: false }
)

export function FooterBar() {
  const t = useTranslations('footer')
  const [game, setGame] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  return (
    <>
      {game && (
        <div id="landing-game" ref={box} style={{ paddingBottom: 24 }}>
          <LandingGame />
        </div>
      )}
      <footer className={`${styles.foot} mono`}>
        <span>{t('rights', { year: String(new Date().getFullYear()) })}</span>
        <button
          aria-expanded={game}
          aria-controls="landing-game"
          onClick={() => {
            setGame((g) => !g)
            requestAnimationFrame(() =>
              box.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              })
            )
          }}
        >
          {game ? t('gameClose') : t('game')}
        </button>
        <div className={styles.footLinks}>
          <a
            href={`${SOCIAL_LINKS.gitHub}/portfolio`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('source')}
          </a>
          <a href="#main">{t('top')}</a>
        </div>
      </footer>
    </>
  )
}
