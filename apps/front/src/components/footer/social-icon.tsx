/* eslint-disable no-restricted-imports */
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  children: React.ReactNode
  href: string
  props?: React.ComponentProps<typeof Button>
}

export function SocialIcon({ children, href, className, ...props }: Props) {
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className={cn(
        'bg-background border-border size-12 rounded-xl',
        'spring-bounce-60 spring-duration-300 hover:-translate-y-1 hover:scale-110 active:-translate-y-1 active:scale-110',
        className
      )}
      {...props}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  )
}
