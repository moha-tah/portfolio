import { CardContent } from '@/components/ui/card'
import { GradientColor } from '@/lib/gradient-utils'

import { AuthorSection } from '../author-section'
import {
  BaseTestimonialCard,
  TestimonialCardProps
} from '../base-testimonial-card'

export function MediumTestimonial({
  testimonial,
  gradientColor
}: {
  testimonial: TestimonialCardProps
  gradientColor?: GradientColor
}) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className="sm:col-span-2 md:col-span-4 lg:col-span-2"
      avatarSize="size-10"
    >
      <CardContent className="h-full pt-6">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <p className="text-lg font-medium">{testimonial.text}</p>
          <AuthorSection author={testimonial.author} href={testimonial.href} />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
