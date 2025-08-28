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

const staticProjects: StaticPartProject[] = [
  {
    slug: 'unity-multiplayer-game',
    image:
      'https://www.shutterstock.com/image-photo/lake-palms-mahe-island-seychelles-260nw-119831752.jpg',
    link: 'https://github.com/moha-tah/Sumo-Spheres-Game',
    iconUrl: '/icons/skills/Unity.svg',
    invertIcon: true
  },
  {
    slug: 'distributed-systems-in-go',
    image:
      'https://www.shutterstock.com/image-photo/lake-palms-mahe-island-seychelles-260nw-119831752.jpg',
    link: 'https://github.com/4l3x4ndre/Distributed-System-with-Verification',
    iconUrl: '/icons/skills/Go.svg'
  },
  {
    slug: 'project-in-progress',
    image:
      'https://www.shutterstock.com/image-photo/lake-palms-mahe-island-seychelles-260nw-119831752.jpg',
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
