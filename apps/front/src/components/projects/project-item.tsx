'use client'

import Image from 'next/image'

import { Project } from './get-projets'
import { ProjectInfo } from './project-info'

export function ProjectItem({
  slug,
  title,
  description,
  image,
  link,
  iconUrl
}: Project) {
  return (
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-4xl">
      <Image
        src={image}
        alt={title}
        height={650}
        width={650}
        className="scale-110 object-contain transition-transform duration-500 ease-in-out group-hover:scale-100"
      />
      <div className="spring-bounce-20 spring-duration-500 absolute bottom-0 left-1/2 w-full -translate-x-1/2 p-3 transition-transform sm:-bottom-24 sm:group-hover:-translate-y-24">
        <ProjectInfo
          iconUrl={iconUrl}
          slug={slug}
          title={title}
          description={description}
          link={link}
        />
      </div>
    </div>
  )
}
