import { describe, beforeAll, it, expect } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { IUserRepository } from '..'
import { User } from '@root/core/entities/user'
import { HasMany } from '@root/core/entities/helpers/relationship'
import { PrismaUserRepository } from '@root/infrastructure/repositories/user/prisma'

describe('UserRepository basic CRUD', () => {
    let userRepository: IUserRepository

    beforeAll(async () => {
        const prisma = new PrismaClient()
        userRepository = new PrismaUserRepository(prisma)
        // some init
        // userRepository = new UserRepository()
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
