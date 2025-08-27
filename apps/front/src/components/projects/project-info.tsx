import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'

import { Button } from '../ui/button'

interface Props {
  iconUrl: string
  slug: string
  title: string
  description: string
  link?: string
}

export function ProjectInfo({
  iconUrl,
  slug,
  title,
  description,
  link
}: Props) {
  return (
    <div className="rounded-4xl bg-red-300 p-3">
      <div className="flex h-fit w-full items-center gap-4">
        <Image
          src={iconUrl}
          alt={title}
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />

        <div className="flex flex-col">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="flex h-full flex-1 items-center justify-end gap-2">
          {link && (
            <Button variant="outline" size="icon" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icons/GitHub.svg"
                  alt="GitHub icon"
                  className="dark:invert"
                  width={20}
                  height={20}
                />
              </a>
            </Button>
          )}
          <Button asChild className="gap-1 rounded-full">
            <Link href={`/projects/${slug}`}>
              View
              <ArrowUpRight size={20} className="stroke-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
