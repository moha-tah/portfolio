'use client'

import { TestimonialCardProps } from './cards/base-testimonial-card'
import { BigTestimonial } from './cards/variants/big-testimonial'
import { MediumTestimonial } from './cards/variants/medium-testimonial'
import { SmallTestimonial } from './cards/variants/small-testimonial'

interface AnimatedTestimonialsGridProps {
  testimonials: [
    TestimonialCardProps,
    TestimonialCardProps,
    TestimonialCardProps,
    TestimonialCardProps
  ]
  delay?: number
}

export function AnimatedTestimonialsGrid({
  testimonials,
  delay = 0.6
}: AnimatedTestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
      <BigTestimonial
        testimonial={testimonials[0]}
        gradientColor="blue"
        enableScrollAnimation={true}
        animationDelay={delay}
      />
      <MediumTestimonial
        testimonial={testimonials[1]}
        gradientColor="orange"
        enableScrollAnimation={true}
        animationDelay={delay + 0.1}
      />
      <SmallTestimonial
        testimonial={testimonials[2]}
        gradientColor="green"
        enableScrollAnimation={true}
        animationDelay={delay + 0.2}
      />
      <SmallTestimonial
        testimonial={testimonials[3]}
        gradientColor="green"
        enableScrollAnimation={true}
        animationDelay={delay + 0.3}
      />
    </div>
  )
}
