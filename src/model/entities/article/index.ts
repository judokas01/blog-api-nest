import { randomUUID } from 'crypto'
import { Clonable } from '@root/model/entities/helpers/relationship/clone'
import type { User } from '@root/model/entities/user'
import type { Comment } from '@root/model/entities/comment'
import { HasMany, HasOne } from '@root/model/entities/helpers/relationship'
import { Uuid } from '@root/model/types'
import { Immutable } from '@root/model/lib/typescript'

export class Article implements Clonable<Article> {
    constructor(private article: ArticleData) {}

    static create = (data: Omit<ArticleData, 'id' | 'createdAt'>): Article =>
        new Article({ ...data, id: randomUUID(), createdAt: new Date() })

    get id(): Immutable<ArticleData['id']> {
        return this.article.id
    }

    get data(): Immutable<ArticleData> {
        return this.article
    }

    clone = (): Article => new Article({ ...this.article })
}

export type ArticleData = {
    id: Uuid
    title: string
    content: string
    perex: string
    createdAt: Date
    author: HasOne<User>
    comments: HasMany<Comment>
}
