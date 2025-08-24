'use client'

import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Locale, languages } from '@/i18n/config'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function Flag({ code }: { code: string }) {
  return <span className={`fi fi-${code} rounded text-lg`}></span>
}

interface Props {
  className?: string
}

export function LanguageSwitcher({ className }: Props) {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('shared')
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lng) => lng.code === locale)
  if (!currentLanguage) {
    throw new Error(`Language ${locale} not found`)
  }

  const handleLanguageChange = (languageCode: Locale) => {
    router.replace('/', { locale: languageCode })
  }

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="px-0" asChild>
          <Button
            variant="ghost"
            size="default"
            className={cn('gap-2 p-0 has-[>svg]:px-0', className)}
            aria-label={t('languageSwitch')}
          >
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-300',
                isOpen && 'rotate-180'
              )}
            />
            {currentLanguage.flag ? (
              <Flag code={currentLanguage.flag} />
            ) : (
              <span className="text-lg font-bold tracking-wider">
                {currentLanguage.code.toUpperCase()}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[120px]">
          {languages.map((lng) => (
            <DropdownMenuItem
              key={lng.code}
              onClick={() => handleLanguageChange(lng.code)}
              className="cursor-pointer gap-3"
              disabled={lng.code === locale}
            >
              {lng.flag ? (
                <Flag code={lng.flag} />
              ) : (
                <span className="text-md font-bold tracking-wider">
                  {lng.code.toUpperCase()}
                </span>
              )}

              <span className="text-md font-medium tracking-normal">
                {lng.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
