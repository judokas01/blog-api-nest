import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { toUser } from '../../common/mappers'
import { toPrismaUserCreate, toPrismaUserUpdate } from './mappers'
import { User, UserData } from '@root/model/entities/user'
import { Immutable } from '@root/model/lib/typescript'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Injectable()
export class UserRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}

    insertOne = async (data: Immutable<UserData>): Promise<User> => {
        const user = await this.prisma.user.create({ data: toPrismaUserCreate(data) })
        return toUser(user)
    }
    updateOne = async (user: User): Promise<User> => {
        const updatedUser = await this.prisma.user.update(toPrismaUserUpdate(user))
        return toUser(updatedUser)
    }

    findByUsername = async (username: User['data']['username']): Promise<User | null> => {
        const found = await this.prisma.user.findFirst({ where: { username } })
        return found ? toUser(found) : null
    }

    findById = async (id: User['id']): Promise<User | null> => {
        const found = await this.prisma.user.findFirst({ where: { id } })
        return found ? toUser(found) : null
    }

    clear = async (): Promise<void> => {
        await this.prisma.user.deleteMany()
    }
}
