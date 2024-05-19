import { describe, beforeAll, it, expect, beforeEach } from 'vitest'
import { TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'
import { VoteOnCommentUseCase } from '..'
import { TestingApp, cleanDatabase, getTestingModule } from '@root/model/test-utils'
import { InputError } from '@root/model/errors'
import { commentMock } from '@root/model/entities/comment/mock'

describe('Vote on comment use case test', () => {
    let testingApp: TestingModule
    let useCase: VoteOnCommentUseCase
    let repositories: TestingApp['repositories']

    beforeAll(async () => {
        const p = await getTestingModule({
            additionalProviders: [VoteOnCommentUseCase],
        })

        useCase = p.testingApp.get<VoteOnCommentUseCase>(VoteOnCommentUseCase)
        testingApp = p.testingApp
        repositories = p.repositories
    })

    beforeEach(async () => {
        await cleanDatabase(testingApp)
    })

    it.each([
        { text: 'upvote', vote: 1 },
        { text: 'downvote', vote: -1 },
    ])('should $text comment and return it in article with correct score', async (args) => {
        const { comment } = await commentMock.random.createOne(undefined, repositories)
        const ip = faker.internet.ip()

        const updatedArticle = await useCase.vote({
            commentId: comment.id,
            vote: args.vote as 1 | -1,
            ip,
        })

        const [updatedComment] = updatedArticle.data.comments.get()

        expect(updatedComment.data.upvoteScore).toEqual(args.vote)
        expect(updatedComment.data.uniqueVoteHosts).toEqual([ip])
    })

    it('should trow error when ip is already used for upvote', async () => {
        const ip = faker.internet.ip()
        const { comment } = await commentMock.random.createOne(
            { uniqueVoteHosts: [ip] },
            repositories,
        )

        await expect(
            useCase.vote({
                commentId: comment.id,
                vote: 1,
                ip,
            }),
        ).rejects.toThrow(InputError)
    })
})
