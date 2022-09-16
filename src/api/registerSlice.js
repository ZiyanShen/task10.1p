import { api } from "./api";

export const registerSlice = api.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useRegisterMutation
} = registerSlice