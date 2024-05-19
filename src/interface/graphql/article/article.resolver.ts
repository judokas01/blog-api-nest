import { Args, Query, Resolver, Context, Mutation, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { GqlContextRequest } from '../types'
import { Article, ArticleListItem } from './response-type'
import {
    ArticleId,
    CreateCommentArgs,
    GetManyArticlesArgs,
    NewArticleArgs,
    UpdateArticleArgs,
    VoteOnCommentArgs,
} from './request-type'
import { toGqlArticle, toGqlArticleListItem } from './mappers'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { GetManyArticlesUseCase } from '@root/model/use-cases/get-many-articles'
import { CreateArticleUseCase } from '@root/model/use-cases/create-article'
import { UpdateArticleUseCase } from '@root/model/use-cases/update-article'
import { DeleteArticleUseCase } from '@root/model/use-cases/delete-article'
import { AuthenticateUserService } from '@root/model/services/auth-user'
import { CreateCommentUseCase } from '@root/model/use-cases/create-comment'
import { VoteOnCommentUseCase } from '@root/model/use-cases/vote-on-comment'

const pubSub = new PubSub()

@Resolver(() => Article)
export class ArticleResolver {
    constructor(
        private getArticleUseCase: GetArticleUseCase,
        private getManyArticlesUseCase: GetManyArticlesUseCase,
        private createArticleUseCase: CreateArticleUseCase,
        private updateArticleUseCase: UpdateArticleUseCase,
        private deleteArticleUseCase: DeleteArticleUseCase,
        private authenticateUserService: AuthenticateUserService,
        private createCommentUseCase: CreateCommentUseCase,
        private voteOnCommentUseCase: VoteOnCommentUseCase,
    ) {}

    @Query(() => Article, { nullable: true })
    async getArticleById(
        @Args() { id }: ArticleId,
        @Context() { req: _req }: GqlContextRequest,
    ): Promise<Article | null> {
        const article = await this.getArticleUseCase.getById(id)
        return toGqlArticle(article)
    }

    @Query(() => [ArticleListItem])
    async getManyArticles(
        @Args() args: GetManyArticlesArgs,
        @Context() { req: _req }: GqlContextRequest,
    ): Promise<ArticleListItem[]> {
        const articles = await this.getManyArticlesUseCase.get(args)
        return articles.map(toGqlArticleListItem)
    }

    @Mutation(() => Article)
    async createArticle(
        @Args() args: NewArticleArgs,
        @Context() { req }: GqlContextRequest,
    ): Promise<Article> {
        const auth = req.header('Authorization')
        const user = await this.authenticateUserService.getUserFromToken(auth)
        const article = await this.createArticleUseCase.create(args, user)
        return toGqlArticle(article)
    }

    @Mutation(() => Article)
    async updateArticle(
        @Args() args: UpdateArticleArgs,
        @Context() { req }: GqlContextRequest,
    ): Promise<Article> {
        const auth = req.header('Authorization')
        const user = await this.authenticateUserService.getUserFromToken(auth)
        const article = await this.updateArticleUseCase.update(
            {
                articleId: args.id,
                update: {
                    content: args.content,
                    perex: args.perex,
                    title: args.title,
                },
            },
            user,
        )
        return toGqlArticle(article)
    }

    @Mutation(() => Article)
    async deleteArticle(
        @Args() { id }: ArticleId,
        @Context() { req }: GqlContextRequest,
    ): Promise<void> {
        const auth = req.header('Authorization')
        const user = await this.authenticateUserService.getUserFromToken(auth)
        await this.deleteArticleUseCase.delete(id, user)
    }

    @Mutation(() => Article)
    async createComment(
        @Args() { content, articleId }: CreateCommentArgs,
        @Context() { req }: GqlContextRequest,
    ): Promise<Article> {
        const auth = req.header('Authorization')
        const user = await this.authenticateUserService.getUserFromToken(auth)
        const article = await this.createCommentUseCase.create({ articleId, content }, user)

        const response = toGqlArticle(article)
        pubSub.publish('articleNewEvent', { articleNewEvent: response })
        return response
    }

    @Mutation(() => Article)
    async voteOnComment(
        @Args() { commentId, vote }: VoteOnCommentArgs,
        @Context() { req }: GqlContextRequest,
    ): Promise<Article> {
        const ip = req.ip
        const article = await this.voteOnCommentUseCase.vote({ commentId, vote, ip })
        const response = toGqlArticle(article)
        pubSub.publish('articleNewEvent', { articleNewEvent: response })
        return toGqlArticle(article)
    }

    @Subscription(() => Article, { nullable: true })
    articleNewEvent() {
        return pubSub.asyncIterator(`articleNewEvent`)
    }
}
