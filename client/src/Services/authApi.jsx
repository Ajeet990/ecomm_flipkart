import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const flipUserToken = localStorage.getItem('flipUserToken')
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
                    token:flipUserToken
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
        }),
        uploadProfile:builder.mutation({
            query:(file) => {
                const body = new FormData()
                body.append('Content-Type', file.type);
                body.append('file', file);
                return {
                  url: "upload",
                  method: "POST",
                  body
                }
            }
        }),
        register:builder.mutation({
            query:(userDetail) => ({
                url:'register',
                method:'post',
                body:userDetail
            })
        })
    })
})

export const { useLogInMutation, useGetProductListQuery,useUploadProfileMutation, useRegisterMutation } = authApi