import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { validate } from 'common/env'
import { PrismaService } from 'database/prisma.service'
import { ContactModule } from 'resources/contact/contact.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { throttlerConfig } from 'common/throttler.config'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [process.env.NODE_ENV === 'test' ? '.env.test' : '.env'],
      validate
    }),
    ThrottlerModule.forRoot(throttlerConfig),
    ContactModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    PrismaService
  ]
})
export class AppModule {}
