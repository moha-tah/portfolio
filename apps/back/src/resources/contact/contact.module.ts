import { Module } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactController } from './contact.controller'
import { PrismaService } from 'database/prisma.service'
import { DiscordWebhookService } from 'common/services/discord-webhook.service'
import { ResendService } from 'common/services/resend.service'
import { TurnstileService } from 'common/services/turnstile.service'

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    PrismaService,
    DiscordWebhookService,
    ResendService,
    TurnstileService
  ]
})
export class ContactModule {}
