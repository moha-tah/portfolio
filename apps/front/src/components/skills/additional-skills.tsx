import Image from 'next/image'

import { Marquee } from '@/components/shared/marquee'
import { cn } from '@/lib/utils'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const tools = [
  { name: 'Figma' },
  { name: 'AWS' },
  { name: 'CSS' },
  { name: 'HTML5' },
  { name: 'Postman' },
  { name: 'S3' },
  { name: 'Swagger' },
  { name: 'TypeORM' },
  { name: 'AppsScript' },
  { name: 'Claude' },
  { name: 'Docker' },
  { name: 'Railway', darkInvert: true },
  { name: 'GCP' },
  { name: 'Git' },
  { name: 'n8n', darkInvert: true },
  { name: 'Java' },
  { name: 'Cloudflare' },
  { name: 'HomeAssistant' },
  { name: 'Airflow' },
  { name: 'Algolia' },
  { name: 'shadcn', darkInvert: true },
  { name: 'MongoDB' },
  { name: 'Prisma', darkInvert: true },
  { name: 'Slack' },
  { name: 'Rive', darkInvert: true },
  { name: 'SQLAlchemy', darkInvert: true },
  { name: 'Supabase' },
  { name: 'Unity', darkInvert: true },
  { name: 'Tailwind' },
  { name: 'Vercel', darkInvert: true }
]

const firstRow = tools.slice(0, tools.length / 2)
const secondRow = tools.slice(tools.length / 2)

const Icon = ({
  img,
  name,
  darkInvert = false
}: {
  img: string
  name: string
  darkInvert?: boolean
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="mx-4 flex size-14 items-center justify-center rounded-full p-2 select-none sm:size-20 sm:p-4">
          <Image
            src={img}
            alt={name}
            width={40}
            height={40}
            loading="lazy"
            className={cn(darkInvert ? 'dark:invert' : '', 'object-contain')}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-sm font-medium">{name}</TooltipContent>
    </Tooltip>
  )
}

export function AdditionalSkills() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden select-none">
      <Marquee className="[--duration:60s]">
        {firstRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/skills/${tool.name}.svg`}
            name={tool.name}
            darkInvert={tool.darkInvert}
          />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:60s]">
        {secondRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/skills/${tool.name}.svg`}
            name={tool.name}
            darkInvert={tool.darkInvert}
          />
        ))}
      </Marquee>
    </div>
  )
}
