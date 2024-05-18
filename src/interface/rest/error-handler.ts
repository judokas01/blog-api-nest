import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import {
    BaseError,
    InputError,
    InputNotFoundError,
    OverloadError,
    RequestTimeoutError,
    UnauthorizedError,
} from '@root/model/errors'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const statusCode = inferErrorStatusCode(exception)
        const message = exception.message
        const payload = exception instanceof BaseError ? exception.payload : undefined

        return response.status(statusCode).json({
            message,
            payload,
        })
    }
}

const inferErrorStatusCode = (error: unknown | null): number => {
    if (error === null) return StatusCode.Ok

    if (error instanceof InputError) {
        return StatusCode.InvalidInput
    }

    if (error instanceof UnauthorizedError) {
        return StatusCode.Unauthorized
    }

    if (error instanceof InputNotFoundError) {
        return StatusCode.NotFound
    }

    if (error instanceof RequestTimeoutError) {
        return StatusCode.RequestTimeout
    }

    if (error instanceof OverloadError) {
        return StatusCode.Overload
    }

    return StatusCode.InternalError
}

enum StatusCode {
    Ok = 200,
    InvalidInput = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalError = 500,
    RequestTimeout = 408,
    Overload = 529,
}
