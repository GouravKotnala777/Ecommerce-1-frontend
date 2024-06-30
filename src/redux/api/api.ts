import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:`http://localhost:8000`
    }),
    endpoints:(builder) => ({
        register:builder.mutation({
            query:(data) => ({
                url:"/api/v1/user/new",
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:data
            })
        }),
        login:builder.mutation({
            query:(data) => ({
                url:"/api/v1/user/login",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:data
            })
        }),
        myProfile:builder.query({
            query:() => ({
                url:"/api/v1/user/me",
                method:"GET",
                credentials:"include"
            })
        }),
        addProduct:builder.mutation({
            query:(data) => ({
                url:"/api/v1/product/new",
                method:"POST",
                //headers:{
                //    "Content-Type":"multipart/form-data"
                //},
                credentials:"include",
                body:data
            })
        })
    })
})

export default api;
export const {useRegisterMutation, useLoginMutation, useMyProfileQuery, useAddProductMutation} = api;