import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'The article model' })
export class ArticleListItem {
    @Field(() => ID)
    id: string

    @Field()
    perex: string

    @Field()
    title: string

    @Field()
    createdAt: Date

    @Field()
    authorUsername: string

    @Field(() => [ArticleComment], { nullable: true })
    comments: ArticleComment[]
}
@ObjectType({ description: 'The article model' })
export class Article extends ArticleListItem {
    @Field()
    content: string

    @Field(() => [ArticleComment], { nullable: true })
    comments: ArticleComment[]
}

@ObjectType({ description: 'The article comment' })
export class ArticleComment {
    @Field(() => ID)
    id: string

    @Field()
    authorUsername: string

    @Field()
    content: string

    @Field()
    upvoteScore: number

    @Field()
    createdAt: Date
}
