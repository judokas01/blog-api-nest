import { describe, beforeAll, it, expect, afterAll } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { IUserRepository } from '..'
import { User } from '@root/core/entities/user'
import { HasMany } from '@root/core/entities/helpers/relationship'
import { PrismaUserRepository } from '@root/infrastructure/repositories/user/prisma'
import {
    creatingTestingContainer,
    destroyTestingContainer,
} from '@root/dependency/application/container/testing-container'

describe('UserRepository basic CRUD', () => {
    let userRepository: IUserRepository
    let app: TestingModule

    beforeAll(async () => {
        const app = await creatingTestingContainer()

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

        const found = await userRepository.findById(inserted.id)
        expect(found).toMatchObject(inserted)
    })
})
