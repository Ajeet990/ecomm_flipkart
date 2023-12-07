import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const flipUserToken = localStorage.getItem('flipUserToken')

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5002/api/' }),
    tagTypes:['categoryApi'],
    endpoints: (builder) => ({
        allCategory:builder.query({
            query:() => ({
                url:'category/getCategoryList',
                method:"GET",
                headers:{
                    token:flipUserToken
                }
            })
        }),
        
    })
})

export const {
    useAllCategoryQuery
} = categoryApi