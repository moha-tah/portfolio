'use client'

import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { getProject } from '@/components/projects/get-project'
import { ProjectModalItem } from '@/components/projects/project-modal-item'
import { DialogWrapper } from '@/components/shared/dialog-wrapper'
import { DrawerWrapper } from '@/components/shared/drawer-wrapper'
import { useIsWidthAbove } from '@/hooks/use-is-width-above'

export default function ProjectModal() {
  const isMobile = !useIsWidthAbove(768)
  const { slug } = useParams<{ slug: string }>()
  const t = useTranslations('HomePage.projects')

  const project = getProject(slug, t)

  if (!project) {
    const content = (
      <div className="max-w-md space-y-2 p-8">
        <h1 className="text-2xl">No Project Found for that ID.</h1>
      </div>
    )

    if (isMobile) {
      return isMobile ? (
        <DrawerWrapper
          title="No Project Found for that ID."
          description="No Project Found for that ID."
        >
          {content}
        </DrawerWrapper>
      ) : (
        <DialogWrapper
          title="No Project Found for that ID."
          description="No Project Found for that ID."
        >
          {content}
        </DialogWrapper>
      )
    }
  }

  const content = <ProjectModalItem project={project!} />

  return isMobile ? (
    <DrawerWrapper
      title={project!.title}
      description={project!.shortDescription}
    >
      {content}
    </DrawerWrapper>
  ) : (
    <DialogWrapper
      title={project!.title}
      description={project!.shortDescription}
    >
      {content}
    </DialogWrapper>
  )
}
