import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hashSync, compareSync } from 'bcrypt'
import { JWT_SECRET } from './JWT_SECRET'
import { User } from '@root/model/entities/user'
import { InputError, UnauthorizedError } from '@root/model/errors'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { HasMany } from '@root/model/entities/helpers/relationship'

@Injectable()
export class AuthenticateUserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    getAuthToken = async (args: Pick<User['data'], 'username' | 'password'>) => {
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
            accessToken: await this.jwtService.signAsync(payload),
        }
    }

    getUserFromToken = async (token?: string): Promise<User | null> => {
        if (!token) {
            return null
        }

        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: JWT_SECRET,
            })
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            const user = await this.userRepository.findById(payload.id)
            return user
        } catch {
            throw new UnauthorizedError({ message: 'Invalid token.' })
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

        const createUser = await this.userRepository.insertOne(newUser.data)

        const payload: JwtPayload = {
            id: createUser.id,
            username: createUser.data.username,
            email: createUser.data.email,
        }
        return {
            user: createUser,
            accessToken: await this.jwtService.signAsync(payload),
        }
    }

    private isPasswordCorrect = (user: User, password: string) => {
        return compareSync(password, user.data.password)
    }
}

export type JwtPayload = {
    id: string
    username: string
    email: string
}
