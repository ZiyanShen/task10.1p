// Import the RTK Query methods from the React-specific entry point
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type PhotoQuery = {
    page?: number,
    limit?: number
}
type EnailMutation = {
    to: string,
    subject: string,
    content: string
}

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        // @ts-ignore
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions)

    // @ts-ignore
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            // @ts-ignore
            const user = api.getState().auth.user
            // store the new token
            // @ts-ignore
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        sendMail: builder.mutation({  // POST请求API
            query: ({to, subject, content}: EnailMutation) => ({
                url: `/email`,
                method: "POST",
                body: {to, subject, content}
            })
        }),
        photos: builder.query({
            query: ({page, limit}: PhotoQuery) => `/photos?page=${page}&limit=${limit}`
        }),
        photos2: builder.query({
            query: ({page, limit}: PhotoQuery) => `/photos?page=${page}&limit=${limit}`
        })
    })
})

// Export the auto-generated hook for the endpoint
// 使用方法：
// const [modify,{isLoading,isFetching,error}] = useModifyMutation()
// const {data, isFetching} = useGetQuery()
export const {
    useSendMailMutation,
    usePhotosQuery,
    usePhotos2Query
} = api