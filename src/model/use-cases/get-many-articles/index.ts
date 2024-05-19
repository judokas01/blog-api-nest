import { Injectable } from '@nestjs/common'
import { Article } from '@root/model/entities/article'
import {
    ArticleRepository,
    FindManyArticlesArgs,
} from '@root/model/repositories/repositories/article'

@Injectable()
export class GetManyArticlesUseCase {
    constructor(private articleRepository: ArticleRepository) {}

    get = async (args: FindManyArticlesArgs): Promise<Article[]> =>
        await this.articleRepository.findMany(args)
}
