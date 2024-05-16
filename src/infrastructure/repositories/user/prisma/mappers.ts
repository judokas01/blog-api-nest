import { Prisma, User as PrismaUser } from '@prisma/client'
import { HasMany } from '@root/core/entities/helpers/relationship'
import { User, UserData } from '@root/core/entities/user'
import { Immutable } from '@root/core/lib/typescript'

export const toUser = (user: PrismaUser): User =>
    new User({
        articles: HasMany.unloaded('user.articles'),
        email: user.email,
        id: user.id,
        username: user.username,
        password: user.password,
    })

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
