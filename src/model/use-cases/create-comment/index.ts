import { Article } from '@root/model/entities/article'
import { CommentData } from '@root/model/entities/comment'
import { User } from '@root/model/entities/user'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

export class CreateCommentUseCase {
    constructor(private commentRepository: CommentRepository) {}

    create = async (
        args: { content: CommentData['content']; articleId: Article['id'] },
        user: User | null,
    ) => await this.commentRepository.insertOne(data)
}
