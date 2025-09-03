import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface Props {
  iconUrl: string
  invertIcon?: boolean
  slug: string
  title: string
  shortDescription: string
  link?: string
  className?: string
}

export function ProjectInfo({
  iconUrl,
  invertIcon = false,
  slug,
  title,
  shortDescription,
  className
}: Props) {
  const t = useTranslations('HomePage.projects')

  return (
    <div
      className={cn(
        'shadow-custom bg-background rounded-4xl p-2 sm:p-3',
        className
      )}
    >
      <div className="flex h-fit w-full items-center gap-4">
        <Image
          src={iconUrl}
          alt={title}
          width={50}
          height={50}
          className={cn(
            'hidden size-12 rounded-lg sm:block',
            invertIcon && 'dark:invert'
          )}
        />

        <div className="flex min-w-0 flex-1 flex-col pl-2">
          <p className="text-foreground truncate font-medium sm:text-lg sm:font-semibold">
            {title}
          </p>
          <p className="text-muted-foreground hidden truncate text-sm sm:block">
            {shortDescription}
          </p>
        </div>

        <Button
          asChild
          className="dark:border-muted/50 base-radial-gradient h-8 gap-1 rounded-full border px-14 text-base text-white shadow-none transition-all duration-300 hover:scale-105 sm:h-12 sm:font-semibold sm:has-[>svg]:px-6"
        >
          <Link href={`/projects/${slug}`}>
            {t('view')}
            <ArrowUpRight size={20} className="stroke-2 sm:stroke-3" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
