import { Article } from '@root/core/entities/article'
import { IArticleRepository } from '@root/core/repositories/article'

export class DeleteArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    delete = async (id: Article['id']) => await this.articleRepository.deleteOne(id)
}
