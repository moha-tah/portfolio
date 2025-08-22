export type Passion = {
  // Name of the passion as a t-key
  name:
    | 'computerScience'
    | 'coding'
    | 'engineering'
    | 'Python'
    | 'NextJS'
    | 'Backend'
    | 'TypeScript'
    | 'NestJS'
  color: string
  // needed by Tailwind at compile time
  backgroundColor: string
}

export const passionsList: Passion[] = [
  {
    name: 'computerScience',
    color: 'text-[#05C99B]',
    backgroundColor: 'bg-[#05C99B] hover:bg-[#05C99B]/90'
  },
  {
    name: 'coding',
    color: 'text-[#F97316]',
    backgroundColor: 'bg-[#F97316] hover:bg-[#F97316]/90'
  },
  {
    name: 'engineering',
    color: 'text-[#22C55E]',
    backgroundColor: 'bg-[#22C55E] hover:bg-[#22C55E]/90'
  },
  {
    name: 'Python',
    color: 'text-[#3577AC]',
    backgroundColor: 'bg-[#3577AC] hover:bg-[#3577AC]/90'
  },
  {
    name: 'NextJS',
    color: 'text-[#000000] dark:text-[#FFFFFF]',
    backgroundColor:
      'bg-[#000000] dark:bg-[#FFFFFF] hover:bg-[#000000]/90 dark:hover:bg-[#FFFFFF]/90'
  },
  {
    name: 'Backend',
    color: 'text-[#8B5CF6]',
    backgroundColor: 'bg-[#8B5CF6] hover:bg-[#8B5CF6]/90'
  },
  {
    name: 'TypeScript',
    color: 'text-[#2F79C8]',
    backgroundColor: 'bg-[#2F79C8] hover:bg-[#2F79C8]/90'
  },
  {
    name: 'NestJS',
    color: 'text-[#E0234E]',
    backgroundColor: 'bg-[#E0234E] hover:bg-[#E0234E]/90'
  }
]
