import { ApiProperty } from '@nestjs/swagger'

export class FindManyArticles {
    @ApiProperty()
    title?: string

    @ApiProperty()
    perex?: string

    @ApiProperty()
    authorUsername?: string

    @ApiProperty()
    createdBefore?: Date

    @ApiProperty()
    createdAfter?: Date

    @ApiProperty()
    limit?: number

    @ApiProperty()
    offset?: number
}

export class CreateArticleRequest {
    @ApiProperty()
    title: string

    @ApiProperty()
    perex: string

    @ApiProperty()
    content: string
}

export class UpdateArticleRequest {
    @ApiProperty()
    title?: string

    @ApiProperty()
    perex?: string

    @ApiProperty()
    content?: string
}

export class CreateCommentRequest {
    @ApiProperty()
    content: string

    @ApiProperty()
    articleId: string
}

export class VoteOnCommentRequest {
    @ApiProperty()
    vote: -1 | 1
}
