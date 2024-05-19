import { RegistrationResponse } from './response-type'
import { User } from '@root/model/entities/user'

export const toRegisterUserResponse = (args: {
    user: User
    accessToken: string
}): RegistrationResponse => ({
    user: {
        email: args.user.data.email,
        id: args.user.id,
        username: args.user.data.username,
    },
    authToken: args.accessToken,
})
