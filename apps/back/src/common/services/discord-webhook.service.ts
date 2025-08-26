import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Environment } from 'common/env'
import { PostContactDto } from 'resources/contact/dtos/post-contact.dto'
import axios, { AxiosInstance, AxiosError } from 'axios'

export interface DiscordEmbedField {
  name: string
  value: string
  inline?: boolean
}

export interface DiscordEmbed {
  title?: string
  description?: string
  color?: number
  fields?: DiscordEmbedField[]
  timestamp?: string
}

export interface DiscordWebhookPayload {
  content?: string
  embeds?: DiscordEmbed[]
}

@Injectable()
export class DiscordWebhookService {
  private readonly logger = new Logger(DiscordWebhookService.name)
  private readonly webhookUrl: string
  private readonly httpClient: AxiosInstance

  constructor(
    private readonly configService: ConfigService<Environment, true>
  ) {
    this.webhookUrl = this.configService.get('DISCORD_WEBHOOK_URL')
    this.httpClient = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async sendMessage(payload: DiscordWebhookPayload): Promise<void> {
    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.httpClient.post(this.webhookUrl, payload)
        this.logger.log('Discord webhook message sent successfully')
        return
      } catch (error) {
        lastError = error as Error
        const isAxiosError = error instanceof AxiosError

        if (isAxiosError) {
          const status = error.response?.status
          const statusText = error.response?.statusText || 'Unknown error'

          // Don't retry on 4xx errors (client errors)
          if (status && status >= 400 && status < 500) {
            this.logger.error(
              `Discord webhook failed with client error: ${status} ${statusText}`,
              error
            )
            throw error
          }

          this.logger.warn(
            `Discord webhook attempt ${attempt}/${maxRetries} failed: ${status} ${statusText}`
          )
        } else {
          this.logger.warn(
            `Discord webhook attempt ${attempt}/${maxRetries} failed: ${lastError?.message || 'Unknown error'}`
          )
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    this.logger.error(
      `Discord webhook failed after ${maxRetries} attempts`,
      lastError
    )
    throw lastError || new Error('Discord webhook failed after maximum retries')
  }

  async sendContactFormNotification(contact: PostContactDto): Promise<void> {
    const embed: DiscordEmbed = {
      title: '📧 New contact form entry',
      color: 0x5865f2,
      fields: [
        {
          name: '👤 Name',
          value: contact.name,
          inline: true
        },
        {
          name: '🏢 Company',
          value: contact.company,
          inline: true
        },
        {
          name: '📧 E-mail',
          value: contact.email,
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    }

    if (contact.message) {
      embed.fields?.push({
        name: '💬 Message',
        value:
          contact.message.length > 1000
            ? contact.message.substring(0, 1000) + '...'
            : contact.message,
        inline: false
      })
    }

    await this.sendMessage({
      content: '🚀 Someone has filled out your contact form!',
      embeds: [embed]
    })
  }
}
