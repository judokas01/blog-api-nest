import { env } from 'process'
import { NestFactory } from '@nestjs/core'
import { BlogApp } from './app/newapp.module'

async function bootstrap() {
    console.log(env.DATABASE_URL)
    const app = await NestFactory.create(BlogApp)
    await app.listen(3000)
}
bootstrap()
