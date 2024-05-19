import { Injectable } from '@nestjs/common'
import { validateCreateArticleInput } from './validations'
import { Article, ArticleData } from '@root/model/entities/article'
import { HasMany, HasOne } from '@root/model/entities/helpers/relationship'
import { User } from '@root/model/entities/user'
import { UnauthorizedError } from '@root/model/errors'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

@Injectable()
export class CreateArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    create = async (data: Pick<ArticleData, 'content' | 'perex' | 'title'>, user: User | null) => {
        const { content, perex, title } = validateCreateArticleInput(data)
        if (!user) {
            throw new UnauthorizedError({ message: 'Invalid user.' })
        }

        const articleToCreate = Article.create({
            content,
            perex,
            title,
            author: HasOne.loaded('article.author', user),
            comments: HasMany.loaded('article.comments', []),
        })

        return await this.articleRepository.insertOne(articleToCreate.data)
    }
}
