import { randomUUID } from 'crypto'
import { HasOne } from '../helpers/relationship'
import { Article } from '../article'
import { Clonable } from '@root/model/entities/helpers/relationship/clone'
import { Uuid } from '@root/model/types'
import { Immutable } from '@root/model/lib/typescript'

export class Comment implements Clonable<Comment> {
    constructor(private comment: CommentData) {}

    static create = (data: Omit<CommentData, 'id' | 'createdAt' | 'upvoteScore'>): Comment =>
        new Comment({ ...data, id: randomUUID(), createdAt: new Date(), upvoteScore: 0 })

    get id(): Immutable<CommentData['id']> {
        return this.comment.id
    }

    get data(): Immutable<CommentData> {
        return this.comment
    }

    upVote = (): Comment => {
        const clone = this.clone()
        clone.comment.upvoteScore += 1
        return clone
    }

    downVote = (): Comment => {
        const clone = this.clone()
        clone.comment.upvoteScore -= 1
        return clone
    }

    clone = (): Comment => new Comment({ ...this.comment })
}

export type CommentData = {
    id: Uuid
    authorNickName: string
    content: string
    createdAt: Date
    upvoteScore: number
    uniqueHosts: string[]
    article: HasOne<Article>
}
