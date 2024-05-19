import { ApiProperty } from '@nestjs/swagger'
import { Article as CoreArticle } from '@root/model/entities/article'
import { Comment } from '@root/model/entities/comment'

export class ArticleListItem {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string

    @ApiProperty()
    authorUsername: string

    @ApiProperty({ example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' })
    perex: string

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z' })
    createdAt: Date
}

export class Article extends ArticleListItem {
    @ApiProperty()
    content: string

    @ApiProperty()
    comments: ArticleComment[]
}

export class ArticleComment {
    @ApiProperty()
    id: string

    @ApiProperty()
    authorNickName: string

    @ApiProperty()
    content: string

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    upvoteScore: number
}

export const toArticleResponse = (article: CoreArticle): Article => ({
    authorUsername: article.data.author.get().data.username,
    content: article.data.content,
    createdAt: article.data.createdAt,
    id: article.id,
    perex: article.data.perex,
    title: article.data.title,
    comments: article.data.comments.get().map(toArticleComment),
})

export const toArticleItemResponse = (article: CoreArticle): ArticleListItem => ({
    authorUsername: article.data.author.get().data.username,
    createdAt: article.data.createdAt,
    id: article.id,
    perex: article.data.perex,
    title: article.data.title,
})

export class DeleteArticleResponse {
    @ApiProperty()
    id: string
}

const toArticleComment = (comment: Comment): ArticleComment => ({
    authorNickName: comment.data.authorNickName,
    content: comment.data.content,
    createdAt: comment.data.createdAt,
    id: comment.id,
    upvoteScore: comment.data.upvoteScore,
})
