import { Card } from '@/components/ui/card'
import { useTestimonialGradient } from '@/hooks/use-testimonial-gradient'
import { GradientColor } from '@/lib/gradient-utils'
import { cn } from '@/lib/utils'

import { TopLeftAvatar } from './top-left-avatar'

import './gradient-card.css'

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
  initials: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: React.ReactNode
  href?: string
  className?: string
  gradientColor?: GradientColor
}

export const BaseTestimonialCard = ({
  testimonial,
  children,
  className,
  gradientColor,
  avatarSize = 'size-10'
}: {
  testimonial: TestimonialCardProps
  children: React.ReactNode
  className?: string
  gradientColor?: GradientColor
  avatarSize?: string
}) => {
  const { cardGradient, gradientStyle } = useTestimonialGradient(
    testimonial.gradientColor,
    gradientColor
  )

  return (
    <Card
      className={cn(
        'relative border-0',
        className,
        cardGradient && 'gradient-card'
      )}
      style={gradientStyle}
    >
      <TopLeftAvatar testimonial={testimonial} size={avatarSize} />
      {children}
    </Card>
  )
}
