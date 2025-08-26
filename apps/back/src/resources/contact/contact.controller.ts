import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { PostContactDto } from './dtos/post-contact.dto'
import { GetContactDto } from './dtos/get-contact.dto'
import { Throttle } from '@nestjs/throttler'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Post a contact form entry to the database.
   * @remarks Rate limit is 3 requests per minute.
   */
  @Throttle({ default: { limit: 3, ttl: 1 * 60 * 1000 } })
  @Post()
  postForm(@Body() postContactDto: PostContactDto): Promise<GetContactDto> {
    return this.contactService.postForm(postContactDto)
  }
}
