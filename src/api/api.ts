// Import the RTK Query methods from the React-specific entry point
import {BaseQueryApi} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials} from "../store/authSlice";
import {Timestamp} from 'firebase/firestore'
import qs from "qs"
import {createSelector} from "@reduxjs/toolkit";
import {deletePost, setPosts} from "../store/postSlice";
import {message} from "antd";

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
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            // @ts-ignore
            const user = api.getState().auth.user
            // store the new token
            console.log(refreshResult.data)
            // @ts-ignore
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
            // @ts-ignore
        } else if ([401, 403].includes(refreshResult?.error?.originalStatus)) {
            api.dispatch(setCredentials({user: null, token: null}))
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
        }),
        addPost: builder.mutation({
            query: (post) => ({
                url: "/post",
                method: "POST",
                body: post
            })
        }),
        getPost: builder.mutation({
            query: (filter) => {
                const queryString = qs.stringify(filter)
                return {
                    url: `/post?${queryString}`,
                    method: "GET",
                }
            },
            transformResponse: (response) => {
                // @ts-ignore
                return response.map(item => {
                    item.data = JSON.parse(item.data)
                    item.timestamp = Number(`${item.timestamp._seconds}.${item.timestamp._nanoseconds}`)
                    return item
                })
            },
            onCacheEntryAdded: async (arg, {
                dispatch,
                getState,
                extra,
                requestId,
                cacheEntryRemoved,
                cacheDataLoaded,
                getCacheEntry
            }) => {
                await cacheDataLoaded
                const cache = getCacheEntry()
                dispatch(setPosts(cache.data))
            }
        }),
        deletePost: builder.mutation({
            query: (delArgs) => {
                const queryString = qs.stringify(delArgs)
                return {
                    url:`/post?${queryString}`,
                    method:"DELETE"
                }
            },
            onCacheEntryAdded: async (arg, {
                dispatch,
                getState,
                extra,
                requestId,
                cacheEntryRemoved,
                cacheDataLoaded,
                getCacheEntry
            }) => {
                await cacheDataLoaded
                dispatch(deletePost(arg))
                message.success("Delete post successful!")
            }
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
    usePhotos2Query,
    useAddPostMutation,
    useGetPostMutation,
    useDeletePostMutation
} = api

// @ts-ignore
export const selectPostsQuery = api.endpoints.getPost.select()
// export const selectPostsQuery = createSelector(selectPosts,res=>res.data)