import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'The article model' })
export class Article {
    @Field(() => ID)
    id: string

    @Field({ description: 'The title of the article' })
    title: string

    @Field()
    content: string

    @Field()
    perex: string

    @Field()
    createdAt: Date
}
