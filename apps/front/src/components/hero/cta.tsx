import { File, PhoneCall } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Passion } from './passions'
import { Button } from '../ui/button'

interface CallToActionProps {
  currentPassion: Passion
  t: ReturnType<typeof useTranslations>
}

function ButtonShimmer() {
  return (
    <div className="absolute -top-1/2 -left-14 h-[140px] w-10 -rotate-45 bg-gradient-to-r from-white/10 via-white/50 to-white/10 blur-sm delay-200 duration-500 group-hover:left-[150%]" />
  )
}

export function CallToAction({ currentPassion, t }: CallToActionProps) {
  return (
    <div className="flex flex-row gap-6">
      <div className="group spring-bounce-60 spring-duration-300 relative overflow-hidden rounded-full transition-transform hover:scale-110 hover:-rotate-3">
        <ButtonShimmer />
        <Button
          size="xl"
          variant="secondary"
          className="dark:to-background/90 dark:from-muted/90 border border-black/50 bg-gradient-to-b from-white to-gray-300 dark:border-white/50"
        >
          <File className="h-4 w-4" />
          {t('downloadResume')}
        </Button>
      </div>
      <div className="group spring-bounce-60 spring-duration-300 relative overflow-hidden rounded-full transition-transform hover:scale-110 hover:-rotate-3">
        <ButtonShimmer />
        <Button
          size="xl"
          className={cn(
            'border-2 border-white/50 transition-colors duration-500 ease-in-out dark:border-black/50',
            currentPassion.backgroundColor
          )}
        >
          <PhoneCall className="h-4 w-4" />
          {t('contactMe')}
        </Button>
      </div>
    </div>
  )
}
