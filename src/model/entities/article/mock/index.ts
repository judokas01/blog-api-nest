import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { ArticleData } from '..'
import { HasMany, HasOne } from '../../helpers/relationship'
import { userMock } from '../../user/mock'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { UserRepository } from '@root/model/repositories/repositories/user'

export const getRandomArticleData = ({
    id = randomUUID(),
    title = faker.lorem.words({ min: 1, max: 5 }),
    content = faker.lorem.paragraphs({ min: 1, max: 5 }),
    perex = faker.lorem.words({ min: 10, max: 30 }),
    createdAt = new Date(),
    author = HasOne.unloaded('article.author'),
    comments = HasMany.unloaded('article.comments'),
}: Partial<ArticleData> = {}) => ({
    id,
    title,
    content,
    perex,
    createdAt,
    author,
    comments,
})

export const createOneArticle = async (
    overrides: Partial<ArticleData> | undefined,
    repositories: {
        user: UserRepository
        article: ArticleRepository
    },
) => {
    const user = await userMock.random.createOne(undefined, repositories.user)
    const articleToCreate = getRandomArticleData({
        ...overrides,
        author: HasOne.loaded('article.author', user),
    })

    const article = await repositories.article.insertOne(articleToCreate)

    return { article, user }
}

export const articleMock = {
    random: {
        getData: getRandomArticleData,
        createOne: createOneArticle,
    },
}
