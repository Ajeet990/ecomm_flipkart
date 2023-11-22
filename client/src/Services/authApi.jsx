import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5002/api/' }),
    tagTypes:['authApi'],
    endpoints: (builder) => ({
        getProductList:builder.query({
            query:() => ({
                url:'product/getProductList',
                method:"GET",
                headers:{
                    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE5vdiAxNSAyMDIzIDE4OjUwOjQ1IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJJZCI6Ilk5V3ZNQVBRX2U4ZDN4dzZGbEl4TSIsImlhdCI6MTcwMDA1NDQ0NX0.2aV96xLZeIRuM_fG9yLYe0CbRj3MVwCGdkFdTvpfE3Y'
                }
            })
        }),
        logIn: builder.mutation({
            query: (userDetail) => ({
                url: 'login',
                method: 'POST',
                body:{
                    email:userDetail.email,
                    password:userDetail.password
                }
            }),
            // providesTags: ['authApi']
        })
    })
})

export const { useLogInMutation, useGetProductListQuery } = authApi