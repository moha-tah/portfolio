import { ThrottlerModuleOptions, minutes } from '@nestjs/throttler'

export const throttlerConfig: ThrottlerModuleOptions = {
  errorMessage: 'Too many requests, slow down!',
  throttlers: [
    {
      ttl: minutes(1),
      limit: 20
    }
  ]
}
