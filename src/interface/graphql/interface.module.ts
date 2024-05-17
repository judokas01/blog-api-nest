import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { RestController } from '../rest/rest.controller'
import { upperDirectiveTransformer } from './common/upper-case.directive'
import { ArticleResolver } from './article/article.resolver'
import { GetArticleUseCase } from '@root/model/use-cases/get-article'
import { ArticleRepository } from '@root/model/repositories/repositories/article'
import { PrismaService } from '@root/infrastructure/prisma/client'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: 'schema.gql',
            transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
            sortSchema: true,
            installSubscriptionHandlers: true,
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
        }),
    ],
    providers: [ArticleResolver, GetArticleUseCase, ArticleRepository, PrismaService],
    controllers: [RestController],
})
export class InterfaceModule {}
