import { ArticleData } from '@root/model/entities/article'
import { IArticleRepository } from '@root/model/repositories/article'

export class UpdateArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    update = async (data: ArticleData) => await this.articleRepository.insertOne(data)
}
