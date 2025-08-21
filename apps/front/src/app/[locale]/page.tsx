'use server'

import { Hero } from '@/components/hero/hero'
import { Testimonials } from '@/components/testimonials/testimonials'

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <Testimonials />
    </div>
  )
}
