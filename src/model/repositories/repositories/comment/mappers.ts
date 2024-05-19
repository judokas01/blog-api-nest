import { Prisma, Comment as PrismaComment } from '@prisma/client'
import { CommentData, Comment } from '@root/model/entities/comment'
import { HasOne } from '@root/model/entities/helpers/relationship'
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

export const toComment = (comment: PrismaComment): Comment =>
    new Comment({
        article: HasOne.unloaded('comment.article', comment.articleId),
        authorNickName: comment.authorNickName,
        content: comment.content,
        createdAt: comment.createdAt,
        id: comment.id,
        uniqueVoteHosts: JSON.parse(comment.upvoteHosts) as string[],
        upvoteScore: comment.upvoteScore,
    })
