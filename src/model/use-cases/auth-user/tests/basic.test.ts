import { describe, beforeAll, it, expect, afterAll } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { AuthenticateUserUseCase } from '..'
import { User } from '@root/model/entities/user'
import { HasMany } from '@root/model/entities/helpers/relationship'
import {
    creatingTestingContainer,
    destroyTestingContainer,
} from '@root/dependency/application/container/testing-container'
import { IUserRepository } from '@root/model/repositories/user'
import { PrismaUserRepository } from '@root/model/repositories/repositories/user'

describe('UserRepository basic CRUD', () => {
    let authUseCase: AuthenticateUserUseCase
    let userRepository: IUserRepository
    let app: TestingModule

    beforeAll(async () => {
        const app = await creatingTestingContainer()

        authUseCase = app.get<AuthenticateUserUseCase>(AuthenticateUserUseCase)
        userRepository = app.get<IUserRepository>(PrismaUserRepository)

        // some init
        // userRepository = new UserRepository()
    })

    afterAll(async () => {
        await destroyTestingContainer(app)
    })

    it('should insert one user and retrieve it', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: 'email@mail',
            password: 'as',
            username: 'asga',
        })

        const inserted = await userRepository.insertOne(userToCreate.data)

        await authUseCase.authenticate('asga', 'as')

        const found = await userRepository.findById(inserted.id)
        expect(found).toMatchObject(inserted)
    })
})
