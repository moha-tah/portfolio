import { useTranslations } from 'next-intl'

import { getProjects } from './get-projets'
import { ProjectItem } from './project-item'
import { ScrollAnimatedBadge } from '../shared/animations/scroll-animated-badge'
import { ScrollAnimatedSection } from '../shared/animations/scroll-animated-section'
import { ScrollAnimatedText } from '../shared/animations/scroll-animated-text'

export function Projects() {
  const t = useTranslations('HomePage.projects')

  const projects = getProjects(t)

  return (
    <ScrollAnimatedSection
      id="projects"
      className="w-full max-w-7xl px-6 pt-8"
      staggerChildren={0.1}
      delayChildren={0.2}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <ScrollAnimatedBadge delay={0.1} className="mb-6">
            {t('badge')}
          </ScrollAnimatedBadge>

          <ScrollAnimatedText
            title={t('title')}
            description={t('description')}
            delay={0.2}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </div>
    </ScrollAnimatedSection>
  )
}
