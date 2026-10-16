'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { StatusPage } from '@/components/site/status-page'
import { Link } from '@/i18n/navigation'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage code="500" title={t('title')} text={t('description')}>
      <button className="btn btn-pri" onClick={reset}>
        {t('tryAgain')}
      </button>
      <Link href="/" className="btn">
        {t('goHome')}
      </Link>
    </StatusPage>
  )
}
