'use client'

import Image from 'next/image'

import { Project } from './get-projets'
import { ProjectInfo } from './project-info'

interface Props extends Project {
  _?: number
}

export function ProjectItem({ slug, title, description, image, link }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="group overflow-hidden rounded-4xl">
        <Image
          src={image}
          alt={title}
          height={525}
          width={525}
          className="scale-110 object-contain transition-transform duration-300 ease-in-out group-hover:scale-100"
        />
      </div>
      <ProjectInfo
        slug={slug}
        title={title}
        description={description}
        link={link}
      />
    </div>
  )
}
