import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Environment } from '../env'

interface TurnstileVerifyResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  action?: string
  cdata?: string
}

@Injectable()
export class TurnstileService {
  private readonly logger = new Logger(TurnstileService.name)
  private readonly secretKey: string

  constructor(private readonly configService: ConfigService<Environment>) {
    this.secretKey = this.configService.get('TURNSTILE_SECRET_KEY', {
      infer: true
    })!
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const formData = new URLSearchParams()
      formData.append('secret', this.secretKey)
      formData.append('response', token)

      const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData,
          signal: AbortSignal.timeout(10000)
        }
      )

      if (!response.ok) {
        this.logger.error(
          `Turnstile API returned ${response.status}: ${response.statusText}`
        )
        return false
      }

      const result = (await response.json()) as TurnstileVerifyResponse

      if (!result.success && result['error-codes']) {
        this.logger.warn(
          `Turnstile verification failed: ${result['error-codes'].join(', ')}`
        )
      }

      return result.success
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Turnstile verification error: ${error.message}`)
      } else {
        this.logger.error('Unknown error during Turnstile verification')
      }
      return false
    }
  }
}
