import { GradientColor, getGradientStyle } from '@/lib/gradient-utils'

export const useTestimonialGradient = (
  testimonialGradient?: GradientColor,
  overrideGradient?: GradientColor
) => {
  const cardGradient = overrideGradient || testimonialGradient
  const gradientStyle = cardGradient ? getGradientStyle(cardGradient) : {}
  return { cardGradient, gradientStyle }
}
