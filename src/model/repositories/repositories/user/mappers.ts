import { Prisma } from '@prisma/client'
import { User, UserData } from '@root/model/entities/user'
import { Immutable } from '@root/model/lib/typescript'

export const toPrismaUserCreate = (data: Immutable<UserData>): Prisma.UserCreateInput => ({
    email: data.email,
    id: data.id,
    username: data.username,
    password: data.password,
})

export const toPrismaUserUpdate = (user: User): Prisma.UserUpdateArgs => ({
    data: {
        email: user.data.email,
        id: user.data.id,
        username: user.data.username,
        password: user.data.password,
    },
    where: { id: user.id },
})
