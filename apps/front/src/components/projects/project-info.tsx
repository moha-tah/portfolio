import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface Props {
  iconUrl: string
  slug: string
  title: string
  description: string
  link?: string
  className?: string
}

export function ProjectInfo({
  iconUrl,
  slug,
  title,
  description,
  className
}: Props) {
  return (
    <div
      className={cn('shadow-custom rounded-4xl bg-white p-2 sm:p-3', className)}
    >
      <div className="flex h-fit w-full items-center gap-4">
        <Image
          src={iconUrl}
          alt={title}
          width={50}
          height={50}
          className="hidden size-12 rounded-lg sm:block"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate font-medium text-black sm:text-lg sm:font-semibold">
            {title}
          </p>
          <p className="text-muted-foreground dark:text-muted/80 hidden truncate text-sm sm:block">
            {description}
          </p>
        </div>

        <Button
          asChild
          className="dark:border-muted/50 base-radial-gradient h-8 gap-1 rounded-full border px-14 text-base text-white shadow-none transition-all duration-300 hover:scale-105 sm:h-12 sm:font-semibold sm:has-[>svg]:px-6"
        >
          <Link href={`/projects/${slug}`}>
            View
            <ArrowUpRight size={20} className="stroke-2 sm:stroke-3" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
