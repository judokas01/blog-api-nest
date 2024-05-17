export type GqlContextRequest = {
    req: {
        headers: { username?: string; password?: string; origin: string }
    }
}
