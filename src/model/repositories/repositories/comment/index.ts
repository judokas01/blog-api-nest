import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Injectable()
export class CommentRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}

    clear = async (): Promise<void> => {
        await this.prisma.comment.deleteMany()
    }
}
