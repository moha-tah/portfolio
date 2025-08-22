import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { TestimonialCardProps } from './base-testimonial-card'

export const TopLeftAvatar = ({
  testimonial,
  size
}: {
  testimonial: TestimonialCardProps
  size?: string
}) => {
  return (
    <div className="spring-bounce-60 spring-duration-300 absolute -top-3 -left-3 z-10 transition-transform hover:scale-150">
      <Avatar className={cn('border-background border-2 shadow-lg', size)}>
        <AvatarImage
          src={testimonial.author.company.avatar}
          alt={testimonial.author.company.name}
          width={48}
          height={48}
          className="object-cover"
          loading="lazy"
        />
        <AvatarFallback className="text-xs font-medium">
          {testimonial.author.company.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
