import { Args, Query, Resolver, Context } from '@nestjs/graphql'
import { GqlContextRequest } from '../types'
import { Article } from './article.model'
import { GetArticleArgs } from './request-type'
import { toGqlArticle } from './mappers'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'

@Resolver(() => Article)
export class ArticleResolver {
    constructor(private getArticleUseCase: GetArticleUseCase) {}
    @Query(() => Article, { nullable: true })
    async getArticle(
        @Args() args: GetArticleArgs,
        @Context() { req: _req }: GqlContextRequest,
    ): Promise<Article | null> {
        const article = await this.getArticleUseCase.get(args)
        return toGqlArticle(article)
    }
}
