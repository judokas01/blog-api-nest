import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { CreateCommentUseCase } from '..'
import { TestingApp, cleanDatabase, getTestingModule } from '@root/model/test-utils'
import { articleMock } from '@root/model/entities/article/mock'
import { InputError } from '@root/model/errors'
import { User } from '@root/model/entities/user'

describe('Create comment useCase test', () => {
    let testingApp: TestingModule
    let useCase: CreateCommentUseCase
    let repositories: TestingApp['repositories']

    beforeAll(async () => {
        const p = await getTestingModule({
            additionalProviders: [CreateCommentUseCase],
        })

        useCase = p.testingApp.get<CreateCommentUseCase>(CreateCommentUseCase)
        testingApp = p.testingApp
        repositories = p.repositories
    })

    beforeEach(async () => {
        await cleanDatabase(testingApp)
    })

    it('should create comment to article and retrieve it on article', async () => {
        const testText = faker.lorem.words(5)
        const { article, user } = await articleMock.random.createOne(undefined, repositories)

        await useCase.create({ articleId: article.id, content: testText }, user)

        const found = await repositories.article.findById(article.id)

        expect(found.data.comments.get()).toHaveLength(1)

        const comment = found.data.comments.get()[0]
        expect(comment.data.content).toEqual(testText)
    })

    it.each([
        {
            getUser: (user: User) => user,
            expectedUserName: (user: User) => user.data.username,
            text: 'known authorNickName',
        },
        {
            getUser: (_user: User) => null,
            expectedUserName: (_user: User) => 'Anonymous',
            text: 'Anonymous as authorNickName',
        },
    ])(
        'should create comment to article and it should have $text',
        async ({ getUser, expectedUserName }) => {
            const testText = faker.lorem.words(5)
            const { article, user } = await articleMock.random.createOne(undefined, repositories)

            await useCase.create({ articleId: article.id, content: testText }, getUser(user))

            const found = await repositories.article.findById(article.id)

            const [comment] = found.data.comments.get()
            expect(comment.data.authorNickName).toEqual(expectedUserName(user))
        },
    )

    it('should throw error when article does not exits', async () => {
        const testText = faker.lorem.words(5)
        const { user } = await articleMock.random.createOne(undefined, repositories)

        await expect(
            useCase.create({ articleId: 'some-id', content: testText }, user),
        ).rejects.toThrowError(InputError)
    })
})
