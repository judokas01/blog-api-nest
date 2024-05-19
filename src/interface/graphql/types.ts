import { Response, Request } from 'express'

export type GqlContextRequest = {
    req: Request
    res: Response
}
