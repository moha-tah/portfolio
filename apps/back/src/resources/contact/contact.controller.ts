import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { PostContactDto } from './dtos/post-contact.dto'
import { GetContactDto } from './dtos/get-contact.dto'
import { Throttle } from '@nestjs/throttler'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Post a contact form entry to the database.
   * @throws {429} Rate limit exceeded (2 requests per hour).
   * @throws {500} Something went wrong.
   */
  @Throttle({ default: { limit: 2, ttl: 1 * 60 * 60 * 1000 } })
  @Post()
  postForm(@Body() postContactDto: PostContactDto): Promise<GetContactDto> {
    return this.contactService.postForm(postContactDto)
  }
}
