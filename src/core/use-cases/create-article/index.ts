import { ArticleData } from '@root/core/entities/article'
import { IArticleRepository } from '@root/core/repositories/article'

export class CreateArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    create = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
