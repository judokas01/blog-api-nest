import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { CommentData } from '@root/model/entities/comment'

export const validateVoteOnComment = (input: unknown) => {
    try {
        const { commentId, ip, vote } = voteOnSchema.parse(input)
        return { commentId, ip, vote } satisfies {
            commentId: CommentData['id']
            vote: 1 | -1
            ip: string
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid comment vote input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const voteOnSchema = z.object({
    commentId: z.string(),
    ip: z.string(),
    vote: z.union([z.literal(1), z.literal(-1)]),
})
