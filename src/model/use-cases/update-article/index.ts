import { ArticleData } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class UpdateArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    update = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
