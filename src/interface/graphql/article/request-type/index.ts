import { ArgsType, Field, ID, InputType } from '@nestjs/graphql'

@InputType()
class GetManyArticlesFilters {
    @Field()
    title?: string

    @Field()
    perex?: string

    @Field()
    authorUsername?: string

    @Field()
    createdBefore?: Date

    @Field()
    createdAfter?: Date
}

@InputType()
class GetManyArticlesPagination {
    @Field()
    limit: number

    @Field()
    offset: number
}

@ArgsType()
export class ArticleId {
    @Field(() => ID)
    id: string
}

@ArgsType()
export class GetManyArticlesArgs {
    @Field(() => GetManyArticlesFilters, { nullable: true })
    filters?: GetManyArticlesFilters

    @Field(() => GetManyArticlesPagination, { nullable: true })
    pagination?: GetManyArticlesPagination
}

@ArgsType()
export class NewArticleArgs {
    @Field({ description: 'The title of the article' })
    title: string

    @Field()
    content: string

    @Field()
    perex: string
}

@ArgsType()
export class UpdateArticleArgs extends ArticleId {
    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    content?: string

    @Field({ nullable: true })
    perex?: string
}

@ArgsType()
export class CreateCommentArgs {
    @Field()
    content: string

    @Field(() => ID)
    articleId: string
}

@ArgsType()
export class VoteOnCommentArgs {
    @Field()
    vote: number

    @Field()
    commentId: string
}
