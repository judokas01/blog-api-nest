import { IUserRepository } from '..'
import { User } from '@root/core/entities/user'
import { HasMany } from '@root/core/entities/helpers/relationship'

describe('UserRepository basic CRUD', () => {
    let userRepository: IUserRepository

    beforeAll(async () => {
        // some init
        // userRepository = new UserRepository()
    })

    it('should insert one user and retrieve it', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: '',
            password: '',
            username: '',
        })

        const inserted = await userRepository.insertOne(userToCreate.data)

        const found = await userRepository.findById(inserted.id)
        expect(found).toEqual(inserted)
    })
})
