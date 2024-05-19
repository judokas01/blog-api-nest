import { faker } from '@faker-js/faker'
import { UserData } from '..'
import { HasMany } from '@root/model/entities/helpers/relationship'

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
