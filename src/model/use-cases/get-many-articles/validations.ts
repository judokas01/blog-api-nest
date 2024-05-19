import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { FindManyArticlesArgs } from '@root/model/repositories/repositories/article'

export const validateGetManyArticlesInput = (input: unknown) => {
    try {
        const { filters, pagination } = getManySchema.parse(input)
        return {
            filters,
            pagination: { limit: pagination.limit, offset: pagination.offset },
        } satisfies FindManyArticlesArgs
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid filter input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const getManySchema = z.object({
    filters: z
        .object({
            title: z.string().optional(),
            perex: z.string().optional(),
            authorUsername: z.string().optional(),
            createdBefore: z.date().optional(),
            createdAfter: z.date().optional(),
        })
        .optional(),
    pagination: z
        .object({
            limit: z.number(),
            offset: z.number(),
        })
        .optional(),
})
