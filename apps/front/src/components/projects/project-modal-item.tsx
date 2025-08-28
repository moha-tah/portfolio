import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Project } from './get-projects'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface Props {
  project: Project
}

export function ProjectModalItem({ project }: Props) {
  const t = useTranslations('HomePage.projects')

  return (
    <div className="px-4 md:px-0">
      <div className="flex flex-wrap gap-2">
        {project.stack.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-white">
            {skill}
          </Badge>
        ))}
      </div>
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
      {project.link && (
        <div className="flex justify-end pt-4">
          <Button size="xl" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={'/icons/GitHub.svg'}
                alt="GitHub"
                width={20}
                height={20}
                className="mr-2 invert dark:invert-0"
              />
              {t('viewProject')}
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
