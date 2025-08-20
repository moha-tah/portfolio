import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        'flex flex-col rounded-xl border',
        'from-background/60 to-muted/60 bg-gradient-to-b',
        'p-4 text-start sm:p-6',
        'hover:from-background/80 hover:to-muted/80',
        'min-h-[300px]',
        // 'max-w-[320px] sm:max-w-[320px]',
        'transition-colors duration-300',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md leading-none font-semibold">{author.name}</h3>
          <p className="text-muted-foreground text-sm">{author.handle}</p>
        </div>
      </div>
      <p className="text-muted-foreground mt-4 text-sm sm:text-base">{text}</p>
    </Card>
  )
}
