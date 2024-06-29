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
        })
    })
})

export default api;
export const {useRegisterMutation} = api;