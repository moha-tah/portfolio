// Project id and dataset are public by design (they ship in every Studio bundle), so they can default in code.
export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9z0iul4h'
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const SANITY_API_VERSION = '2025-10-01'

export const sanityEnabled = SANITY_PROJECT_ID.length > 0
