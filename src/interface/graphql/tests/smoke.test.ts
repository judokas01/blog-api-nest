import { describe, beforeAll, it, expect, beforeEach, afterAll } from 'vitest'
import {
    getTestingInterfaceApp,
    TestingRepositories,
    TestingInterfaceApp,
} from '@root/model/test-utils/interface-app'
import { articleMock } from '@root/model/entities/article/mock'

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

    it('should retrieve article', async () => {
        const { article } = await articleMock.random.createOne(undefined, repositories)

        const res = await testingApp.gqlQuery(
            'getArticleById',
            responseQuery,
            { id: { type: 'ID!', value: article.id } },
            {},
        )

        expect(res.body.data.getArticleById.id).toEqual(article.id)
    })
})

const responseQuery = `{
    id
  }`
