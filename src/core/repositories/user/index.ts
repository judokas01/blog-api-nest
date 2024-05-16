import { ClearableRepository } from '../common'
import { Immutable } from '@root/core/lib/typescript'
import { User, UserData } from '@root/core/entities/user'

export interface IUserRepository extends ClearableRepository {
    insertOne(data: Immutable<UserData>): Promise<User>
    updateOne(user: User): Promise<User>
    findByUsername(username: User['data']['username']): Promise<User | null>
    findById(id: User['id']): Promise<User | null>
}
