import { Test, TestingModule } from '@nestjs/testing'
import { ClearableRepository } from '@root/model/repositories/common'
import { AuthenticateUserUseCase } from '@root/model/use-cases/auth-user'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { PrismaArticleRepository } from '@root/model/repositories/repositories/article'
import { PrismaCommentRepository } from '@root/infrastructure/repositories/comment/prisma'
import { PrismaUserRepository } from '@root/model/repositories/repositories/user'

export const creatingTestingContainer = async (): Promise<TestingModule> =>
    Test.createTestingModule({
        providers: [
            PrismaService,
            PrismaUserRepository,
            PrismaCommentRepository,
            PrismaArticleRepository,
            AuthenticateUserUseCase,
        ],
        exports: [
            PrismaService,
            PrismaUserRepository,
            PrismaCommentRepository,
            PrismaArticleRepository,
            AuthenticateUserUseCase,
        ],
    }).compile()

export const destroyTestingContainer = async (app: TestingModule): Promise<void> => {
    const prismaService = app.get<PrismaService>(PrismaService)
    await prismaService.$disconnect()
    await app.close()
}

export const cleanTestingContainer = async (app: TestingModule): Promise<void> => {
    const prismaService = app.get<PrismaService>(PrismaService)

    const clearableRepositories = [
        app.get<ClearableRepository>(PrismaUserRepository),
        app.get<ClearableRepository>(PrismaCommentRepository),
        app.get<ClearableRepository>(PrismaArticleRepository),
    ]

    for (const repository of clearableRepositories) {
        await repository.clear()
    }
    await prismaService.$disconnect()
}
