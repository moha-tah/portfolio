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
    slug: 'my-biggest-project',
    image: '/images/projects/project-in-progress.jpg',
    iconUrl: '/icons/skills/TypeScript.svg'
  },
  {
    slug: 'online-multiplayer-game',
    image: '/images/projects/online-game.jpg',
    link: 'https://github.com/moha-tah/Sumo-Spheres-Game',
    iconUrl: '/icons/skills/Unity.svg',
    invertIcon: true
  },
  {
    slug: 'decentralized-distributed-system',
    image: '/images/projects/distributed-systems.jpg',
    link: 'https://github.com/4l3x4ndre/Distributed-System-with-Verification',
    iconUrl: '/icons/skills/Go.svg'
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
