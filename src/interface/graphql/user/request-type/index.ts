import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class LoginUserArgs {
    @Field(() => String)
    username: string

    @Field(() => String)
    password: string
}

@ArgsType()
export class RegisterUserArgs extends LoginUserArgs {
    @Field(() => String)
    email: string
}
