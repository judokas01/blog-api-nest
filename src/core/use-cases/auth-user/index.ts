import { Inject } from '@nestjs/common'
import { IUserRepository, IUserRepositoryToken } from '@root/core/repositories/user'

export class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    authenticate = async (userName: string, password: string) => {
        const user = await this.userRepository.findByUsername(userName)

        if (!user) {
            throw new Error('User not found')
        }

        if (user.data.password !== password) {
            throw new Error('Invalid password')
        }

        return user
    }
}
