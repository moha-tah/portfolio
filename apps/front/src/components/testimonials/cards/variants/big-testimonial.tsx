import { CardContent } from '@/components/ui/card'
import { GradientColor } from '@/lib/gradient-utils'

import { AuthorSection } from '../author-section'
import {
  BaseTestimonialCard,
  TestimonialCardProps
} from '../base-testimonial-card'

export function BigTestimonial({
  testimonial,
  gradientColor,
  enableScrollAnimation,
  animationDelay
}: {
  testimonial: TestimonialCardProps
  gradientColor?: GradientColor
  enableScrollAnimation?: boolean
  animationDelay?: number
}) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className="sm:col-span-2 md:col-span-4 lg:col-span-2 lg:row-span-2"
      avatarSize="size-12"
      enableScrollAnimation={enableScrollAnimation}
      animationDelay={animationDelay}
    >
      <CardContent className="h-full pt-8 pb-6">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <p className="text-base font-medium">{testimonial.text}</p>
          <AuthorSection author={testimonial.author} href={testimonial.href} />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
