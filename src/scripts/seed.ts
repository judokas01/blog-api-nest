import { commentMock } from '@root/model/entities/comment/mock'
import { AuthenticateUserService } from '@root/model/services/auth-user'
import { getTestingModule } from '@root/model/test-utils'

const seed = async () => {
    const { testingApp, repositories } = await getTestingModule({
        additionalProviders: [AuthenticateUserService],
    })

    const authService = testingApp.get<AuthenticateUserService>(AuthenticateUserService)

    const KNOWN_USER = 'main-user'
    const KNOWN_USER_EMAIL = 'main@user.uu'
    const KNOWN_USER_PASSWORD = 'password'

    await authService.createUser({
        email: KNOWN_USER_EMAIL,
        password: KNOWN_USER_PASSWORD,
        username: KNOWN_USER,
    })

    await Promise.all(
        Array.from({ length: 10 }).map((_) =>
            commentMock.random.createOne(undefined, repositories),
        ),
    )
}

seed().then(() => {
    console.log('Seed done')
})
