import { NestFactory } from '@nestjs/core'
import { BlogApp } from './app/newapp.module'

async function bootstrap() {
    const app = await NestFactory.create(BlogApp)
    await app.listen(3000)
}
bootstrap()
