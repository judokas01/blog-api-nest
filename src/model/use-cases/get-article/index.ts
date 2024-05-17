import { Injectable } from '@nestjs/common'
import { Article, ArticleData } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

@Injectable()
export class GetArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    get = async (args: Partial<ArticleData>): Promise<Article | null> =>
        this.articleRepository.findOne(args)
}
