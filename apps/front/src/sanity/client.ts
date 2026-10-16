import { createClient } from 'next-sanity'

import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  sanityEnabled
} from './env'

export const sanity = sanityEnabled
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
      perspective: 'published'
    })
  : null

/** Fetch from Sanity; any failure resolves to null so pages fall back to local content. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!sanity) return null
  try {
    return await sanity.fetch<T>(query, params, {
      next: { revalidate: 300, tags: ['sanity'] }
    })
  } catch (error) {
    console.error('Sanity fetch failed, using local content', error)
    return null
  }
}
