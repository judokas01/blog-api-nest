import { Article } from '@root/model/entities/article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export class DeleteArticleUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    delete = async (id: Article['id']) => await this.articleRepository.deleteOne(id)
}
