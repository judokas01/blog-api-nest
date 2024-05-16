import { IArticleRepository } from '@root/core/repositories/article'
import { ICommentRepository } from '@root/core/repositories/comment'
import { IUserRepository } from '@root/core/repositories/user'
import { CreateArticleUseCase } from '@root/core/use-cases/create-article'
import { CreateCommentUseCase } from '@root/core/use-cases/create-comment'
import { DeleteArticleUseCase } from '@root/core/use-cases/delete-article'
import { GetArticleUseCase } from '@root/core/use-cases/get-article'
import { GetManyArticlesUseCase } from '@root/core/use-cases/get-many-articles'
import { UpdateArticleUseCase } from '@root/core/use-cases/update-article'
import { VoteOnCommentUseCase } from '@root/core/use-cases/vote-on-comment'

export interface AppContainer {
    articleRepository: IArticleRepository
    commentRepository: ICommentRepository
    userRepository: IUserRepository

    createArticleUseCase: CreateArticleUseCase
    deleteArticleUseCase: DeleteArticleUseCase
    updateArticleUseCase: UpdateArticleUseCase
    getArticleUseCase: GetArticleUseCase
    getManyArticleUseCase: GetManyArticlesUseCase

    createCommentUseCase: CreateCommentUseCase
    voteOnCommentUseCase: VoteOnCommentUseCase
}
