import { Provider } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ArticleRepository } from '../repositories/repositories/article'
import { CommentRepository } from '../repositories/repositories/comment'
import { UserRepository } from '../repositories/repositories/user'
import { ClearableRepository } from '../repositories/common'
import { PrismaService } from '@root/infrastructure/prisma/client'

const REPOSITORY_DEPS = [PrismaService]
const REPOSITORIES = [UserRepository, CommentRepository, ArticleRepository]

export const getTestingModule = async (overrides?: { additionalProviders?: Provider[] }) => {
    const testingApp = await Test.createTestingModule({
        providers: [...REPOSITORIES, ...REPOSITORY_DEPS, ...(overrides.additionalProviders ?? [])],
    }).compile()

    return {
        testingApp,
        repositories: {
            user: testingApp.get<UserRepository>(UserRepository),
            comment: testingApp.get<CommentRepository>(CommentRepository),
            article: testingApp.get<ArticleRepository>(ArticleRepository),
        },
    }
}

export const cleanDatabase = async (testingApp: TestingModule) => {
    const repositories: ClearableRepository[] = [
        testingApp.get<UserRepository>(UserRepository),
        testingApp.get<CommentRepository>(CommentRepository),
        testingApp.get<ArticleRepository>(ArticleRepository),
    ]

    for (const repository of repositories) {
        await repository.clear()
    }
}
