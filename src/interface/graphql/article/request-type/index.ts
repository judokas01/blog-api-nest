import { ArgsType, Field, ID } from '@nestjs/graphql'

@ArgsType()
export class GetArticleArgs {
    @Field(() => ID)
    id: string
}
