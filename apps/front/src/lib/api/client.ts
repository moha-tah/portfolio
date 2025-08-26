import createClient, { Middleware } from 'openapi-fetch'

import { paths } from './schema'
import { env } from '../env'

export const client = createClient<paths>({
  fetch,
  baseUrl: env.NEXT_PUBLIC_BACK_URL || '/api'
})

const errorMiddleware: Middleware = {
  async onResponse({ response }) {
    // If 5xx then throw an error
    if (!response.ok && response.status >= 500) {
      const error = await response.json()
      throw new Error(`${response.status} ${error.message}`)
    }
  }
}
client.use(errorMiddleware)
