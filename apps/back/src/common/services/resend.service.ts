import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Environment } from '../../common/env'
import { PostContactDto } from '../../resources/contact/dtos/post-contact.dto'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { ContactNotificationTemplate } from '../../emails/templates/contact-notification.template'
import * as React from 'react'

@Injectable()
export class ResendService {
  private readonly logger = new Logger(ResendService.name)
  private readonly apiKey: string
  private readonly resend: Resend

  constructor(
    private readonly configService: ConfigService<Environment, true>
  ) {
    this.apiKey = this.configService.get('RESEND_API_KEY')
    this.resend = new Resend(this.apiKey)
  }

  async sendContactNotification(contact: PostContactDto): Promise<void> {
    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const emailHtml = await render(
          React.createElement(ContactNotificationTemplate, { contact })
        )

        const result = await this.resend.emails.send({
          from: 'Mohamed Tahiri <no-reply@ack.mohamedtahiri.com>',
          to: [contact.email],
          bcc: ['me@mohamedtahiri.com'],
          subject: 'Thank you for contacting me!',
          html: emailHtml
        })

        if (result.error) {
          throw new Error(`Resend API error: ${result.error.message}`)
        }

        this.logger.log(
          `Contact notification email sent successfully to ${contact.email}`
        )
        return
      } catch (error) {
        lastError = error as Error

        this.logger.warn(
          `Resend email attempt ${attempt}/${maxRetries} failed: ${lastError.message}`
        )

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    this.logger.error(
      `Resend email failed after ${maxRetries} attempts`,
      lastError
    )
    throw lastError || new Error('Email sending failed after maximum retries')
  }
}
