import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'

import { User } from '@root/model/entities/user'
import { HasMany } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { cleanDatabase, getTestingModule } from '@root/model/test-utils'

describe('UserRepository basic CRUD', () => {
    let userRepository: UserRepository
    let app: TestingModule

    beforeAll(async () => {
        const testingModule = await getTestingModule()
        userRepository = testingModule.repositories.user
        app = testingModule.testingApp
    })

    beforeEach(async () => {
        await cleanDatabase(app)
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
