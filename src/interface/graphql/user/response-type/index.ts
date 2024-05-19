import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'The user model' })
export class User {
    @Field(() => ID)
    id: string

    @Field()
    username: string

    @Field()
    email: string
}

@ObjectType({ description: 'The user model' })
export class UserAuth {
    @Field(() => ID)
    authToken: string
}

@ObjectType({ description: 'The user model' })
export class RegistrationResponse extends UserAuth {
    @Field(() => User)
    user: User
}
