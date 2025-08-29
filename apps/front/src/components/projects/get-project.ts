import { useTranslations } from 'next-intl'

import { getProjects } from './get-projects'

export function getProject(
  slug: string,
  t: ReturnType<typeof useTranslations<'HomePage.projects'>>
) {
  const projects = getProjects(t)
  return projects.find((project) => project.slug === slug)
}
