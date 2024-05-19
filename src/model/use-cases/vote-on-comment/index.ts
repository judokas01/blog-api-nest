import { Injectable } from '@nestjs/common'
import { validateVoteOnComment } from './validations'
import { Article } from '@root/model/entities/article'
import { CommentData } from '@root/model/entities/comment'
import { InputError, InputNotFoundError, UnexpectedError } from '@root/model/errors'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

@Injectable()
export class VoteOnCommentUseCase {
    constructor(
        private commentRepository: CommentRepository,
        private articleRepository: ArticleRepository,
    ) {}

    vote = async (args: {
        commentId: CommentData['id']
        vote: 1 | -1
        ip: string
    }): Promise<Article> => {
        const { commentId, vote, ip } = validateVoteOnComment(args)

        const existingComment = await this.commentRepository.findById(commentId)
        if (!existingComment) {
            throw new InputNotFoundError({
                message: 'Comment not found',
                payload: { commentId: commentId },
            })
        }

        if (existingComment.isIpPresent(ip)) {
            throw new InputError({ message: 'You have already voted on this comment' })
        }

        const updated = vote === -1 ? existingComment.downVote(ip) : existingComment.upVote(ip)

        await this.commentRepository.updateOne(updated.id, {
            uniqueVoteHosts: updated.data.uniqueVoteHosts,
            upvoteScore: updated.data.upvoteScore,
        })

        const article = await this.articleRepository.findById(existingComment.data.article.getId())
        if (!article) {
            throw new UnexpectedError({
                message: 'Article not found. This is logic error or data inconsistency.',
                payload: { articleId: existingComment.data.article.getId() },
            })
        }

        return article
    }
}
