import { useTranslations } from 'next-intl'

import { AnimatedTestimonialsGrid } from './animated-testimonials-grid'
import { getTestimonials } from './get-testimonials'
import { ScrollAnimatedBadge } from '../shared/animations/scroll-animated-badge'
import { ScrollAnimatedText } from '../shared/animations/scroll-animated-text'

export function Testimonials() {
  const t = useTranslations('HomePage.testimonials')

  const testimonials = getTestimonials(t)

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <ScrollAnimatedBadge delay={0.1}>Testimonials</ScrollAnimatedBadge>
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <ScrollAnimatedText
          title={t('title')}
          description={t('description')}
          delay={0.3}
        />
        <AnimatedTestimonialsGrid testimonials={testimonials} delay={0.6} />
      </div>
    </section>
  )
}
