import { ArticleData } from '@root/core/entities/article'
import { IArticleRepository } from '@root/core/repositories/article'

export class UpdateArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    update = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
