import { client } from './client'
import { components } from './schema'

export type PostContactDto = components['schemas']['PostContactDto']
export async function postContact(dto: PostContactDto) {
  const { data, error, response } = await client.POST('/contact', {
    body: dto
  })
  if (response.status === 429) throw new Error('Rate limit exceeded')
  if (error) throw new Error(error['message'])
  return data
}
