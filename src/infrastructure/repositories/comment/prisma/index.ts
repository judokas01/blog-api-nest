import { Injectable } from '@nestjs/common'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { ICommentRepository } from '@root/core/repositories/comment'

@Injectable()
export class PrismaCommentRepository implements ICommentRepository {
    constructor(private prisma: PrismaService) {}
}
