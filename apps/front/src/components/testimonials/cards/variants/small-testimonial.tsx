import { CardContent } from '@/components/ui/card'
import { GradientColor } from '@/lib/gradient-utils'
import { cn } from '@/lib/utils'

import { AuthorSection } from '../author-section'
import {
  BaseTestimonialCard,
  TestimonialCardProps
} from '../base-testimonial-card'

export function SmallTestimonial({
  testimonial,
  className,
  gradientColor
}: {
  testimonial: TestimonialCardProps
  className?: string
  gradientColor?: GradientColor
}) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className={cn('sm:col-span-2 md:col-span-2 lg:col-span-1', className)}
      avatarSize="size-8"
    >
      <CardContent className="h-full pt-6">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <p className="font-medium">{testimonial.text}</p>
          <AuthorSection author={testimonial.author} href={testimonial.href} />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
