'use server'

import { Hero } from '@/components/hero/hero'
import { Skills } from '@/components/skills/skills'
import { Testimonials } from '@/components/testimonials/testimonials'

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <Testimonials />
      <Skills />
    </div>
  )
}
