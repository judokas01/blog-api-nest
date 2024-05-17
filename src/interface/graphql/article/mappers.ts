import { Article as GqlArticle } from './article.model'
import { Article } from '@root/model/entities/article'

export const toGqlArticle = (article: Article | null): GqlArticle => {
    if (!article) {
        return null
    }
    const { content, createdAt, id, perex, title } = article.data
    return {
        content,
        createdAt,
        id,
        perex,
        title,
    }
}
