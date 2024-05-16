import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AppService {
    async getHello(): Promise<string> {
        const prisma = new PrismaClient()
        await prisma.$connect()

        return JSON.stringify('result')
    }
}
