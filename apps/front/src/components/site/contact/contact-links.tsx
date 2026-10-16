'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Magnetic } from '@/components/fx/magnetic'
import { useObfuscatedEmail } from '@/hooks/use-obfuscated-email'
import { SOCIAL_LINKS } from '@/lib/constants'

import styles from './contact.module.css'
import { useMiamiTime } from '../use-miami-time'

export function ContactLinks() {
  const t = useTranslations('contact')
  const email = useObfuscatedEmail()
  const time = useMiamiTime()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard refused: the address stays selectable on the page
    }
  }

  return (
    <div className={styles.links}>
      {/* the address is decoded on the client so it never sits in the static HTML */}
      <a
        className={styles.mail}
        href={email ? `mailto:${email}` : undefined}
        suppressHydrationWarning
      >
        {email || ' '}
      </a>
      <p className="mono dim" suppressHydrationWarning>
        {t('localTime', { time: time ?? '--:--' })}
      </p>
      <div className={styles.acts}>
        <Magnetic>
          <button className="btn btn-pri" onClick={copy} disabled={!email}>
            {copied ? t('copied') : t('copy')}
          </button>
        </Magnetic>
        <Magnetic>
          <a
            className="btn"
            href={SOCIAL_LINKS.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </Magnetic>
        <Magnetic>
          <a
            className="btn"
            href={SOCIAL_LINKS.gitHub}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
