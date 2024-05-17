import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { AuthenticateUserUseCase } from '..'
import { User } from '@root/model/entities/user'
import { HasMany } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { UnauthorizedError } from '@root/model/errors'
import { cleanDatabase, getTestingModule } from '@root/model/test-utils'

describe('Authenticate user user use case', () => {
    let testingApp: TestingModule
    let authUseCase: AuthenticateUserUseCase
    let userRepository: UserRepository

    beforeAll(async () => {
        const pp = await getTestingModule({
            additionalProviders: [AuthenticateUserUseCase],
        })

        testingApp = pp.testingApp
        userRepository = pp.repositories.user
        authUseCase = testingApp.get<AuthenticateUserUseCase>(AuthenticateUserUseCase)
    })

    beforeEach(async () => {
        await cleanDatabase(testingApp)
    })

    it('should not throw error when password is correct', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const { data } = await userRepository.insertOne(userToCreate.data)

        await expect(
            authUseCase.authenticate({ userName: data.username, password: data.password }),
        ).resolves.not.toThrow()
    })

    it.each([
        {
            getCredentials: (user: User) => ({
                userName: faker.internet.userName(),
                password: user.data.password,
            }),
            text: 'when userName is not correct',
        },
        {
            getCredentials: (user: User) => ({
                userName: user.data.username,
                password: faker.internet.password(),
            }),
            text: 'when password is not correct',
        },
    ])('should throw UnauthorizedError when $text', async ({ getCredentials }) => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const user = await userRepository.insertOne(userToCreate.data)
        const { password, userName } = getCredentials(user)

        await expect(authUseCase.authenticate({ password, userName })).rejects.toThrow(
            UnauthorizedError,
        )
    })
})
