import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'

import { Button } from '../ui/button'

interface Props {
  slug: string
  title: string
  description: string
  link?: string
}

export function ProjectInfo({ slug, title, description, link }: Props) {
  return (
    <div className="bg-background rounded-4xl p-3">
      <div className="flex h-fit w-full items-center gap-4">
        <Image
          src={`/icons/skills/Go.svg`}
          alt={title}
          width={60}
          height={60}
          className="object-cover"
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
