'use client'

import { useParams } from 'next/navigation'

import { DialogWrapper } from '@/components/shared/dialog-wrapper'
import { DrawerWrapper } from '@/components/shared/drawer-wrapper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsWidthAbove } from '@/hooks/use-is-width-above'

export default function ProjectModal() {
  const isMobile = !useIsWidthAbove(768)
  const { slug } = useParams()

  const project = {
    id: '1',
    title: 'Project 1',
    description: 'Description 1',
    image: 'https://via.placeholder.com/150'
  }

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

  const content = (
    <ScrollArea className="h-2/3 overflow-y-hidden">
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
      <h1 className="mb-4 text-2xl">Project {slug}</h1>
    </ScrollArea>
  )

  return isMobile ? (
    <DrawerWrapper title={`Project ${slug}`} description={`Project ${slug}`}>
      {content}
    </DrawerWrapper>
  ) : (
    <DialogWrapper title={`Project ${slug}`} description={`Project ${slug}`}>
      {content}
    </DialogWrapper>
  )
}
