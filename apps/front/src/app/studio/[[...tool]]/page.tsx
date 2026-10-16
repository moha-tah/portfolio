import { NextStudio } from 'next-sanity/studio'

import { sanityEnabled } from '@/sanity/env'

import config from '../../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!sanityEnabled) {
    return (
      <p style={{ padding: 40, fontFamily: 'system-ui', color: '#eceef2' }}>
        Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID to open the
        Studio.
      </p>
    )
  }
  return <NextStudio config={config} />
}
