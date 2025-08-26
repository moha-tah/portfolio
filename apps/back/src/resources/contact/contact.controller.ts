import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { PostContactDto } from './dtos/post-contact.dto'
import { GetContactDto } from './dtos/get-contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Post a contact form entry to the database.
   */
  @Post()
  postForm(@Body() postContactDto: PostContactDto): Promise<GetContactDto> {
    return this.contactService.postForm(postContactDto)
  }
}
