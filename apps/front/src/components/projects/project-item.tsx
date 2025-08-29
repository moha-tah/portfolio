'use client'

import Image from 'next/image'

import { useViewportIntersection } from '@/hooks/use-viewport-intersection'
import { cn } from '@/lib/utils'

import { Project } from './get-projects'
import { ProjectInfo } from './project-info'

export function ProjectItem({
  slug,
  title,
  shortDescription,
  image,
  link,
  iconUrl,
  invertIcon
}: Project) {
  const { ref, isIntersecting } = useViewportIntersection()

  return (
    <div
      ref={ref}
      className="relative flex flex-col gap-4 overflow-hidden rounded-4xl"
    >
      <Image
        src={image}
        alt={title}
        height={650}
        width={865}
        className={cn(
          'h-[375px] w-[500px] object-cover transition-transform duration-500 ease-in-out hover:scale-100 sm:h-[525px] sm:w-[700px] lg:h-[650px] lg:w-[865px]',
          isIntersecting ? 'scale-[1.02]' : 'scale-105'
        )}
      />
      <div
        className={cn(
          'spring-bounce-20 spring-duration-500 absolute -bottom-24 left-1/2 w-full -translate-x-1/2 p-3 transition-transform',
          isIntersecting ? '-translate-y-24' : ''
        )}
      >
        <ProjectInfo
          iconUrl={iconUrl}
          invertIcon={invertIcon}
          slug={slug}
          title={title}
          shortDescription={shortDescription}
          link={link}
        />
      </div>
    </div>
  )
}
