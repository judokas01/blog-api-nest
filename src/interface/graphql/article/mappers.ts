import { ArticleComment, ArticleListItem, Article as GqlArticle } from './response-type'
import { Article } from '@root/model/entities/article'
import { Comment } from '@root/model/entities/comment'

export const toGqlArticle = (article: Article | null): GqlArticle => {
    if (!article) {
        return null
    }
    const { content, createdAt, id, perex, title, comments, author } = article.data
    return {
        content,
        createdAt,
        id,
        perex,
        title,
        authorUsername: author.get().data.username,
        comments: comments.get().map(toArticleComment),
    }
}

export const toGqlArticleListItem = (article: Article): ArticleListItem => {
    const { content, createdAt, id, perex, title, author } = article.data
    return {
        content,
        createdAt,
        id,
        perex,
        title,
        authorUsername: author.get().data.username,
    }
}

const toArticleComment = (comment: Readonly<Comment>): ArticleComment => ({
    authorUsername: comment.data.authorNickName,
    content: comment.data.content,
    createdAt: comment.data.createdAt,
    id: comment.data.id,
    upvoteScore: comment.data.upvoteScore,
})
