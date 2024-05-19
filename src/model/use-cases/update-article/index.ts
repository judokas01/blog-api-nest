import { validateUpdateArticleInput } from './validations'
import { Article, ArticleData } from '@root/model/entities/article'
import { User } from '@root/model/entities/user'
import { InputError, UnauthorizedError } from '@root/model/errors'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class UpdateArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    update = async (
        args: {
            articleId: Article['id']
            update: Partial<Pick<ArticleData, 'content' | 'perex' | 'title'>>
        },
        user: User | null,
    ) => {
        if (!user) {
            throw new UnauthorizedError({ message: 'Invalid user.' })
        }

        const { articleId, update } = validateUpdateArticleInput(args)

        const originalArticle = await this.articleRepository.findByIdWithOrderedComments(articleId)
        if (!originalArticle) {
            throw new InputError({
                message: 'Article not found',
                payload: { articleId: articleId },
            })
        }

        const articleOwnerId = originalArticle.data.author.getId()

        if (articleOwnerId !== user.id) {
            throw new UnauthorizedError({
                message: 'Unauthorized to update article',
                payload: {
                    articleId: articleId,
                    userId: user.id,
                },
            })
        }

        return await this.articleRepository.updateOne(articleId, update)
    }
}
