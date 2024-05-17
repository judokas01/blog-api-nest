import { Injectable } from '@nestjs/common'
import { ClearableRepository } from '../../common'
import { toArticle, toPrismaArticleCreate, toPrismaArticleUpdate } from './mappers'
import { Article, ArticleData } from '@root/model/entities/article'
import { User } from '@root/model/entities/user'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { Immutable } from '@root/model/lib/typescript'

@Injectable()
export class ArticleRepository implements ClearableRepository {
    constructor(private prisma: PrismaService) {}

    insertOne = async (data: Immutable<ArticleData>): Promise<Article> => {
        const created = await this.prisma.article.create({ data: toPrismaArticleCreate(data) })
        return toArticle(created)
    }

    updateOne = async (article: Article): Promise<Article> => {
        const created = await this.prisma.article.update(toPrismaArticleUpdate(article))
        return toArticle(created)
    }

    deleteOne = async (id: Article['id']): Promise<void> => {
        await this.prisma.article.delete({ where: { id } })
    }

    findOne = async (data: Partial<ArticleData>): Promise<Article | null> => {
        const found = await this.prisma.article.findFirst({ where: { ...data, author: undefined } })
        return found ? toArticle(found) : null
    }

    findById = async (id: Article['id']): Promise<Article | null> => {
        const found = await this.prisma.article.findFirst({ where: { id } })
        return found ? toArticle(found) : null
    }

    findManyByUserId = async (userId: User['id']): Promise<Article[]> => {
        const found = await this.prisma.article.findMany({ where: { authorId: userId } })
        return found.map(toArticle)
    }

    clear = async (): Promise<void> => {
        await this.prisma.article.deleteMany()
    }
}
