import { Article } from '@root/model/entities/article'
import { IArticleRepository } from '@root/model/repositories/article'

export class DeleteArticleUseCase {
    constructor(private articleRepository: IArticleRepository) {}

    delete = async (id: Article['id']) => await this.articleRepository.deleteOne(id)
}
