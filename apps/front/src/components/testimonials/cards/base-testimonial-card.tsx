import { motion } from 'framer-motion'

import { Card } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
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
  company: {
    name: string
    avatar: string
  }
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
  avatarSize = 'size-10',
  animationDelay = 0,
  enableScrollAnimation = false
}: {
  testimonial: TestimonialCardProps
  children: React.ReactNode
  className?: string
  gradientColor?: GradientColor
  avatarSize?: string
  animationDelay?: number
  enableScrollAnimation?: boolean
}) => {
  const { cardGradient, gradientStyle } = useTestimonialGradient(
    testimonial.gradientColor,
    gradientColor
  )

  const { ref, isInView } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
  })

  const MotionCard = motion.create(Card)

  if (enableScrollAnimation) {
    return (
      <MotionCard
        ref={ref}
        className={cn(
          'relative border-0',
          className,
          cardGradient && 'gradient-card'
        )}
        style={gradientStyle}
        initial={{ opacity: 0, y: 40, filter: 'blur(6px)', scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
            : { opacity: 0, y: 40, filter: 'blur(6px)', scale: 0.95 }
        }
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
          delay: animationDelay
        }}
      >
        <TopLeftAvatar testimonial={testimonial} size={avatarSize} />
        {children}
      </MotionCard>
    )
  }

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
