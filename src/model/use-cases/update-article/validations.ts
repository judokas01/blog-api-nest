import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { Article, ArticleData } from '@root/model/entities/article'

export const validateUpdateArticleInput = (input: unknown) => {
    try {
        const { articleId, update } = createSchema.parse(input)
        return { articleId, update } satisfies {
            articleId: Article['id']
            update: Partial<Pick<ArticleData, 'content' | 'perex' | 'title'>>
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid update article input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const createSchema = z.object({
    articleId: z.string(),
    update: z.object({
        content: z.string().optional(),
        perex: z.string().optional(),
        title: z.string().optional(),
    }),
})
