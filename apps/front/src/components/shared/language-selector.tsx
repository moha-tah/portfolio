'use client'

import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Locale } from '@/i18n/config'
import { useRouter } from '@/i18n/navigation'

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
]

export function Flag({ code }: { code: string }) {
  return <span className={`fi fi-${code} rounded`}></span>
}

export function LanguageSelector() {
  const locale = useLocale()
  const router = useRouter()

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
        <Button variant="outline" size="default" className="gap-2">
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
