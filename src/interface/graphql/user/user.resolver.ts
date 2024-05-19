import { Args, Query, Resolver, Context, Mutation } from '@nestjs/graphql'
import { GqlContextRequest } from '../types'
import { LoginUserArgs, RegisterUserArgs } from './request-type'
import { RegistrationResponse, UserAuth } from './response-type'
import { toRegisterUserResponse } from './mappers'
import { User } from '@root/interface/rest/user/response'
import { AuthenticateUserService } from '@root/model/services/auth-user'

@Resolver(() => User)
export class UserResolver {
    constructor(private authService: AuthenticateUserService) {}
    @Query(() => UserAuth)
    async logIn(
        @Args() args: LoginUserArgs,
        @Context() { res }: GqlContextRequest,
    ): Promise<UserAuth> {
        const { accessToken } = await this.authService.getAuthToken(args)
        res.setHeader('Authorization', `Bearer ${accessToken}`)
        return { authToken: accessToken }
    }

    @Mutation(() => RegistrationResponse)
    async register(
        @Args() args: RegisterUserArgs,
        @Context() { res }: GqlContextRequest,
    ): Promise<RegistrationResponse> {
        const result = await this.authService.createUser(args)
        res.setHeader('Authorization', `Bearer ${result.accessToken}`)
        return toRegisterUserResponse(result)
    }
}
