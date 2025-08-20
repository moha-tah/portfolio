import { useTranslations } from 'next-intl'

import { Button } from '../ui/button'

export function Label() {
  const t = useTranslations('HomePage.hero')

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        className="gap-4 shadow-none"
        tabIndex={-1}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          {t('openToProposals')}
        </div>
      </Button>
    </div>
  )
}
