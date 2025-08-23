import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Footer } from '@/components/footer/footer'
import { Navbar } from '@/components/navbar/navbar'
import { ProvidersWrapper } from '@/components/providers/providers-wrapper'
// import { AnimatedThemeToggler } from '@/components/shared/animations/animated-theme-toggler'
import { Background } from '@/components/shared/background'
// import { LanguageSwitcher } from '@/components/shared/language-switcher'
import NoScriptBanner from '@/components/shared/no-script-banner'
// import { ThemeSwitcherV2 } from '@/components/shared/theme-switcher-v2'
import { Locale, locales } from '@/i18n/config'
import { routing } from '@/i18n/routing'

import '../globals.css'

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

export async function generateStaticParams() {
  return locales.map((locale: Locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('shared')

  return {
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    icons: {
      icon: [
        {
          url: '/icons/favicon-light.ico',
          media: '(prefers-color-scheme: light)'
        },
        {
          url: '/icons/favicon-dark.ico',
          media: '(prefers-color-scheme: dark)'
        }
      ]
    }
  }
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
          <Background />

          <Navbar />
          <div className="py-20">{children}</div>
          <Footer />

          {/* Debug dark mode & i18n */}
          <div className="fixed top-5 right-5 z-50 flex flex-row gap-2">
            {/* <ThemeSwitcherV2 /> */}
            {/* <AnimatedThemeToggler /> */}
            {/* <LanguageSwitcher /> */}
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
