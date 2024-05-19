import { Injectable } from '@nestjs/common'
import { validateCreateCommentInput } from './validations'
import { Article } from '@root/model/entities/article'
import { CommentData, Comment } from '@root/model/entities/comment'
import { HasOne } from '@root/model/entities/helpers/relationship'
import { User } from '@root/model/entities/user'
import { InputError, UnexpectedError } from '@root/model/errors'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

@Injectable()
export class CreateCommentUseCase {
    constructor(
        private commentRepository: CommentRepository,
        private articleRepository: ArticleRepository,
    ) {}

    create = async (
        args: { content: CommentData['content']; articleId: Article['id'] },
        user: User | null,
    ): Promise<Article> => {
        const { articleId, content } = validateCreateCommentInput(args)
        const article = await this.articleRepository.findById(articleId)

        if (!article) {
            throw new InputError({
                message: 'Article not found.',
                payload: { articleId: articleId },
            })
        }

        const commentToCreate = Comment.create({
            article: HasOne.loaded('comment.article', article),
            authorNickName: user?.data.username ?? 'Anonymous',
            content: content,
            uniqueVoteHosts: [],
        })

        await this.commentRepository.insertOne(commentToCreate.data)

        const updatedArticle = await this.articleRepository.findById(article.id)
        if (!article) {
            throw new UnexpectedError({
                message: 'Article not found. This is logic error or data inconsistency.',
                payload: { articleId: article.id },
            })
        }

        return updatedArticle
    }
}
