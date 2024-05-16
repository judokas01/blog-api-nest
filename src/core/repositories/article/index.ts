import { ClearableRepository } from '../common'
import { User } from '@root/core/entities/user'
import { Article, ArticleData } from '@root/core/entities/article'

export interface IArticleRepository extends ClearableRepository {
    insertOne: (data: ArticleData) => Promise<Article>
    updateOne: (article: Article) => Promise<Article>
    deleteOne: (id: Article['id']) => Promise<Article>
    findOne(data: Partial<ArticleData>): Promise<Article | null>
    findById(): Promise<Article | null>
    findManyByUserId(userId: User['id']): Promise<Article | null>
}
