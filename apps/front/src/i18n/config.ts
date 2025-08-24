export const locales = ['en', 'fr', 'de', 'ja', 'ko', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const languages: { code: Locale; name: string; flag?: string }[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'fr',
    name: 'Français',
    flag: 'fr'
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: 'de'
  },
  {
    code: 'ko',
    name: '한국어',
    flag: 'kr'
  },
  {
    code: 'ja',
    name: '日本語',
    flag: 'jp'
  },
  {
    code: 'ar',
    name: 'العربية'
  }
]
