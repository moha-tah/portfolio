import { CardContent } from '@/components/ui/card'
import { GradientColor } from '@/lib/gradient-utils'
import { cn } from '@/lib/utils'

import { ExpandableText } from '../../expandable-text'
import { AuthorSection } from '../author-section'
import {
  BaseTestimonialCard,
  TestimonialCardProps
} from '../base-testimonial-card'

interface Props {
  testimonial: TestimonialCardProps
  className?: string
  gradientColor?: GradientColor
  enableScrollAnimation?: boolean
  animationDelay?: number
}

export function SmallTestimonial({
  testimonial,
  className,
  gradientColor,
  enableScrollAnimation,
  animationDelay
}: Props) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className={cn('sm:col-span-2 md:col-span-2 lg:col-span-1', className)}
      avatarSize="size-8"
      enableScrollAnimation={enableScrollAnimation}
      animationDelay={animationDelay}
    >
      <CardContent className="h-full p-4">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <ExpandableText
            text={testimonial.text}
            textSize="text-sm"
            maxHeight={200}
          />
          <AuthorSection
            author={testimonial.author}
            href={testimonial.href}
            textSize="text-xs"
          />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
