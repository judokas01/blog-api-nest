import { Injectable } from '@nestjs/common'
import { Article, ArticleData } from '@root/core/entities/article'
import { User } from '@root/core/entities/user'
import { IArticleRepository } from '@root/core/repositories/article'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Injectable()
export class PrismaArticleRepository implements IArticleRepository {
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
