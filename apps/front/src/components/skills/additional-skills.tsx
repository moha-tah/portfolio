import Image from 'next/image'

import { Marquee } from '@/components/shared/marquee'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const tools = [
  { name: 'Figma' },
  { name: 'AppsScript' },
  { name: 'Claude' },
  { name: 'Docker' },
  { name: 'GCP' },
  { name: 'Git' },
  { name: 'n8n', shouldInvert: true },
  { name: 'Java' },
  { name: 'HomeAssistant' },
  { name: 'Airflow' },
  { name: 'shadcn', shouldInvert: true },
  { name: 'MongoDB' },
  { name: 'Prisma', shouldInvert: true },
  { name: 'Slack' },
  { name: 'Rive', shouldInvert: true },
  { name: 'SQLAlchemy', shouldInvert: true },
  { name: 'Supabase' },
  { name: 'Unity', shouldInvert: true },
  { name: 'Tailwind' },
  { name: 'Vercel', shouldInvert: true }
]

const firstRow = tools.slice(0, tools.length / 2)
const secondRow = tools.slice(tools.length / 2)

const Icon = ({
  img,
  name,
  shouldInvert = false
}: {
  img: string
  name: string
  shouldInvert?: boolean
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="mx-4 flex size-20 items-center justify-center rounded-full p-5">
          <Image
            src={img}
            alt={name}
            width={56}
            height={56}
            loading="lazy"
            className={shouldInvert ? 'invert' : ''}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-sm font-medium">{name}</TooltipContent>
    </Tooltip>
  )
}

export function AdditionalSkills() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-visible">
      <Marquee pauseOnHover className="[--duration:60s]">
        {firstRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/${tool.name}.svg`}
            name={tool.name}
            shouldInvert={tool.shouldInvert}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:60s]">
        {secondRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/${tool.name}.svg`}
            name={tool.name}
            shouldInvert={tool.shouldInvert}
          />
        ))}
      </Marquee>
    </div>
  )
}
