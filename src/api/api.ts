// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type PhotoQuery = {
    page?: number,
    limit?: number
}
type EnailMutation = {
    to: string,
    subject: string,
    content: string
}
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    endpoints: builder => ({
        sendMail: builder.mutation({  // POST请求API
            query: ({to, subject, content}: EnailMutation) => ({
                url: `/email`,
                method: "POST",
                body: {to, subject, content}
            })
        }),
        photos: builder.query({
            query: ({page, limit}: PhotoQuery) => `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
        }),
        photos2: builder.query({
            query: ({page, limit}: PhotoQuery) => `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
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