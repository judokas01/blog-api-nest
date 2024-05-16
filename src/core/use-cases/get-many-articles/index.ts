import { ArticleData } from '@root/core/entities/article'
import { IArticleRepository } from '@root/core/repositories/article'

export class GetManyArticlesUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    get = async (args: Partial<ArticleData>) => await this.articleRepository.findOne(args)
}
