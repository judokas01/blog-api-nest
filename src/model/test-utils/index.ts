import { INestApplication, Provider } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { ArticleRepository } from '../repositories/repositories/article'
import { CommentRepository } from '../repositories/repositories/comment'
import { UserRepository } from '../repositories/repositories/user'
import { ClearableRepository } from '../repositories/common'
import { JWT_SECRET } from '../services/auth-user/JWT_SECRET'
import { PrismaService } from '@root/infrastructure/prisma/client'

const REPOSITORY_DEPS = [PrismaService]
const REPOSITORIES = [UserRepository, CommentRepository, ArticleRepository]

export const getTestingModule = async (overrides?: { additionalProviders?: Provider[] }) => {
    const testingApp = await Test.createTestingModule({
        providers: [...REPOSITORIES, ...REPOSITORY_DEPS, ...(overrides?.additionalProviders ?? [])],
        imports: [
            JwtModule.register({
                global: true,
                secret: JWT_SECRET,
                signOptions: { expiresIn: '60s' },
            }),
        ],
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

export const cleanDatabase = async (testingApp: TestingModule | INestApplication) => {
    const repositories: ClearableRepository[] = [
        testingApp.get<CommentRepository>(CommentRepository),
        testingApp.get<ArticleRepository>(ArticleRepository),
        testingApp.get<UserRepository>(UserRepository),
    ]

    for (const repository of repositories) {
        await repository.clear()
    }
}
