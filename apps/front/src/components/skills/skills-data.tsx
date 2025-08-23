import { SquareTerminal } from 'lucide-react'
import Image from 'next/image'

export interface Skill {
  name: string
  description: string
  proficiency: number
  color: string
  icon: React.ReactNode
}

export const skillsData: Skill[] = [
  {
    name: 'Python',
    description: 'Building robust backend systems and data pipelines',
    proficiency: 90,
    color: 'rgba(218, 165, 32, 0.6)',
    icon: (
      <Image
        src="/icons/Python.svg"
        alt="Python"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'TypeScript',
    description: 'Building high-performance full-stack web applications',
    proficiency: 85,
    color: 'rgba(0, 0, 139, 0.6)',
    icon: (
      <Image
        src="/icons/typescript.svg"
        alt="TypeScript"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'PostgreSQL',
    description: 'Building complex, scalable and efficient databases',
    proficiency: 75,
    color: 'rgba(30, 144, 255, 0.6)',
    icon: (
      <Image
        src="/icons/PostgreSQL.svg"
        alt="PostgreSQL"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'NestJS',
    description: 'Building high-performance backend applications',
    proficiency: 70,
    color: 'rgba(220, 38, 57, 0.6)',
    icon: (
      <Image
        src="/icons/NestJS.svg"
        alt="NestJS"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'Next.js',
    description: 'Building high-performance full-stack web applications',
    proficiency: 70,
    color: 'rgba(255, 255, 255, 0.1)',
    icon: (
      <Image
        src="/icons/NextJs.svg"
        alt="Next.js"
        width={56}
        height={56}
        className="invert select-none dark:invert-0"
      />
    )
  },
  {
    name: 'CI/CD, GitHub Actions, Shell',
    description: 'Automating workflows and tasks',
    proficiency: 60,
    color: 'rgba(122, 34, 255, 0.6)',
    icon: (
      <Image
        src="/icons/GitHub.svg"
        alt="GitHub"
        width={56}
        height={56}
        className="invert select-none dark:invert-0"
      />
    )
  },
  {
    name: 'C, C++, C#, Go, etc.',
    description: 'Scripting and low-level programming',
    proficiency: 55,
    color: 'rgba(122, 34, 255, 0.6)',
    icon: <SquareTerminal width={70} height={70} className="text-secondary" />
  }
]
