import { Hero } from '@/components/hero/hero'

export default async function Home() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <Hero />
    </div>
  )
}
