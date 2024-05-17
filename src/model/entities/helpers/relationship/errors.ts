import { UnexpectedError } from '@root/model/errors'

export class RelationNotLoadedError extends UnexpectedError {
    constructor(path: string) {
        super({
            message: `Trying to access unloaded relation! The relation at: ${path} was not loaded!`,
            payload: { path },
        })
    }
}
