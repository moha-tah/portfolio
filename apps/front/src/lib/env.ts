import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

if (process.env.VERCEL_ENV) {
  process.env.NEXT_PUBLIC_FRONT_URL = `https://${process.env.VERCEL_URL}`
}

export const env = createEnv({
  client: {
    NEXT_PUBLIC_FRONT_URL: z.url()
  },
  server: {
    NODE_ENV: z.enum(['production', 'development', 'preview', 'local'])
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL
  }
})
