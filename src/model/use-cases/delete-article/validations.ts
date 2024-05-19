import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { Article } from '@root/model/entities/article'

export const validateDeleteArticleInput = (input: unknown) => {
    try {
        const id = z.string().parse(input)
        return id satisfies Article['id']
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid id.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}
