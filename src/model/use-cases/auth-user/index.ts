import { Injectable } from '@nestjs/common'
import { User } from '@root/model/entities/user'
import { UnauthorizedError } from '@root/model/errors'
import { UserRepository } from '@root/model/repositories/repositories/user'

@Injectable()
export class AuthenticateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    authenticate = async (args: { userName: string; password: string }) => {
        const { userName, password } = args
        const user = await this.userRepository.findByUsername(userName)

        if (!user || !this.isPasswordCorrect(user, password)) {
            throw new UnauthorizedError({ message: 'Invalid credentials', payload: { userName } })
        }
    }

    private isPasswordCorrect = (user: User, password: string) => user.data.password === password
}
