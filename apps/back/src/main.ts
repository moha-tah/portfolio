import { NestFactory } from '@nestjs/core'
import { AppModule } from './resources/app/app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { Environment } from 'common/env'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService<Environment, true>)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mohamed Tahiri Portfolio API')
    .setDescription('API for the Mohamed Tahiri Portfolio')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  const outputPath = join(__dirname, '..', 'swagger.json')
  writeFileSync(outputPath, JSON.stringify(document, null, 2))

  app.use(
    '/docs',
    apiReference({
      title: 'API Docs - Mohamed Tahiri',
      content: document,
      servers: [
        {
          url: 'https://api.mohamedtahiri.com',
          description: 'Production'
        },
        configService.get('NODE_ENV') === 'local' && {
          url: `http://localhost:${configService.get('PORT')}`,
          description: 'Local development'
        }
      ]
    })
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.enableCors({
    origin: configService.get<string>('FRONT_URL'),
    credentials: true
  })

  await app.listen(configService.get('PORT'))

  logger.debug('--------------------------------')
  logger.debug('\x1b[34m🌍 ENV:\x1b[0m ' + configService.get('NODE_ENV'))
  logger.debug('\x1b[34m🌍 PORT:\x1b[0m ' + configService.get('PORT'))
  logger.debug('\x1b[32m🔙 Back URL:\x1b[0m ' + configService.get('BACK_URL'))
  logger.debug('\x1b[31m🌐 Front URL:\x1b[0m ' + configService.get('FRONT_URL'))
  logger.debug(
    '\x1b[35m📖 Docs URL:\x1b[0m ' + `${configService.get('BACK_URL')}/docs`
  )
  logger.debug('--------------------------------')
}

void bootstrap()
