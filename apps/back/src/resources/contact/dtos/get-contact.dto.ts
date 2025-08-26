import { PostContactDto } from './post-contact.dto'

export class GetContactDto extends PostContactDto {
  /**
   * The id of the contact form entry.
   * @example 1
   */
  id: number
}
