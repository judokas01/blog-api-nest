import { Module } from '@nestjs/common'
import { AuthenticateUserUseCase } from '@root/model/use-cases/auth-user'
import { PrismaUserRepository } from '@root/model/repositories/repositories/user'

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
