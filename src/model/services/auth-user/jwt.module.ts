import { JwtModule } from '@nestjs/jwt'

export const JWT_SECRET = 'cvAKESnbjTEYXXAbALdk4OUh0rvzReHVCfVvg6FZVB4'
export const JwtMod = JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '30m' },
})
