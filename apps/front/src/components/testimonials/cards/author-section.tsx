import { ExternalLink } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { TestimonialAuthor } from './base-testimonial-card'

export const AuthorSection = ({
  author,
  href,
  className,
  textSize = 'text-sm'
}: {
  author: TestimonialAuthor
  href?: string
  className?: string
  textSize?: string
}) => {
  const content = (
    <div
      className={cn(
        'grid w-fit grid-cols-[auto_1fr] items-center gap-3 transition-transform duration-300 hover:scale-105',
        className
      )}
    >
      <Avatar className="size-12">
        <AvatarImage
          src={author.avatar}
          alt={author.name}
          height="400"
          width="400"
          loading="lazy"
        />
        <AvatarFallback>{author.initials}</AvatarFallback>
      </Avatar>
      <div>
        <cite className="flex items-center gap-2 text-sm font-medium">
          {author.name}
          {href && <ExternalLink className="text-muted-foreground size-4" />}
        </cite>
        <span className={cn('text-muted-foreground block', textSize)}>
          {author.handle}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit"
      >
        {content}
      </a>
    )
  }

  return content
}
