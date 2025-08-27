import { Injectable } from '@nestjs/common'
import { PostContactDto } from './dtos/post-contact.dto'
import { PrismaService } from 'database/prisma.service'
import { GetContactDto } from './dtos/get-contact.dto'
import { DiscordWebhookService } from 'common/services/discord-webhook.service'
import { ResendService } from 'common/services/resend.service'

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discordWebhook: DiscordWebhookService,
    private readonly resend: ResendService
  ) {}

  async postForm(postContactDto: PostContactDto): Promise<GetContactDto> {
    const contactFormEntry = await this.prisma.contactFormEntry.create({
      data: {
        email: postContactDto.email,
        name: postContactDto.name,
        company: postContactDto.company,
        message: postContactDto.message
      }
    })

    // Send Discord notification
    try {
      await this.discordWebhook.sendContactFormNotification(postContactDto)
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
    }

    // Send email notification
    try {
      await this.resend.sendContactNotification(postContactDto)
    } catch (error) {
      console.error('Failed to send email notification:', error)
    }

    return {
      id: contactFormEntry.id,
      email: contactFormEntry.email,
      name: contactFormEntry.name,
      company: contactFormEntry.company,
      message: contactFormEntry.message
    }
  }
}
