import { faker } from '@faker-js/faker'
import { User, UserData } from '..'
import { HasMany } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'

export const getRandomUserData = ({
    articles = HasMany.unloaded('user.articles'),
    email = faker.internet.email(),
    password = faker.internet.password(),
    username = faker.internet.userName(),
}: Partial<Omit<UserData, 'id'>> = {}) => ({
    articles,
    email,
    password,
    username,
})

export const createUserWithAuth = async (
    overrides: Partial<UserData> | undefined,
    userRepository: UserRepository,
) => {
    const user = User.create(getRandomUserData(overrides))
    return await userRepository.insertOne(user.data)
}

export const userMock = {
    random: {
        data: getRandomUserData,
        createOne: createUserWithAuth,
    },
}
