import { describe, beforeAll, it, expect, beforeEach, afterAll } from 'vitest'
import { Article as RestArticle } from '@root/interface/rest/article/response'
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

    it('should not throw error when password is correct', async () => {
        const { article } = await articleMock.random.createOne(undefined, repositories)

        const res = await testingApp.httpReq().get(`/article/${article.id}`)

        expect(res.body).toMatchObject({
            authorUsername: expect.any(String),
            comments: expect.any(Array),
            content: expect.any(String),
            createdAt: expect.any(String),
            id: expect.any(String),
            perex: expect.any(String),
            title: expect.any(String),
        } satisfies RestArticle)
    })
})
