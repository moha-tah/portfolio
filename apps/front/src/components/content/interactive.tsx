'use client'

import dynamic from 'next/dynamic'

import type { ContentLang } from '@/lib/content'

import styles from './interactive/shared.module.css'

const loading = () => <div className={styles.loading} aria-hidden="true" />

// each simulation is its own chunk, loaded only by the articles that use it
const REGISTRY = {
  hybridPlayground: dynamic(
    () =>
      import('./interactive/hybrid-playground').then((m) => m.HybridPlayground),
    { loading }
  ),
  embeddingMap: dynamic(
    () => import('./interactive/embedding-map').then((m) => m.EmbeddingMap),
    { loading }
  ),
  rrfExplorer: dynamic(
    () => import('./interactive/rrf-explorer').then((m) => m.RrfExplorer),
    { loading }
  ),
  chunkingDemo: dynamic(
    () => import('./interactive/chunking-demo').then((m) => m.ChunkingDemo),
    { loading }
  )
}

export type InteractiveName = keyof typeof REGISTRY
export const INTERACTIVE_NAMES = Object.keys(REGISTRY) as InteractiveName[]

export function Interactive({
  name,
  lang
}: {
  name: InteractiveName
  lang: ContentLang
}) {
  const Component = REGISTRY[name]
  return Component ? <Component lang={lang} /> : null
}
