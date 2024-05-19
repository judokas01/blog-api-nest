import { ZodError, z } from 'zod'
import { InputError, UnexpectedError } from '@root/model/errors'
import { User } from '@root/model/entities/user'

export const validateLoginInput = (input: unknown) => {
    try {
        const { password, username } = loginSchema.parse(input)
        return { password, username } satisfies Pick<User['data'], 'username' | 'password'>
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

export const validateUserToken = (input: unknown) => {
    try {
        const token = tokenSchema.parse(input)
        return token
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid token.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

export const validateRegisterInput = (input: unknown) => {
    try {
        const { email, password, username } = newUserSchema.parse(input)
        return { email, password, username } satisfies Pick<
            User['data'],
            'username' | 'password' | 'email'
        >
    } catch (error) {
        if (error instanceof ZodError) {
            throw new InputError({
                message: 'Invalid registration input.',
                payload: { issues: error.issues },
            })
        }

        throw new UnexpectedError({ message: 'Unexpected error', payload: { error } })
    }
}

const tokenSchema = z.string()

const newUserSchema = z
    .object({
        username: z.string(),
        password: z.string().min(6),
        email: z.string().email(),
    })
    .strict()

const loginSchema = z.object({
    username: z.string(),
    // todo improve password validation
    password: z.string().min(6),
})
