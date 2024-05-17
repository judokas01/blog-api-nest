import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { Article, ArticleData } from '@root/model/entities/article'
import { User } from '@root/model/entities/user'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Injectable()
export class PrismaArticleRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}

    insertOne = async (data: ArticleData): Promise<Article> => {}
    updateOne = async (article: Article): Promise<Article> => {}
    deleteOne = async (id: Article['id']): Promise<Article> => {}
    findOne = async (data: Partial<ArticleData>): Promise<Article | null> => {}
    findById = async (): Promise<Article | null> => {}
    findManyByUserId = async (userId: User['id']): Promise<Article | null> => {}
    clear = async (): Promise<void> => {
        await this.prisma.article.deleteMany()
    }
}
