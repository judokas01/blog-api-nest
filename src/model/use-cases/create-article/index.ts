import { ArticleData } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class CreateArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    create = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
