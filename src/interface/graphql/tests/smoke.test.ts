import { describe, beforeAll, it, expect, beforeEach, afterAll } from 'vitest'
import { faker } from '@faker-js/faker'
import { User } from '@root/model/entities/user'
import { HasMany, HasOne } from '@root/model/entities/helpers/relationship'
import {
    getTestingInterfaceApp,
    TestingRepositories,
    TestingInterfaceApp,
} from '@root/model/test-utils/interface-app'
import { Article } from '@root/model/entities/article'

describe('Authenticate user user use case', () => {
    let testingApp: TestingInterfaceApp
    let repositories: TestingRepositories

    beforeAll(async () => {
        testingApp = await getTestingInterfaceApp()
        repositories = testingApp.repositories
    })

    beforeEach(async () => {
        await testingApp.cleanDb()
    })

    afterAll(async () => {
        await testingApp.stop()
    })

    it('should not throw error when password is correct', async () => {
        const userToCreate = User.create({
            articles: HasMany.unloaded('user.articles'),
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.internet.userName(),
        })

        const user = await repositories.user.insertOne(userToCreate.data)

        const articleToCreate = Article.create({
            author: HasOne.loaded('article.user', user),
            comments: HasMany.unloaded('article.comments'),
            content: 'content',
            title: 'title',
            perex: 'perex',
        })

        const { id } = await repositories.article.insertOne(articleToCreate.data)

        const res = await testingApp.gqlQuery(
            'getArticle',
            responseQuery,
            { id: { type: 'ID!', value: id } },
            {
                auth: {
                    password: 'pass',
                    username: 'user',
                },
            },
        )

        expect(res.body.data.getArticle.id).toEqual(id)
    })
})

const responseQuery = `{
    id
  }`
