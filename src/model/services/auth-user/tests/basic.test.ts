import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { omit } from 'ramda'
import { AuthenticateUserService } from '..'
import { User } from '@root/model/entities/user'
import { HasMany } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { cleanDatabase, getTestingModule } from '@root/model/test-utils'
import { InputError, UnauthorizedError } from '@root/model/errors'

describe('Authenticate user user service', () => {
    let testingApp: TestingModule
    let authService: AuthenticateUserService
    let userRepository: UserRepository

    beforeAll(async () => {
        const pp = await getTestingModule({
            additionalProviders: [AuthenticateUserService],
        })

        testingApp = pp.testingApp
        userRepository = pp.repositories.user
        authService = testingApp.get<AuthenticateUserService>(AuthenticateUserService)
    })

    beforeEach(async () => {
        await cleanDatabase(testingApp)
    })

    it('should create new user', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const { user, access_token } = await authService.createUser(userToCreate.data)
        expect(access_token).toBeDefined()

        const foundUser = await userRepository.findById(user.id)

        expect(omit(['articles'], foundUser.data)).toMatchObject(omit(['articles'], user.data))
    })

    it('should authenticate user by its original password', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        await authService.createUser(userToCreate.data)

        const token = await authService.getAuthToken({
            password: userToCreate.data.password,
            username: userToCreate.data.username,
        })

        expect(token).toBeDefined()
    })

    it('should authenticate user by auth token', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const { access_token } = await authService.createUser(userToCreate.data)

        const user = await authService.getUserFromToken(access_token)

        expect(user).not.toBeNull()
    })

    it('should return null when no token is provided', async () => {
        const user = await authService.getUserFromToken()

        expect(user).toBeNull()
    })

    it('should throw error when token in invalid', async () => {
        await expect(authService.getUserFromToken(FAKE_JWT_TOKEN)).rejects.toThrowError(
            UnauthorizedError,
        )
    })

    it('should throw error, when username already exits', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        await userRepository.insertOne(userToCreate.data)

        await expect(authService.createUser(userToCreate.data)).rejects.toThrow(InputError)
    })
})

const FAKE_JWT_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
