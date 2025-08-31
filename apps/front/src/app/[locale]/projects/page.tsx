import { ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { getProjects } from '@/components/projects/get-projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage.projects')

  return {
    title: t('metadataTitle'),
    description: t('description')
  }
}

export default async function ProjectsPage() {
  const t = await getTranslations('HomePage.projects')

  const projects = getProjects(t)

  return (
    <div className="container mx-auto px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
            {t('badge')}
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            {t('title')}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card relative overflow-hidden rounded-3xl border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <div className="grid gap-6 p-8 md:grid-cols-2 md:gap-12">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover transition-transform duration-300 md:h-80"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex items-center gap-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm">
                        <Image
                          src={project.iconUrl}
                          alt={`${project.title} icon`}
                          width={32}
                          height={32}
                          className={project.invertIcon ? 'dark:invert' : ''}
                        />
                      </div>
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {project.shortDescription}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild className="flex-1">
                      <Link href={`/projects/${project.slug}`}>
                        {t('viewDetails')}
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>

                    {project.link && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View on GitHub"
                        >
                          <Image
                            src="/icons/GitHub.svg"
                            alt="GitHub"
                            width={20}
                            height={20}
                            className="dark:invert"
                          />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
