import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Injectable()
export class PrismaCommentRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}
}
