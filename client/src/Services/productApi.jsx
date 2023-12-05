import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const flipUserToken = localStorage.getItem('flipUserToken')

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5002/api/' }),
    tagTypes:['productApi'],
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
        addProduct:builder.mutation({
            query:(productDetail) => ({
                url:"product/addProduct",
                method:"POST",
                body:productDetail,
                headers:{
                    token:flipUserToken
                }
            })
        }),
        addProductImage:builder.mutation({
            query:(productImage) => {
                const body = new FormData()
                body.append('Content-Type', productImage.type);
                body.append('productImage', productImage);
                return {
                  url: "product/addProductImage",
                  method: "POST",
                  body,
                  headers:{
                    token:flipUserToken
                }
                }
            }
        })
    })
})

export const {
    useGetProductListQuery,
    useAddProductMutation,
    useAddProductImageMutation
} = productApi