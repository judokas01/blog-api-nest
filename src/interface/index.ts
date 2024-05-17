import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { RestController } from './rest/rest.controller'
import { ArticleResolver } from './graphql/article/article.resolver'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { PrismaService } from '@root/infrastructure/prisma/client'
import { UserRepository } from '@root/model/repositories/repositories/user'
import { CommentRepository } from '@root/model/repositories/repositories/comment'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            installSubscriptionHandlers: true,
        }),
    ],
    providers: [
        ArticleResolver,
        GetArticleUseCase,
        ArticleRepository,
        UserRepository,
        CommentRepository,
        PrismaService,
    ],
    controllers: [RestController],
})
export class InterfaceModule {}
