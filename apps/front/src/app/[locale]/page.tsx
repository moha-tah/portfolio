'use server'

import { AboutMe } from '@/components/about-me/about-me'
import { FAQ } from '@/components/faq/faq'
import { Hero } from '@/components/hero/hero'
import { Skills } from '@/components/skills/skills'
import { Testimonials } from '@/components/testimonials/testimonials'

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 sm:gap-24">
      <Hero />
      <AboutMe />
      <Skills />
      <Testimonials />
      <FAQ />
    </div>
  )
}
