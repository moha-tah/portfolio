import 'server-only'

import { POSTS, type PostCategory } from '@/content/posts'
import {
  type MockKind,
  PROJECTS,
  type ProjectKind,
  type TagKey
} from '@/content/projects'
import type { PT, PTTextBlock } from '@/content/pt'
import type { Locale } from '@/i18n/config'
import { sanityFetch } from '@/sanity/client'

/** Long-form content (case studies, articles) exists in French and English only. */
export type ContentLang = 'fr' | 'en'
export const contentLang = (locale: Locale): ContentLang =>
  locale === 'fr' ? 'fr' : 'en'

export type ProjectCard = {
  slug: string
  order: number
  kind: ProjectKind
  year: string
  name: string
  summary: string
  tags: TagKey[]
  mock: MockKind
}

export type ProjectDoc = ProjectCard & {
  tldr: string
  stack: string[]
  meta: { label: string; value: string }[]
  body: PT
  lang: ContentLang
}

export type PostCard = {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  publishedAt: string
  minutes: number
}

export type PostDoc = PostCard & {
  body: PT
  lang: ContentLang
  updatedAt?: string
}

const plain = (body: PT) =>
  body
    .filter((b): b is PTTextBlock => b._type === 'block')
    .map((b) => b.children.map((c) => c.text).join(''))
    .join(' ')

// interactive blocks take time to read too, so each one counts as a short paragraph
const readingMinutes = (body: PT) => {
  const words = plain(body).split(/\s+/).filter(Boolean).length
  const widgets = body.filter((b) => b._type !== 'block').length
  return Math.max(1, Math.round(words / 220 + widgets * 0.5))
}

/* ---------- projects ---------- */

const PROJECT_CARD = `"slug": slug.current, order, kind, year, "name": coalesce(name[$l], name.en), "summary": coalesce(summary[$l], summary.en), tags, mock`

export async function getProjects(locale: Locale): Promise<ProjectCard[]> {
  const l = contentLang(locale)
  const remote = await sanityFetch<ProjectCard[]>(
    `*[_type == "project" && defined(slug.current)] | order(order asc) { ${PROJECT_CARD} }`,
    { l }
  )
  if (remote?.length) return remote
  return PROJECTS.map((p) => ({
    slug: p.slug,
    order: p.order,
    kind: p.kind,
    year: p.year,
    name: p.name[l],
    summary: p.summary[l],
    tags: p.tags,
    mock: p.mock
  }))
}

export async function getProject(
  slug: string,
  locale: Locale
): Promise<ProjectDoc | null> {
  const l = contentLang(locale)
  const remote = await sanityFetch<Omit<ProjectDoc, 'lang'>>(
    `*[_type == "project" && slug.current == $slug][0] {
      ${PROJECT_CARD},
      "tldr": coalesce(tldr[$l], tldr.en),
      stack,
      "meta": meta[]{ "label": coalesce(label[$l], label.en), "value": coalesce(value[$l], value.en) },
      "body": coalesce(body[$l], body.en)
    }`,
    { slug, l }
  )
  if (remote) return { ...remote, lang: l }
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) return null
  return {
    slug: p.slug,
    order: p.order,
    kind: p.kind,
    year: p.year,
    name: p.name[l],
    summary: p.summary[l],
    tags: p.tags,
    mock: p.mock,
    tldr: p.tldr[l],
    stack: p.stack,
    meta: p.meta.map((m) => ({ label: m.label[l], value: m.value[l] })),
    body: p.body[l],
    lang: l
  }
}

/* ---------- posts ---------- */

type RemotePost = Omit<PostCard, 'minutes'> & { body: PT; updatedAt?: string }

const POST_FIELDS = `"slug": slug.current, "title": coalesce(title[$l], title.en), "excerpt": coalesce(excerpt[$l], excerpt.en), category, publishedAt, "updatedAt": _updatedAt, "body": coalesce(body[$l], body.en)`

export async function getPosts(locale: Locale): Promise<PostCard[]> {
  const l = contentLang(locale)
  const remote = await sanityFetch<RemotePost[]>(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${POST_FIELDS} }`,
    { l }
  )
  const list: RemotePost[] = remote?.length
    ? remote
    : POSTS.map((p) => ({
        slug: p.slug,
        title: p.title[l],
        excerpt: p.excerpt[l],
        category: p.category,
        publishedAt: p.publishedAt,
        body: p.body[l]
      }))
  return list.map(({ body, ...card }) => ({
    ...card,
    minutes: readingMinutes(body ?? [])
  }))
}

export async function getPost(
  slug: string,
  locale: Locale
): Promise<PostDoc | null> {
  const l = contentLang(locale)
  const remote = await sanityFetch<RemotePost>(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
    { slug, l }
  )
  if (remote)
    return { ...remote, minutes: readingMinutes(remote.body ?? []), lang: l }
  const p = POSTS.find((x) => x.slug === slug)
  if (!p) return null
  const body = p.body[l]
  return {
    slug: p.slug,
    title: p.title[l],
    excerpt: p.excerpt[l],
    category: p.category,
    publishedAt: p.publishedAt,
    body,
    minutes: readingMinutes(body),
    lang: l
  }
}
