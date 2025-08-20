export const locales = ['en', 'fr'] as const // + 'de', 'ja', 'ko', 'ar'
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
