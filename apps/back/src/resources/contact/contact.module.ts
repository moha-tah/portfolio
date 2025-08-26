import { Module } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactController } from './contact.controller'
import { PrismaService } from 'database/prisma.service'
import { DiscordWebhookService } from 'common/services/discord-webhook.service'

@Module({
  controllers: [ContactController],
  providers: [ContactService, PrismaService, DiscordWebhookService]
})
export class ContactModule {}
