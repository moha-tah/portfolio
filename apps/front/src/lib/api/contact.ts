import { client } from './client'
import { components } from './schema'

export type PostContactDto = components['schemas']['PostContactDto']
export async function postContact(dto: PostContactDto) {
  const { data, error } = await client.POST('/contact', {
    body: dto
  })
  if (error) throw new Error(error['message'])
  return data
}
