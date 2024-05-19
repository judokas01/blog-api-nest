import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { CommentData } from '..'
import { articleMock } from '../../article/mock'
import { HasOne } from '@root/model/entities/helpers/relationship'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { CommentRepository } from '@root/model/repositories/repositories/comment'
import { ArticleRepository } from '@root/model/repositories/repositories/article'

export const getRandomCommentData = ({
    id = randomUUID(),
    article = HasOne.unloaded('comment.article'),
    authorNickName = faker.internet.userName(),
    content = faker.lorem.words({ min: 10, max: 30 }),
    createdAt = new Date(),
    uniqueVoteHosts = [],
    upvoteScore = 0,
}: Partial<CommentData> = {}) => ({
    id,
    article,
    authorNickName,
    content,
    createdAt,
    uniqueVoteHosts,
    upvoteScore,
})

export const createRandomComment = async (
    overrides: Partial<CommentData> | undefined,
    repositories: {
        user: UserRepository
        article: ArticleRepository
        comment: CommentRepository
    },
) => {
    const { article, user } = await articleMock.random.createOne(undefined, repositories)
    const commentToCreate = getRandomCommentData({
        article: HasOne.loaded('comment.article', article),
        ...overrides,
    })
    const createdComment = await repositories.comment.insertOne(commentToCreate)
    const reloadedArticle = await repositories.article.findByIdWithOrderedComments(article.id)

    return { comment: createdComment, article: reloadedArticle!, user }
}

export const commentMock = {
    random: {
        data: getRandomCommentData,
        createOne: createRandomComment,
    },
}
