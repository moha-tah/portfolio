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
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
          </span>
          {t('available')}
        </div>
      </Button>
    </div>
  )
}
