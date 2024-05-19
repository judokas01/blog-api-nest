import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ArticleController } from './rest/article/article.controller'
import { ArticleResolver } from './graphql/article/article.resolver'
import { UserController } from './rest/user/user.controller'
import { UserResolver } from './graphql/user/user.resolver'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { CommentRepository } from '@root/model/repositories/repositories/comment'
import { AuthenticateUserService } from '@root/model/services/auth-user'
import { JwtMod } from '@root/model/services/auth-user/jwt.module'
import { GetManyArticlesUseCase } from '@root/model/use-cases/get-many-articles'
import { CreateArticleUseCase } from '@root/model/use-cases/create-article'
import { UpdateArticleUseCase } from '@root/model/use-cases/update-article'
import { DeleteArticleUseCase } from '@root/model/use-cases/delete-article'
import { CreateCommentUseCase } from '@root/model/use-cases/create-comment'
import { VoteOnCommentUseCase } from '@root/model/use-cases/vote-on-comment'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            installSubscriptionHandlers: true,

            subscriptions: {
                'subscriptions-transport-ws': true,
            },
            context: ({ req, res }) => ({ req, res }),
        }),
        JwtMod,
    ],
    providers: [
        GetManyArticlesUseCase,
        CreateArticleUseCase,
        UpdateArticleUseCase,
        DeleteArticleUseCase,
        AuthenticateUserService,
        CreateCommentUseCase,
        VoteOnCommentUseCase,
        AuthenticateUserService,
        ArticleResolver,
        UserResolver,
        GetArticleUseCase,
        ArticleRepository,
        UserRepository,
        CommentRepository,
        PrismaService,
    ],
    controllers: [ArticleController, UserController],
})
export class InterfaceModule {}
