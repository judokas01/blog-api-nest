import { ArticleData } from '@root/model/entities/article'
import { IArticleRepository } from '@root/model/repositories/article'

export class GetManyArticlesUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    get = async (args: Partial<ArticleData>) => await this.articleRepository.findOne(args)
}
