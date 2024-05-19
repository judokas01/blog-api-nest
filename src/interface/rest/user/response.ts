import { ApiProperty } from '@nestjs/swagger'
import { User as CoreUser } from '@root/model/entities/user'

export class AuthToken {
    @ApiProperty()
    accessToken: string
}

export class User {
    @ApiProperty()
    id: string

    @ApiProperty()
    username: string

    @ApiProperty()
    email: string
}

export class SingInResponse extends AuthToken {
    @ApiProperty()
    user: User
}

export const headerResponse = {
    Authorization: {
        description: 'Bearer token to use for further requests',
        type: 'string',
    },
}

export const toUserRestResponse = (user: CoreUser): User => ({
    email: user.data.email,
    id: user.id,
    username: user.data.username,
})
