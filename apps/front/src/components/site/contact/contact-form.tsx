'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Turnstile } from 'next-turnstile'
import { useEffect, useId, useState } from 'react'

import { useContactForm } from '@/hooks/use-contact-form'
import { env } from '@/lib/env'

import styles from './contact.module.css'

type Field = 'name' | 'email' | 'company' | 'message'

const AUTOCOMPLETE: Record<Field, string> = {
  name: 'name',
  email: 'email',
  company: 'organization',
  message: 'off'
}

export function ContactForm() {
  const t = useTranslations('contact.form')
  const locale = useLocale()
  const uid = useId()
  const { form, onSubmit, isLoading, isSuccess, isError, error, reset } =
    useContactForm()
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const [captchaStarted, setCaptchaStarted] = useState(false)

  useEffect(() => {
    if (!isError) return
    const id = setTimeout(reset, 3500)
    return () => clearTimeout(id)
  }, [isError, reset])

  // the widget (and Cloudflare's script) only mounts once someone starts typing, so it never weighs on page load
  const startCaptcha = () => setCaptchaStarted(true)

  const disabled = isLoading || isSuccess || isError || !!captchaError
  const errors = form.formState.errors
  const rateLimited =
    error instanceof Error && error.message === 'Rate limit exceeded'

  const label = isLoading
    ? t('sendingButton')
    : isSuccess
      ? t('successMessage')
      : isError
        ? rateLimited
          ? t('rateLimitMessage')
          : t('errorMessage')
        : t('sendButton')

  const field = (name: Field, type = 'text') => {
    const id = `${uid}-${name}`
    const err = errors[name]?.message
    const common = {
      id,
      ...form.register(name),
      autoComplete: AUTOCOMPLETE[name],
      placeholder: ' ',
      disabled,
      onFocus: startCaptcha,
      'aria-invalid': !!err || undefined,
      'aria-describedby': err ? `${id}-err` : undefined
    }
    return (
      <div className={styles.field} data-wide={name === 'message' || undefined}>
        {name === 'message' ? (
          <textarea rows={3} {...common} />
        ) : (
          <input type={type} {...common} />
        )}
        <label htmlFor={id}>{t(`${name}Label`)}</label>
        {err && (
          <span id={`${id}-err`} className={styles.err}>
            {err}
          </span>
        )}
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <p className="mono dim">{t('title')}</p>
      <div className={styles.grid}>
        {field('name')}
        {field('email', 'email')}
        {field('company')}
        {field('message')}
      </div>
      <div
        className={styles.captcha}
        data-started={captchaStarted || undefined}
      >
        {captchaStarted && (
          <Turnstile
            id="contact-turnstile"
            siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            onVerify={(token) => {
              setCaptchaError(null)
              form.setValue('turnstileToken', token)
            }}
            onError={() => {
              setCaptchaError(t('turnstileError'))
              form.setValue('turnstileToken', '')
            }}
            language={locale}
            execution="render"
            theme="dark"
          />
        )}
        {captchaError && <p className={styles.err}>{captchaError}</p>}
      </div>
      <button
        type="submit"
        className={styles.send}
        disabled={disabled}
        data-state={isSuccess ? 'ok' : isError ? 'ko' : undefined}
      >
        <span>{label}</span>
        <i aria-hidden="true">→</i>
      </button>
    </form>
  )
}
