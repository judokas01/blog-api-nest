import { CommentData } from '@root/core/entities/comment'
import { ICommentRepository } from '@root/core/repositories/comment'

export class CreateCommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}

    create = async (data: CommentData) => await this.commentRepository.insertOne(data)
}
