import { useTranslations } from 'next-intl'

import { BigTestimonial } from './cards/variants/big-testimonial'
import { MediumTestimonial } from './cards/variants/medium-testimonial'
import { SmallTestimonial } from './cards/variants/small-testimonial'
import { getTestimonials } from './get-testimonials'
import { AnimatedBadge } from '../shared/animated-badge'

export function Testimonials() {
  const t = useTranslations('HomePage.testimonials')

  const testimonials = getTestimonials(t)

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <AnimatedBadge>Testimonials</AnimatedBadge>
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        {/* Header of the section */}
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">{t('title')}</h2>
          <p className="subtitle">{t('description')}</p>
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <BigTestimonial testimonial={testimonials[0]} gradientColor="blue" />
          <MediumTestimonial
            testimonial={testimonials[1]}
            gradientColor="orange"
          />
          <SmallTestimonial
            testimonial={testimonials[2]}
            gradientColor="green"
          />
          <SmallTestimonial
            testimonial={testimonials[3]}
            gradientColor="green"
          />
        </div>
      </div>
    </section>
  )
}
