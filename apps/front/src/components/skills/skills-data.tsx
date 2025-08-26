import { SquareTerminal } from 'lucide-react'
import Image from 'next/image'

import { Skill } from '@/types/skill'

export const skillsData: Skill[] = [
  {
    name: 'python',
    description: 'Building robust backend systems and data pipelines',
    proficiency: 90,
    months: 24,
    icon: (
      <Image
        src="/icons/skills/Python.svg"
        alt="Python"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'typeScript',
    description: 'Building high-performance full-stack web applications',
    proficiency: 85,
    months: 18,
    icon: (
      <Image
        src="/icons/skills/TypeScript.svg"
        alt="TypeScript"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'postgreSQL',
    description: 'Building complex, scalable and efficient databases',
    proficiency: 75,
    months: 12,
    icon: (
      <Image
        src="/icons/skills/PostgreSQL.svg"
        alt="PostgreSQL"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'nestJs',
    description: 'Building high-performance backend applications',
    proficiency: 75,
    months: 12,
    icon: (
      <Image
        src="/icons/skills/NestJS.svg"
        alt="NestJS"
        width={56}
        height={56}
        className="select-none"
      />
    )
  },
  {
    name: 'nextJs',
    description: 'Building high-performance frontend applications',
    proficiency: 70,
    months: 8,
    icon: (
      <Image
        src="/icons/skills/NextJs.svg"
        alt="Next.js"
        width={56}
        height={56}
        className="select-none dark:invert"
      />
    )
  },
  {
    name: 'ciCd',
    description: 'Automating workflows and tasks',
    proficiency: 65,
    months: 6,
    icon: (
      <Image
        src="/icons/GitHub.svg"
        alt="GitHub"
        width={56}
        height={56}
        className="select-none dark:invert"
      />
    )
  },
  {
    name: 'lowLevel',
    description: 'Scripting and low-level programming',
    proficiency: 60,
    months: 4,
    icon: (
      <SquareTerminal
        width={56}
        height={56}
        className="text-primary select-none"
      />
    )
  }
]
