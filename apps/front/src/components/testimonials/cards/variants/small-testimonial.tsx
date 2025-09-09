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
  gradientColor,
  enableScrollAnimation,
  animationDelay
}: {
  testimonial: TestimonialCardProps
  className?: string
  gradientColor?: GradientColor
  enableScrollAnimation?: boolean
  animationDelay?: number
}) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className={cn('sm:col-span-2 md:col-span-2 lg:col-span-1', className)}
      avatarSize="size-8"
      enableScrollAnimation={enableScrollAnimation}
      animationDelay={animationDelay}
    >
      <CardContent className="h-full pt-8 pb-6">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <p className="text-sm font-medium">{testimonial.text}</p>
          <AuthorSection author={testimonial.author} href={testimonial.href} />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
