import { randomUUID } from 'crypto'
import { Clonable } from '@root/core/entities/helpers/relationship/clone'
import { Uuid } from '@root/core/types'

export class Comment implements Clonable<Comment> {
    constructor(private comment: CommentData) {}

    static create = (data: Omit<CommentData, 'id' | 'createdAt' | 'upvoteScore'>): Comment =>
        new Comment({ ...data, id: randomUUID(), createdAt: new Date(), upvoteScore: 0 })

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
}
