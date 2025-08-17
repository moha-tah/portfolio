import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { ProvidersWrapper } from '@/components/providers/providers-wrapper'
import { Locale, locales } from '@/i18n/config'
import { routing } from '@/i18n/routing'

import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage')

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon-light.ico', media: '(prefers-color-scheme: light)' },
        { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' }
      ]
    }
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}
