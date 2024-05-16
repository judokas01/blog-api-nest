import { randomUUID } from 'crypto'
import { HasMany } from './helpers/relationship'

export class User {
    private constructor(data: UserData) {}

    static create = (data: Omit<UserData, 'id'>): User => new User({ ...data, id: randomUUID() })
    id: number
    name: string
    email: string
    password: string
}

export type UserData = {
    id: string
    username: string
    email: string
    password: string
    posts: HasMany<Post>
}
