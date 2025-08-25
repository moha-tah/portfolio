import '../globals.css'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'

import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import { ScrollProgress } from '@/components/navbar/scroll-progress'
import { ProvidersWrapper } from '@/components/providers/providers-wrapper'
import { Background } from '@/components/shared/background'
import NoScriptBanner from '@/components/shared/no-script-banner'
import { Locale, locales } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { getDefaultMetadata } from '@/lib/default-metadata'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap'
})

export const viewport: Viewport = {
  themeColor: 'var(--color-background)'
}

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  return await getDefaultMetadata()
}

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary selection:text-background relative antialiased`}
      >
        <ProvidersWrapper>
          <NoScriptBanner />
          <ScrollProgress />
          <Background />
          <Navbar />
          <div className="py-12 sm:py-24">{children}</div>
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  )
}
