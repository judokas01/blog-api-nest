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

    updateOne = async (
        articleId: Article['id'],
        update: Partial<Pick<ArticleData, 'content' | 'perex' | 'title'>>,
    ): Promise<Article> => {
        const updated = await this.prisma.article.update(toPrismaArticleUpdate(articleId, update))
        return toArticle(updated)
    }

    deleteOne = async (id: Article['id']): Promise<void> => {
        await this.prisma.article.delete({ where: { id } })
    }

    findMany = async (args: FindManyArticlesArgs): Promise<Article[]> => {
        const { filters, pagination } = args
        const found = await this.prisma.article.findMany({
            where: {
                author: {
                    username: filters?.authorUsername,
                },
                title: {
                    contains: filters?.title,
                },
                perex: {
                    contains: filters?.perex,
                },
                createdAt: {
                    gte: filters?.createdAfter,
                    lte: filters?.createdBefore,
                },
            },
            skip: pagination?.offset,
            take: pagination?.limit,
            orderBy: {
                pk: 'desc',
            },
        })
        return found.map(toArticle)
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

export type FindManyArticlesArgs = {
    filters?: {
        title?: string
        perex?: string
        authorUsername?: string
        createdBefore?: Date
        createdAfter?: Date
    }
    pagination?: {
        limit: number
        offset: number
    }
}
