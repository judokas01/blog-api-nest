import { Article, ArticleData } from '@root/model/entities/article'
import { IArticleRepository } from '@root/model/repositories/article'

export class GetArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    get = async (args: Partial<ArticleData>): Promise<Article | null> =>
        await this.articleRepository.findOne(args)
}
