import { Prisma, Article as PrismaArticle } from '@prisma/client'
import { Article, ArticleData } from '@root/model/entities/article'
import { HasMany, HasOne } from '@root/model/entities/helpers/relationship'
import { Immutable } from '@root/model/lib/typescript'

export const toArticle = (article: PrismaArticle): Article =>
    new Article({
        author: HasOne.unloaded('article.author'),
        comments: HasMany.unloaded('article.comments'),
        content: article.content,
        createdAt: article.createdAt,
        id: article.id,
        perex: article.perex,
        title: article.title,
    })

export const toPrismaArticleCreate = (data: Immutable<ArticleData>): Prisma.ArticleCreateInput => ({
    content: data.content,
    id: data.id,
    perex: data.perex,
    title: data.title,
    author: { connect: { id: data.author.getId() } },
    createdAt: data.createdAt,
})

export const toPrismaArticleUpdate = (
    articleId: Article['id'],
    update: Partial<Pick<ArticleData, 'content' | 'perex' | 'title'>>,
): Prisma.ArticleUpdateArgs => ({
    data: {
        content: update.content,
        perex: update.perex,
        title: update.title,
    },
    where: { id: articleId },
})
