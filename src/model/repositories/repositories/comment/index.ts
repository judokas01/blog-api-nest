import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { toComment } from '../../common/mappers'
import { toPrismaCommentCreate } from './mappers'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { Immutable } from '@root/model/lib/typescript'
import { Comment, CommentData } from '@root/model/entities/comment'

@Injectable()
export class CommentRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}

    insertOne = async (data: Immutable<CommentData>): Promise<Comment> => {
        const created = await this.prisma.comment.create({
            data: toPrismaCommentCreate(data),
        })

        return toComment(created)
    }

    findById = async (id: Comment['id']): Promise<Comment | null> => {
        const found = await this.prisma.comment.findFirst({
            where: { id },
        })

        return found ? toComment(found) : null
    }

    updateOne = async (
        commentId: Comment['id'],
        update: Immutable<Pick<CommentData, 'uniqueVoteHosts' | 'upvoteScore'>>,
    ): Promise<Comment> => {
        const created = await this.prisma.comment.update({
            where: { id: commentId },
            data: {
                upvoteHosts: JSON.stringify(update.uniqueVoteHosts),
                upvoteScore: update.upvoteScore,
            },
        })

        return toComment(created)
    }

    clear = async (): Promise<void> => {
        await this.prisma.comment.deleteMany()
    }
}
