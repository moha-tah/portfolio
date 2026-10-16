import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/config'
import { getPosts, getProjects } from '@/lib/content'
import { env } from '@/lib/env'

const CONTENT_LOCALES = ['fr', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_FRONT_URL
  const [projects, posts] = await Promise.all([
    getProjects('en'),
    getPosts('en')
  ])
  const entry = (
    path: string,
    langs: readonly string[],
    priority: number,
    lastModified = new Date()
  ) => ({
    url: `${base}/${langs[0]}${path}`,
    lastModified,
    priority,
    alternates: {
      languages: Object.fromEntries(
        langs.map((l) => [l, `${base}/${l}${path}`])
      )
    }
  })

  return [
    entry('', locales, 1),
    entry('/blog', locales, 0.8),
    ...projects.map((p) => entry(`/projects/${p.slug}`, CONTENT_LOCALES, 0.7)),
    ...posts.map((p) =>
      entry(`/blog/${p.slug}`, CONTENT_LOCALES, 0.8, new Date(p.publishedAt))
    )
  ]
}
