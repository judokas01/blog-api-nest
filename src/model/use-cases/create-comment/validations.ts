import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { Article } from '@root/model/entities/article'
import { CommentData } from '@root/model/entities/comment'

export const validateCreateCommentInput = (input: unknown) => {
    try {
        const { articleId, content } = createSchema.parse(input)
        return { articleId, content } satisfies {
            content: CommentData['content']
            articleId: Article['id']
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid create comment input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const createSchema = z.object({
    articleId: z.string(),
    content: z.string(),
})
