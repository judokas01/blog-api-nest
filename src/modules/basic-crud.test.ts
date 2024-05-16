import { describe, beforeAll, it, expect, afterAll } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing'
import { UserAuthModule } from './auth-user'
import { User } from '@root/core/entities/user'
import { HasMany } from '@root/core/entities/helpers/relationship'
import { IUserRepository } from '@root/core/repositories/user'
import { PrismaUserRepository } from '@root/infrastructure/repositories/user/prisma'

describe('UserRepository basic CRUD', () => {
    it('should insert one user and retrieve it', async () => {
        const module = await Test.createTestingModule({
            imports: [UserAuthModule],
        }).compile()

        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: 'email@mail',
            password: 'as',
            username: 'asga',
        })

        const userRepository = module.get<IUserRepository>(PrismaUserRepository)

        const inserted = await userRepository.insertOne(userToCreate.data)

        const found = await userRepository.findById(inserted.id)
        expect(found).toMatchObject(inserted)
    })
})
