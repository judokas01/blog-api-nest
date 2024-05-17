import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InterfaceModule } from '@root/interface/graphql/interface.module'

@Module({
    imports: [ConfigModule.forRoot(), InterfaceModule],
    controllers: [],
    providers: [],
})
export class BlogApp {}
