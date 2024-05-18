import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { AuthenticateUserService } from '..'
import { User } from '@root/model/entities/user'
import { HasMany } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { cleanDatabase, getTestingModule } from '@root/model/test-utils'

describe('Authenticate user user use case', () => {
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

    it('should not throw error when password is correct', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const { user, access_token } = await authService.createUser(userToCreate.data)
        expect(access_token).toBeDefined()

        const foundUser = await userRepository.findById(user.id)

        expect(foundUser.data).toMatchObject(user.data)
    })
})
