import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'preview', 'local', 'test']),
  PORT: z.number().default(3000),
  BACK_URL: z.url(),
  FRONT_URL: z.url(),
  DATABASE_URL: z.url(),
  DISCORD_WEBHOOK_URL: z.url(),
  SEND_WEBHOOKS: z
    .string()
    .default('true')
    .transform((value) => value === 'true'),
  RESEND_API_KEY: z.string(),
  SEND_EMAILS: z
    .string()
    .default('true')
    .transform((value) => value === 'true')
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
