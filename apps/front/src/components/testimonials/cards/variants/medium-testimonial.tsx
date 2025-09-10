import { CardContent } from '@/components/ui/card'
import { GradientColor } from '@/lib/gradient-utils'

import { ExpandableText } from '../../expandable-text'
import { AuthorSection } from '../author-section'
import {
  BaseTestimonialCard,
  TestimonialCardProps
} from '../base-testimonial-card'

interface Props {
  testimonial: TestimonialCardProps
  gradientColor?: GradientColor
  enableScrollAnimation?: boolean
  animationDelay?: number
}

export function MediumTestimonial({
  testimonial,
  gradientColor,
  enableScrollAnimation,
  animationDelay
}: Props) {
  return (
    <BaseTestimonialCard
      testimonial={testimonial}
      gradientColor={gradientColor}
      className="sm:col-span-2 md:col-span-4 lg:col-span-2"
      avatarSize="size-10"
      enableScrollAnimation={enableScrollAnimation}
      animationDelay={animationDelay}
    >
      <CardContent className="h-full pt-8 pb-6">
        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
          <ExpandableText
            text={testimonial.text}
            textSize="text-sm sm:text-base"
            maxHeight={140}
          />
          <AuthorSection author={testimonial.author} href={testimonial.href} />
        </blockquote>
      </CardContent>
    </BaseTestimonialCard>
  )
}
