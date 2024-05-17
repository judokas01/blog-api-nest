import { ArticleData } from '@root/model/entities/article'
import { IArticleRepository } from '@root/model/repositories/article'

export class CreateArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    create = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
