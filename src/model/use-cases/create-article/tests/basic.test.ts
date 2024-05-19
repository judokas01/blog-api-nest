import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { CreateArticleData, CreateArticleUseCase } from '..'
import { TestingApp, cleanDatabase, getTestingModule } from '@root/model/test-utils'
import { userMock } from '@root/model/entities/user/mock'
import { InputError, UnauthorizedError } from '@root/model/errors'

describe('Create article useCase test', () => {
    let testingApp: TestingModule
    let useCase: CreateArticleUseCase
    let repositories: TestingApp['repositories']

    beforeAll(async () => {
        const p = await getTestingModule({
            additionalProviders: [CreateArticleUseCase],
        })

        useCase = p.testingApp.get<CreateArticleUseCase>(CreateArticleUseCase)
        testingApp = p.testingApp
        repositories = p.repositories
    })

    beforeEach(async () => {
        await cleanDatabase(testingApp)
    })

    it('should create article and retrieve it by id', async () => {
        const user = await userMock.random.createOne(undefined, repositories.user)
        const articleData = {
            content: 'content',
            perex: 'perex',
            title: 'title',
        }

        const article = await useCase.create(articleData, user)

        const found = await repositories.article.findById(article.id)

        expect(found).not.toBeNull()
        expect(found.id).toEqual(article.id)
    })

    it('should trow error when user does not exist', async () => {
        const articleData = {
            content: 'content',
            perex: 'perex',
            title: 'title',
        }

        await expect(useCase.create(articleData, null)).rejects.toThrow(UnauthorizedError)
    })

    it('should trow error when input is invalid', async () => {
        const articleData = {
            content: 1,
            per: 'perex',
            title: null,
        } as unknown as CreateArticleData

        await expect(useCase.create(articleData, null)).rejects.toThrow(InputError)
    })
})
