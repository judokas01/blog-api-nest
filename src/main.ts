import { env } from 'process'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { a } from '@root/core'

async function bootstrap() {
    console.log(env.DATABASE_URL)
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}
bootstrap()
a
