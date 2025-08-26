import { Injectable } from '@nestjs/common'
import { PostContactDto } from './dtos/post-contact.dto'
import { PrismaService } from 'database/prisma.service'
import { GetContactDto } from './dtos/get-contact.dto'

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async postForm(postContactDto: PostContactDto): Promise<GetContactDto> {
    const contactFormEntry = await this.prisma.contactFormEntry.create({
      data: {
        email: postContactDto.email,
        name: postContactDto.name,
        company: postContactDto.company,
        message: postContactDto.message
      }
    })

    return {
      id: contactFormEntry.id,
      email: contactFormEntry.email,
      name: contactFormEntry.name,
      company: contactFormEntry.company,
      message: contactFormEntry.message
    }
  }
}
