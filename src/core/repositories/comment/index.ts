import { ClearableRepository } from '../common'
import { Article } from '@root/core/entities/article'
import { CommentData } from '@root/core/entities/comment'

export interface ICommentRepository extends ClearableRepository {
    insertOne: (data: CommentData) => Promise<Comment>
    updateOne: (comment: Comment) => Promise<Comment>
    findAllByArticleId(articleId: Article['id']): Promise<Comment[]>
    findAllByArticleIdOrderByUpVotes(articleId: Article['id']): Promise<Comment[]>
    findAllByArticleIdOrderByUpDate(articleId: Article['id']): Promise<Comment[]>
}
