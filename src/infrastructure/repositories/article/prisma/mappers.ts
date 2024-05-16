import { Article as PrismaArticle } from '@prisma/client'
import { Article } from '@root/core/entities/article'

export const toArticleData = (article: PrismaArticle): Article => new Article({})
