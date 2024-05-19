import { Prisma } from '@prisma/client'
import { CommentData } from '@root/model/entities/comment'
import { Immutable } from '@root/model/lib/typescript'

export const toPrismaCommentCreate = (data: Immutable<CommentData>): Prisma.CommentCreateInput => ({
    article: {
        connect: { id: data.article.getId() },
    },
    authorNickName: data.authorNickName,
    content: data.content,
    id: data.id,
    upvoteHosts: JSON.stringify(data.uniqueVoteHosts),
    createdAt: data.createdAt,
    upvoteScore: data.upvoteScore,
})
