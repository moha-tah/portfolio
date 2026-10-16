/**
 * Pushes the local content (case studies and articles) into Sanity.
 *   pnpm sanity:seed            write with SANITY_API_WRITE_TOKEN (createOrReplace, safe to re-run)
 *   pnpm sanity:seed --ndjson   print an NDJSON file for `sanity dataset import` instead
 */
import { createClient } from 'next-sanity'

import { POSTS } from '../src/content/posts'
import { PROJECTS } from '../src/content/projects'
import type { Localized } from '../src/content/pt'
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID
} from '../src/sanity/env'

const str = (v: Localized<string>) => ({ _type: 'localeString', ...v })
const txt = (v: Localized<string>) => ({ _type: 'localeText', ...v })
const rich = (v: Localized<unknown[]>) => ({ _type: 'localeRichText', ...v })

type SeedDoc = { _id: string; _type: string; [field: string]: unknown }

export const documents = (): SeedDoc[] => [
  ...PROJECTS.map((p) => ({
    _id: `project-${p.slug}`,
    _type: 'project',
    name: str(p.name),
    slug: { _type: 'slug', current: p.slug },
    order: p.order,
    kind: p.kind,
    year: p.year,
    summary: txt(p.summary),
    tldr: txt(p.tldr),
    tags: p.tags,
    mock: p.mock,
    stack: p.stack,
    meta: p.meta.map((m) => ({
      _key: m._key,
      _type: 'object',
      label: str(m.label),
      value: str(m.value)
    })),
    body: rich(p.body)
  })),
  ...POSTS.map((p) => ({
    _id: `post-${p.slug}`,
    _type: 'post',
    title: str(p.title),
    slug: { _type: 'slug', current: p.slug },
    publishedAt: p.publishedAt,
    category: p.category,
    excerpt: txt(p.excerpt),
    body: rich(p.body)
  }))
]

async function main() {
  const docs = documents()
  if (process.argv.includes('--ndjson')) {
    process.stdout.write(docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
    return
  }
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!SANITY_PROJECT_ID || !token)
    throw new Error(
      'Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first.'
    )
  const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    token,
    useCdn: false
  })
  const tx = client.transaction()
  docs.forEach((d) => tx.createOrReplace(d))
  const res = await tx.commit()
  console.log(
    `Seeded ${res.results.length} documents into ${SANITY_PROJECT_ID}/${SANITY_DATASET}`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
