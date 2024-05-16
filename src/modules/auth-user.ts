import { Module } from '@nestjs/common'
import { AuthenticateUserUseCase } from '@root/core/use-cases/auth-user'
import { PrismaUserRepository } from '@root/infrastructure/repositories/user/prisma'

@Module({
    providers: [
        {
            provide: AuthenticateUserUseCase,
            useClass: AuthenticateUserUseCase,
            useFactory: (userRepository: PrismaUserRepository) =>
                new AuthenticateUserUseCase(userRepository),
        },
    ],
})
export class UserAuthModule {}
