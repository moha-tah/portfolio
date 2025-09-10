import type { MetadataRoute } from 'next'

import { staticProjects } from '@/components/projects/get-projects'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls: MetadataRoute.Sitemap = staticProjects.map(({ slug }) => ({
    url: `${env.NEXT_PUBLIC_FRONT_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [
    {
      url: env.NEXT_PUBLIC_FRONT_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: env.NEXT_PUBLIC_FRONT_URL + '/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...projectUrls
  ]
}
