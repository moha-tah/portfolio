'use client'

import { TestimonialCardProps } from './cards/base-testimonial-card'
import { BigTestimonial } from './cards/variants/big-testimonial'
import { MediumTestimonial } from './cards/variants/medium-testimonial'
import { SmallTestimonial } from './cards/variants/small-testimonial'

interface AnimatedTestimonialsGridProps {
  // To make sure we have exactly 4 testimonials
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      <BigTestimonial
        testimonial={testimonials[0]}
        gradientColor="green"
        enableScrollAnimation
        animationDelay={delay}
      />
      <MediumTestimonial
        testimonial={testimonials[1]}
        gradientColor="blue"
        enableScrollAnimation
        animationDelay={delay + 0.1}
      />
      {/* <SmallTestimonial
        testimonial={testimonials[2]}
        gradientColor="green"
        enableScrollAnimation
        animationDelay={delay + 0.2}
      /> */}
      <SmallTestimonial
        className="md:col-span-4 lg:col-span-2"
        testimonial={testimonials[3]}
        gradientColor="orange"
        enableScrollAnimation
        animationDelay={delay + 0.3}
      />
    </div>
  )
}
