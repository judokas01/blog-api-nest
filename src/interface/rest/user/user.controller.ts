import { Body, Controller, Post, Res, UseFilters } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { HttpExceptionFilter } from '../error-handler'
import { AuthToken, SingInResponse, headerResponse, toUserRestResponse } from './response'
import { LoginInput, RegisterInput } from './request'
import { AuthenticateUserService } from '@root/model/services/auth-user'

@UseFilters(HttpExceptionFilter)
@ApiResponse({ status: 404, description: 'User not found' })
@Controller({ path: '/auth' })
export class UserController {
    constructor(private authService: AuthenticateUserService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Log in' })
    @ApiOkResponse({
        description: 'Logged in user response.',
        type: AuthToken,
        headers: headerResponse,
    })
    async login(
        @Body() loginBody: LoginInput,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthToken> {
        const { accessToken } = await this.authService.getAuthToken(loginBody)
        res.setHeader('Authorization', `Bearer ${accessToken}`)
        return {
            accessToken,
        }
    }

    @Post('/register')
    @ApiOperation({ summary: 'register user' })
    @ApiOkResponse({
        description: 'Registered user response.',
        type: SingInResponse,
        headers: headerResponse,
    })
    async singIn(
        @Body() registerBody: RegisterInput,
        @Res({ passthrough: true }) res: Response,
    ): Promise<SingInResponse> {
        const { accessToken, user } = await this.authService.createUser(registerBody)
        res.setHeader('Authorization', `Bearer ${accessToken}`)
        return { accessToken: accessToken, user: toUserRestResponse(user) }
    }
}
