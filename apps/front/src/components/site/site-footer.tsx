import { getTranslations } from 'next-intl/server'
import { Fragment } from 'react'

import { ContactForm } from './contact/contact-form'
import { ContactLinks } from './contact/contact-links'
import styles from './contact/contact.module.css'
import { FooterBar } from './footer-bar'

export async function SiteFooter() {
  const t = await getTranslations('contact')
  const words = t('title').split(' ')

  return (
    <div className="wrap">
      <section id="contact" className="sec" aria-labelledby="contact-title">
        <div className="eyebrow mono">{t('eyebrow')}</div>
        <h2 id="contact-title" className={styles.big}>
          {/* the space must sit outside the inline-block words or it collapses */}
          {words.map((w, i) => (
            <Fragment key={i}>
              <span>{w}</span>
              {i < words.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h2>
        <div className={styles.row}>
          <ContactLinks />
          <ContactForm />
        </div>
      </section>
      <FooterBar />
    </div>
  )
}
