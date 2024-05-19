import { ZodError, z } from 'zod'
import type { CreateArticleData } from '.'
import { InputError, UnexpectedError } from '@root/model/errors'

export const validateCreateArticleInput = (input: unknown) => {
    try {
        const { content, perex, title } = createSchema.parse(input)
        return { content, perex, title } satisfies CreateArticleData
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid create article input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const createSchema = z
    .object({
        content: z.string(),
        perex: z.string(),
        title: z.string(),
    })
    .strict()
