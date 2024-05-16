import { Article, ArticleData } from '@root/core/entities/article'
import { IArticleRepository } from '@root/core/repositories/article'

export class GetArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    get = async (args: Partial<ArticleData>): Promise<Article | null> =>
        await this.articleRepository.findOne(args)
}
