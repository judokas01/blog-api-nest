import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { BlogApp } from './app/newapp.module'

async function bootstrap() {
    const app = await NestFactory.create(BlogApp)

    const config = new DocumentBuilder()
        .setTitle('Nest blog app')
        .setDescription('Nest blog app API description')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
    await app.listen(3000)
}
bootstrap()
