import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Ping the API to check if it is running correctly.
   */
  @Get()
  ping(): string {
    return this.appService.ping()
  }
}
