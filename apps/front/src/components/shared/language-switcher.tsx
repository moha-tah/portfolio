'use client'

import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
  return <span className={`fi fi-${code} rounded`}></span>
}

interface Props {
  className?: string
}

export function LanguageSwitcher({ className }: Props) {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations('shared')

  const currentLanguage = languages.find((lang) => lang.code === locale)
  if (!currentLanguage) {
    throw new Error(`Language ${locale} not found`)
  }

  const handleLanguageChange = (languageCode: Locale) => {
    router.replace('/', { locale: languageCode })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className={cn('gap-2', className)}
          aria-label={t('languageSwitch')}
        >
          <Flag code={currentLanguage.flag} />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="cursor-pointer gap-2"
            disabled={language.code === locale}
          >
            <Flag code={language.flag} />
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
