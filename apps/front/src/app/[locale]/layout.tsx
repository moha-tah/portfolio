import '../globals.css'

import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Martian_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { SmoothScroll } from '@/components/site/smooth-scroll'
import { Locale, locales } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { getDefaultMetadata } from '@/lib/default-metadata'
import { ProvidersWrapper } from '@/lib/providers/providers-wrapper'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap'
})

const martian = Martian_Mono({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-martian',
  display: 'swap'
})

export const viewport: Viewport = {
  themeColor: '#07080b',
  colorScheme: 'dark'
}

export function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return getDefaultMetadata(locale)
}

const RTL: Locale[] = ['ar']

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('nav')

  return (
    <html
      lang={locale}
      dir={RTL.includes(locale) ? 'rtl' : 'ltr'}
      className={`${bricolage.variable} ${martian.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ProvidersWrapper>
          <SmoothScroll>
            <a href="#main" className="sr-only">
              {t('skip')}
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </SmoothScroll>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
