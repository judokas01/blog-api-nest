import { Controller, Get } from '@nestjs/common'

@Controller()
export class RestController {
    constructor() {}

    @Get('/hello')
    getGql() {
        return 'kvak'
    }
}
