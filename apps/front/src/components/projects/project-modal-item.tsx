import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Project } from './get-projects'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

interface Props {
  project: Project
  withScrollArea?: boolean
}

export function ProjectModalItem({ project, withScrollArea = true }: Props) {
  const t = useTranslations('HomePage.projects')

  const scrollAreaContent = (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('summary')}</h3>
        <p>{project.description}</p>
        <h3 className="text-lg font-semibold">{t('whyThisProject')}</h3>
        <p>{project.goal}</p>
        <h3 className="text-lg font-semibold">{t('features')}</h3>
        <p>{project.features}</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-screen px-6 md:px-0">
      <div className="flex flex-wrap gap-2 pb-4">
        {project.stack.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-xs text-white sm:text-sm"
          >
            {skill}
          </Badge>
        ))}
      </div>
      {withScrollArea ? (
        <ScrollArea className="h-[40vh]">{scrollAreaContent}</ScrollArea>
      ) : (
        scrollAreaContent
      )}

      <div
        className={cn(
          'flex justify-end py-4 md:pb-0',
          !project.link && 'pointer-events-none opacity-50'
        )}
      >
        <Button size="xl" asChild disabled={!project.link}>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <Image
              src={'/icons/GitHub.svg'}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2 invert dark:invert-0"
            />
            {project.link ? t('viewCode') : t('closedSource')}
          </a>
        </Button>
      </div>
    </div>
  )
}
