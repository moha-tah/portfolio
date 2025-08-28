'use server'

import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getProjects, staticProjects } from '@/components/projects/get-projects'
import { ProjectModalItem } from '@/components/projects/project-modal-item'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export async function generateStaticParams() {
  return staticProjects.map((project) => ({
    id: project.slug
  }))
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const t = await getTranslations('HomePage.projects')
  const { id } = await params

  const projects = getProjects(t)
  const project = projects.find((p) => p.slug === id)

  if (!project) {
    notFound()
  }

  return {
    title: project.title,
    description: project.shortDescription
  }
}

interface ProjectPageProps {
  params: Promise<{
    id: string
    locale: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const t = await getTranslations('HomePage.projects')
  const { id } = await params

  const projects = getProjects(t)
  const project = projects.find((p) => p.slug === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/projects" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t('backToProjects')}
            </Link>
          </Button>

          <div className="mb-8 flex items-center gap-4">
            <div className="bg-background flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm">
              <Image
                src={project.iconUrl}
                alt={`${project.title} icon`}
                width={32}
                height={32}
                className={project.invertIcon ? 'invert dark:invert-0' : ''}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                {project.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="relative mb-8 overflow-hidden rounded-3xl">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={600}
              className="h-64 w-full object-cover md:h-96"
              priority
            />
          </div>
        </div>

        <ProjectModalItem project={project} withScrollArea={false} />
      </div>
    </div>
  )
}
