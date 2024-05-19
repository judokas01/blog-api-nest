import { CommentData } from '@root/model/entities/comment'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

export class VoteOnCommentUseCase {
    constructor(private commentRepository: CommentRepository) {}

    create = async (args: { commentId: CommentData['id']; vote: number; ip: string }) =>
        await this.commentRepository.insertOne(data)
}
