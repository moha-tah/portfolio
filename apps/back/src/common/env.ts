import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'deployment', 'preview', 'local', 'test']),
  PORT: z.number().default(3000),
  BACK_URL: z.url(),
  FRONT_URL: z.url()
})

export type Environment = z.infer<typeof envSchema>

export function validate(config: Record<string, unknown>): Environment {
  try {
    const validatedConfig = envSchema.parse(config)
    return validatedConfig
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Invalid environment variable: ${err.message}`)
    }
    throw err
  }
}
