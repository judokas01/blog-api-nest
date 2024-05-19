import { Controller, Get, Param, UseFilters } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { HttpExceptionFilter } from '../error-handler'
import { Article as RestArticle } from './response'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { InputNotFoundError } from '@root/model/errors'

@UseFilters(HttpExceptionFilter)
@Controller({ path: '/article' })
export class ArticleController {
    constructor(private getArticleUseCase: GetArticleUseCase) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get article by its id.' })
    @ApiOkResponse({
        description: 'The user records',
        type: RestArticle,
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getArticleById(@Param('id') id: string): Promise<RestArticle | null> {
        console.log({ id })
        const article = await this.getArticleUseCase.getById(id)
        if (!article) {
            throw new InputNotFoundError({ message: 'Article not found', payload: { id } })
        }
        return article.data
    }
}
