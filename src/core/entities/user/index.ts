import { randomUUID } from 'crypto'
import { Clonable } from '../helpers/relationship/clone'
import { HasMany } from '../helpers/relationship'
import type { Article } from '../article'
import { Uuid } from '@root/core/types'
import { Immutable } from '@root/core/lib/typescript'

export class User implements Clonable<User> {
    constructor(private user: UserData) {}

    static create = (data: Omit<UserData, 'id'>): User => new User({ ...data, id: randomUUID() })

    get id(): Immutable<UserData['id']> {
        return this.user.id
    }

    get data(): Immutable<UserData> {
        return this.user
    }

    clone = (): User => new User({ ...this.user })
}

export type UserData = {
    id: Uuid
    username: string
    email: string
    password: string
    articles: HasMany<Article>
}
