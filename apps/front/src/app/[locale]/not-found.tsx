import { getTranslations } from 'next-intl/server'

import { StatusPage } from '@/components/site/status-page'
import { Link } from '@/i18n/navigation'

export async function generateMetadata() {
  const t = await getTranslations('notFound')
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false }
  }
}

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <StatusPage code="404" title={t('title')} text={t('description')}>
      <Link href="/" className="btn btn-pri">
        {t('goHome')} <span aria-hidden="true">→</span>
      </Link>
    </StatusPage>
  )
}
