import { setRequestLocale } from 'next-intl/server'

import { Hero } from '@/components/home/hero/hero'
import { Manifesto } from '@/components/home/manifesto'
import { Notes } from '@/components/home/notes'
import { Path } from '@/components/home/path/path'
import { Skills } from '@/components/home/skills/skills'
import { Testimonials } from '@/components/home/testimonials/testimonials'
import { Work } from '@/components/home/work/work'
import type { Locale } from '@/i18n/config'

export default async function Home({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Manifesto />
      <Work locale={locale} />
      <Skills />
      <Path />
      <Testimonials />
      <Notes locale={locale} />
    </>
  )
}
