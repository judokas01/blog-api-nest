import { ApiProperty } from '@nestjs/swagger'

export class LoginInput {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string
}

export class RegisterInput extends LoginInput {
    @ApiProperty()
    email: string
}
