interface IBaseErrorDescription<TPayload> {
    message: string
    payload?: TPayload
    fingerprint?: string
}

export class BaseError<
    TPayload extends Record<string, unknown> = Record<string, unknown>,
> extends Error {
    public readonly payload: TPayload | null
    public readonly fingerprint: string | undefined

    constructor(errorDescription: IBaseErrorDescription<TPayload>) {
        super(errorDescription.message)
        this.name = this.constructor.name
        this.payload = errorDescription.payload ?? null
        this.fingerprint = errorDescription.fingerprint
    }
}

/**
 * This error should be used when the application cannot continue with the current process.
 */
export class SevereError extends BaseError {}

export class InputError extends BaseError {}

export class UnexpectedError extends SevereError {}

export class InputNotFoundError extends BaseError {}

export class UnauthorizedError extends BaseError {}

export class NonCriticalError extends BaseError {}

export class RequestTimeoutError extends BaseError {}

export class OverloadError extends BaseError {}
