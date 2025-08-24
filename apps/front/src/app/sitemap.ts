import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_FRONT_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    }
  ]
}
