'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useId, useState } from 'react'

import { SplitHeading } from '@/components/fx/split-heading'

import styles from './testimonials.module.css'

const PEOPLE = [
  {
    key: 'first',
    avatar: '/images/profile-pictures/julien-g-lopes.webp',
    href: 'https://www.linkedin.com/in/julien-gaspar-lopes-430191b5'
  },
  {
    key: 'third',
    avatar: '/images/profile-pictures/olivier-knell.webp',
    href: 'https://www.linkedin.com/in/olivier-knell-156021a8'
  },
  {
    key: 'second',
    avatar: '/images/profile-pictures/rabie-menad.webp',
    href: 'https://rabie-menad.vercel.app/'
  }
] as const

export function Testimonials() {
  const t = useTranslations('testimonials')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const uid = useId()
  const person = PEOPLE[active]

  return (
    <section
      id="temoignages"
      className="sec wrap"
      aria-labelledby="testimonials-title"
    >
      <div className="eyebrow mono">{t('eyebrow')}</div>
      <SplitHeading
        id="testimonials-title"
        className="h-section"
        lead={t('titleLead')}
        tail={t('titleTail')}
      />
      <div className={styles.box}>
        <div role="tablist" aria-label={t('eyebrow')} className={styles.people}>
          {PEOPLE.map((p, i) => (
            <button
              key={p.key}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${uid}-panel`}
              className={styles.person}
              onClick={() => {
                setActive(i)
                setOpen(false)
              }}
            >
              <Image src={p.avatar} alt="" width={48} height={48} />
              <span>
                <b>{t(`list.${p.key}.author.name`)}</b>
                <span className="mono dim">
                  {t(`list.${p.key}.author.handle`)}
                </span>
              </span>
            </button>
          ))}
        </div>
        <figure
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          className={styles.quote}
          key={person.key}
        >
          <blockquote data-open={open || undefined}>
            <p>
              {t.rich(`list.${person.key}.text`, { newline: () => <br /> })}
            </p>
          </blockquote>
          <figcaption>
            <button
              className="mono"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              {open ? t('less') : t('more')}
            </button>
            <a
              className="mono dim"
              href={person.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('source')} ↗
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
