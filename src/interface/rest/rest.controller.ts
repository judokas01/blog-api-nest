import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'

@Controller({ path: '/article' })
export class RestController {
    constructor(private getArticleUseCase: GetArticleUseCase) {}

    @Get(':id')
    @ApiOperation({ summary: 'Create cat' })
    @ApiResponse({ status: 200, description: 'Forbidden.' })
    async getArticleById(@Param('id') id: string) {
        console.log({ id })
        const article = await this.getArticleUseCase.get({ id: id })
        console.log({ article })
        return { a: 'vojemama', b: 'mojemama' }
    }
}
