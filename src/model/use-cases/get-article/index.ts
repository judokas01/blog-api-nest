import { Injectable } from '@nestjs/common'
import { Article } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

@Injectable()
export class GetArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    getById = async (id: Article['id']): Promise<Article | null> =>
        this.articleRepository.findById(id)
}
