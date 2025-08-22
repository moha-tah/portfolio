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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Locale } from '@/i18n/config'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const languages: { code: Locale; name: string; flag: string }[] = [
  {
    code: 'en',
    name: 'English',
    flag: 'gb'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: 'fr'
  }
  // {
  //   code: 'de',
  //   name: 'Deutsch',
  //   flag: 'de'
  // },
  // {
  //   code: 'ja',
  //   name: '日本語',
  //   flag: 'jp'
  // },
  // {
  //   code: 'ar',
  //   name: 'العربية',
  //   flag: 'ae'
  // },
  // {
  //   code: 'ko',
  //   name: '한국어',
  //   flag: 'kr'
  // }
]

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

  const currentLanguage = languages.find((lang) => lang.code === locale)
  if (!currentLanguage) {
    throw new Error(`Language ${locale} not found`)
  }

  const handleLanguageChange = (languageCode: Locale) => {
    router.replace('/', { locale: languageCode })
  }

  const dropdownMenu = (
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
            <Flag code={currentLanguage.flag} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[120px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="cursor-pointer gap-3"
              disabled={language.code === locale}
            >
              <Flag code={language.flag} />
              <span className="text-md font-medium tracking-normal">
                {language.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div>
      <div className="hidden sm:block">
        <Tooltip>
          <TooltipTrigger asChild>{dropdownMenu}</TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="rounded-full text-sm"
          >
            {t('languageSwitch')}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="block sm:hidden">{dropdownMenu}</div>
    </div>
  )
}
