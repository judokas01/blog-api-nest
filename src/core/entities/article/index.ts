import { randomUUID } from 'crypto'
import { Clonable } from '@root/core/entities/helpers/relationship/clone'
import type { User } from '@root/core/entities/user'
import type { Comment } from '@root/core/entities/comment'
import { HasMany, HasOne } from '@root/core/entities/helpers/relationship'
import { Uuid } from '@root/core/types'
import { Immutable } from '@root/core/lib/typescript'

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
