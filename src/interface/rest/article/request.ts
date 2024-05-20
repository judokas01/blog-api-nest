import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FindManyArticlesRequest {
    @ApiPropertyOptional()
    title?: string

    @ApiPropertyOptional()
    perex?: string

    @ApiPropertyOptional()
    authorUsername?: string

    @ApiPropertyOptional()
    createdBefore?: Date

    @ApiPropertyOptional()
    createdAfter?: Date

    @ApiPropertyOptional()
    limit?: number

    @ApiPropertyOptional()
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
    @ApiPropertyOptional()
    title?: string

    @ApiPropertyOptional()
    perex?: string

    @ApiPropertyOptional()
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
