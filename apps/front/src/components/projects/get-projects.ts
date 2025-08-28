import { useTranslations } from 'next-intl'

interface TranslatedPartProject {
  title: string
  shortDescription: string
  description: string
  goal: string
  features: string
  stack: string[]
}

interface StaticPartProject {
  slug: string
  image: string
  link?: string
  iconUrl: string
  invertIcon?: boolean
}

export const staticProjects: StaticPartProject[] = [
  {
    slug: 'unity-multiplayer-game',
    image: '/images/projects/sumo-spheres.jpg',
    link: 'https://github.com/moha-tah/Sumo-Spheres-Game',
    iconUrl: '/icons/skills/Unity.svg',
    invertIcon: true
  },
  {
    slug: 'distributed-systems-in-go',
    image: '/images/projects/distributed-systems.png',
    link: 'https://github.com/4l3x4ndre/Distributed-System-with-Verification',
    iconUrl: '/icons/skills/Go.svg'
  },
  {
    slug: 'project-in-progress',
    image: '/images/projects/project-in-progress.jpg',
    iconUrl: '/icons/skills/TypeScript.svg'
  }
]

export interface Project extends TranslatedPartProject, StaticPartProject {}

export function getProjects(
  t: ReturnType<typeof useTranslations<'HomePage.projects'>>
): Project[] {
  const translatedProjects = t.raw('projects') as TranslatedPartProject[]

  return translatedProjects.map((project, index) => ({
    ...project,
    ...staticProjects[index]
  }))
}
