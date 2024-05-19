import { Injectable } from '@nestjs/common'
import { validateGetIdInput } from './validations'
import { Article } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

@Injectable()
export class GetArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    getById = async (id: Article['id']): Promise<Article | null> => {
        const validatedId = validateGetIdInput(id)
        const article = this.articleRepository.findById(validatedId)
        return article
    }
}
