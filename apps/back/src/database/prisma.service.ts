import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      return
    }

    await this.$connect()
  }
}
