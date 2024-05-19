import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    UseFilters,
    Body,
    Req,
    Put,
    Delete,
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { HttpExceptionFilter } from '../error-handler'
import {
    ArticleListItem,
    DeleteArticleResponse,
    ArticleListItem as RestArticle,
    toArticleItemResponse,
    toArticleResponse,
} from './response'
import {
    CreateArticleRequest,
    CreateCommentRequest,
    FindManyArticles,
    UpdateArticleRequest,
    VoteOnCommentRequest,
} from './request'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { InputNotFoundError } from '@root/model/errors'
import { GetManyArticlesUseCase } from '@root/model/use-cases/get-many-articles'
import { CreateArticleUseCase } from '@root/model/use-cases/create-article'
import { UpdateArticleUseCase } from '@root/model/use-cases/update-article'
import { DeleteArticleUseCase } from '@root/model/use-cases/delete-article'
import { AuthenticateUserService } from '@root/model/services/auth-user'
import { CreateCommentUseCase } from '@root/model/use-cases/create-comment'
import { VoteOnCommentUseCase } from '@root/model/use-cases/vote-on-comment'

@UseFilters(HttpExceptionFilter)
@Controller()
export class ArticleController {
    constructor(
        private getArticleUseCase: GetArticleUseCase,
        private getManyArticlesUseCase: GetManyArticlesUseCase,
        private createArticleUseCase: CreateArticleUseCase,
        private updateArticleUseCase: UpdateArticleUseCase,
        private deleteArticleUseCase: DeleteArticleUseCase,
        private createCommentUseCase: CreateCommentUseCase,
        private voteOnCommentUseCase: VoteOnCommentUseCase,
        private authenticateUserService: AuthenticateUserService,
    ) {}

    @Get('/articles')
    @ApiOperation({ summary: 'Get all articles.' })
    @ApiOkResponse({
        description: 'The user records',
        type: [ArticleListItem],
    })
    async getManyArticles(@Query() query: FindManyArticles): Promise<ArticleListItem[]> {
        const articles = await this.getManyArticlesUseCase.get({
            filters: {
                authorUsername: query.authorUsername,
                createdAfter: query.createdAfter,
                createdBefore: query.createdBefore,
                perex: query.perex,
                title: query.title,
            },
            pagination: {
                limit: query.limit,
                offset: query.offset,
            },
        })

        return articles.map(toArticleItemResponse)
    }

    @Get('/article:id')
    @ApiOperation({ summary: 'Get article by its id.' })
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    async getArticleById(@Param('id') id: string): Promise<RestArticle> {
        const article = await this.getArticleUseCase.getById(id)
        if (!article) {
            throw new InputNotFoundError({ message: 'Article not found', payload: { id } })
        }
        return toArticleResponse(article)
    }

    @Post('/article')
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    async createArticle(
        @Body() registerBody: CreateArticleRequest,
        @Req() req: Request,
    ): Promise<RestArticle> {
        const user = await this.authenticate(req)

        const article = await this.createArticleUseCase.create(registerBody, user)
        return toArticleResponse(article)
    }

    @Put('/article:id')
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    async updateArticle(
        @Param('id') id: string,
        @Body() updateBody: UpdateArticleRequest,
        @Req() req: Request,
    ): Promise<RestArticle> {
        const user = await this.authenticate(req)
        const article = await this.updateArticleUseCase.update(
            { articleId: id, update: updateBody },
            user,
        )
        return toArticleResponse(article)
    }

    @Delete('/article:id')
    @ApiOkResponse({
        description: 'The user records',
        type: DeleteArticleResponse,
    })
    async deleteArticle(
        @Param('id') id: string,
        @Req() req: Request,
    ): Promise<DeleteArticleResponse> {
        const user = await this.authenticate(req)

        await this.deleteArticleUseCase.delete(id, user)
        return { id }
    }

    @Post('/comment')
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    async createComment(
        @Body() { articleId, content }: CreateCommentRequest,
        @Req() req: Request,
    ): Promise<RestArticle> {
        const user = await this.authenticate(req)

        const article = await this.createCommentUseCase.create({ articleId, content }, user)
        return toArticleResponse(article)
    }

    @Post('/comment/:id')
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    async updateComment(
        @Param('id') id: string,
        @Body() { vote }: VoteOnCommentRequest,
        @Req() req: Request,
    ): Promise<RestArticle> {
        const article = await this.voteOnCommentUseCase.vote({ commentId: id, vote, ip: req.ip })
        return toArticleResponse(article)
    }

    private authenticate = async (req: Request) => {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        return await this.authenticateUserService.getUserFromToken(token)
    }
}
