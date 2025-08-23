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
  { name: 'n8n', shouldInvertInDarkMode: true },
  { name: 'Java' },
  { name: 'HomeAssistant' },
  { name: 'Airflow' },
  { name: 'shadcn', shouldInvertInDarkMode: true },
  { name: 'MongoDB' },
  { name: 'Prisma', shouldInvertInDarkMode: true },
  { name: 'Slack' },
  { name: 'Rive', shouldInvertInDarkMode: true },
  { name: 'SQLAlchemy', shouldInvertInDarkMode: true },
  { name: 'Supabase' },
  { name: 'Unity', shouldInvertInDarkMode: true },
  { name: 'Tailwind' },
  { name: 'Vercel', shouldInvertInDarkMode: true }
]

const firstRow = tools.slice(0, tools.length / 2)
const secondRow = tools.slice(tools.length / 2)

const Icon = ({
  img,
  name,
  shouldInvertInDarkMode = false
}: {
  img: string
  name: string
  shouldInvertInDarkMode?: boolean
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
            className={shouldInvertInDarkMode ? 'dark:invert' : ''}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="text-sm font-medium">{name}</TooltipContent>
    </Tooltip>
  )
}

export function AdditionalSkills() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:60s]">
        {firstRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/${tool.name}.svg`}
            name={tool.name}
            shouldInvertInDarkMode={tool.shouldInvertInDarkMode}
          />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:60s]">
        {secondRow.map((tool) => (
          <Icon
            key={tool.name}
            img={`/icons/${tool.name}.svg`}
            name={tool.name}
            shouldInvertInDarkMode={tool.shouldInvertInDarkMode}
          />
        ))}
      </Marquee>
    </div>
  )
}
