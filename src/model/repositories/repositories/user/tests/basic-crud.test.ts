import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { omit } from 'ramda'
import { User } from '@root/model/entities/user'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { cleanDatabase, getTestingModule } from '@root/model/test-utils'
import { userMock } from '@root/model/entities/user/mock'

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
        const userToCreate = User.create(userMock.random.data())

        const inserted = await userRepository.insertOne(userToCreate.data)

        const found = await userRepository.findById(inserted.id)
        expect(omit(['articles'], found.data)).toMatchObject(omit(['articles'], inserted.data))
    })
})
