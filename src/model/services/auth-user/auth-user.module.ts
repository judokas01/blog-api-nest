import { Injectable, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from './JWT_SECRET'
import { AuthenticateUserService } from '.'

@Injectable()
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthenticateUserService],
    exports: [AuthenticateUserService],
})
export class AuthModule {}
