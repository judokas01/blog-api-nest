import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hashSync, compareSync } from 'bcrypt'
import { User } from '@root/model/entities/user'
import { InputError, UnauthorizedError } from '@root/model/errors'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { HasMany } from '@root/model/entities/helpers/relationship'

@Injectable()
export class AuthenticateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    authenticate = async (args: Pick<User['data'], 'username' | 'password'>) => {
        const { username, password } = args
        const user = await this.userRepository.findByUsername(username)

        if (!user || !this.isPasswordCorrect(user, password)) {
            throw new UnauthorizedError({
                message: 'Invalid credentials.',
                payload: { userName: username },
            })
        }

        const payload = { sub: user.id, username: user.data.username, email: user.data.email }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    createUser = async (args: Pick<User['data'], 'username' | 'password' | 'email'>) => {
        const { username, password, email } = args
        const user = await this.userRepository.findByUsername(username)
        if (user) {
            throw new InputError({ message: 'User already exists.', payload: { username } })
        }

        const hashedPassword = hashSync(password, 10)

        const newUser = User.create({
            username,
            password: hashedPassword,
            email,
            articles: HasMany.loaded([], 'user.articles'),
        })

        await this.userRepository.insertOne(newUser.data)

        const payload = { sub: user.id, username: user.data.username, email: user.data.email }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    private isPasswordCorrect = (user: User, password: string) => {
        return compareSync(password, user.data.password)
    }
}
