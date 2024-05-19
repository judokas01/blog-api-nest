import {
    User as PrismaUser,
    Article as PrismaArticle,
    Comment as PrismaComment,
} from '@prisma/client'
import { HasMany, HasOne } from '@root/model/entities/helpers/relationship'
import { User } from '@root/model/entities/user'
import { Comment } from '@root/model/entities/comment'
import { Article } from '@root/model/entities/article'

export const toUser = (
    user: PrismaUser & {
        articles?: PrismaArticle[]
    },
): User =>
    new User({
        articles: user.articles
            ? HasMany.loaded('user.articles', user.articles.map(toArticle))
            : HasMany.unloaded('user.articles'),
        email: user.email,
        id: user.id,
        username: user.username,
        password: user.password,
    })

export const toComment = (
    comment: PrismaComment & {
        article?: PrismaArticle
    },
): Comment =>
    new Comment({
        article: comment.article
            ? HasOne.loaded('comment.article', toArticle(comment.article))
            : HasOne.unloaded('comment.article', comment.articleId),
        authorNickName: comment.authorNickName,
        content: comment.content,
        createdAt: comment.createdAt,
        id: comment.id,
        uniqueVoteHosts: JSON.parse(comment.upvoteHosts) as string[],
        upvoteScore: comment.upvoteScore,
    })

export const toArticle = (
    article: PrismaArticle & {
        author?: PrismaUser
        comments?: PrismaComment[]
    },
): Article =>
    new Article({
        author: article.author
            ? HasOne.loaded('article.author', toUser(article.author))
            : HasOne.unloaded('article.author'),
        comments: article.comments
            ? HasMany.loaded('article.comments', article.comments.map(toComment))
            : HasMany.unloaded('article.comments'),
        content: article.content,
        createdAt: article.createdAt,
        id: article.id,
        perex: article.perex,
        title: article.title,
    })
