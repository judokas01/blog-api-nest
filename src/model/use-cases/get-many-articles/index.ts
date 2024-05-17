import { ArticleData } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class GetManyArticlesUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    get = async (args: Partial<ArticleData>) => await this.articleRepository.findOne(args)
}
