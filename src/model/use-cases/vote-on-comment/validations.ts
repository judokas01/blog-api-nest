import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { CommentData } from '@root/model/entities/comment'

export const validateVoteOnComment = (input: unknown) => {
    try {
        const { commentId, ip, vote } = createSchema.parse(input)
        return { commentId, ip, vote: additionalValueValidation(vote) } satisfies {
            commentId: CommentData['id']
            vote: 1 | -1
            ip: string
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid login input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const createSchema = z.object({
    commentId: z.string(),
    ip: z.string(),
    vote: z.number().max(1).min(-1),
})

const additionalValueValidation = (vote: number) => {
    if (vote === 1 || vote === -1) return vote
    throw new InputError({ message: 'Invalid vote value', payload: { vote } })
}
