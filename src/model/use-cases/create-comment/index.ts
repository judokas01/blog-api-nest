import { CommentData } from '@root/model/entities/comment'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

export class CreateCommentUseCase {
    constructor(private commentRepository: CommentRepository) {}

    // create = async (data: CommentData) => await this.commentRepository.insertOne(data)
}
