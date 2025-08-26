import { NestFactory } from '@nestjs/core'
import { AppModule } from 'resources/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'fs'
import { join } from 'path'

async function generateSwagger(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    preview: true,
    logger: ['error'],
    abortOnError: false
  })

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  const outputPath = join(__dirname, '..', 'swagger.json')
  writeFileSync(outputPath, JSON.stringify(document, null, 2))

  await app.close()
}

void generateSwagger()
