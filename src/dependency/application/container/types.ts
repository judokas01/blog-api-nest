import { IArticleRepository } from '@root/model/repositories/article'
import { ICommentRepository } from '@root/model/repositories/comment'
import { IUserRepository } from '@root/model/repositories/user'
import { CreateArticleUseCase } from '@root/model/use-cases/create-article'
import { CreateCommentUseCase } from '@root/model/use-cases/create-comment'
import { DeleteArticleUseCase } from '@root/model/use-cases/delete-article'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { GetManyArticlesUseCase } from '@root/model/use-cases/get-many-articles'
import { UpdateArticleUseCase } from '@root/model/use-cases/update-article'
import { VoteOnCommentUseCase } from '@root/model/use-cases/vote-on-comment'

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
