import { Article } from '@root/model/entities/article'
import { User } from '@root/model/entities/user'
import { InputError, UnauthorizedError } from '@root/model/errors'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class DeleteArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    delete = async (id: Article['id'], user: User | null) => {
        if (!user) {
            throw new UnauthorizedError({ message: 'Invalid user.' })
        }

        const originalArticle = await this.articleRepository.findById(id)
        if (!originalArticle) {
            throw new InputError({
                message: 'Article not found',
                payload: { articleId: id },
            })
        }

        const articleOwnerId = originalArticle.data.author.getId()

        if (articleOwnerId !== user.id) {
            throw new UnauthorizedError({
                message: 'Unauthorized to update article',
                payload: {
                    articleId: id,
                    userId: user.id,
                },
            })
        }

        await this.articleRepository.deleteOne(id)
    }
}
