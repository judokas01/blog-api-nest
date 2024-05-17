import { CommentData } from '@root/model/entities/comment'
import { ICommentRepository } from '@root/model/repositories/comment'

export class VoteOnCommentUseCase {
    constructor(private commentRepository: ICommentRepository) {}

    create = async (data: CommentData) => await this.commentRepository.insertOne(data)
}
