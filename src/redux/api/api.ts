import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UpdateProductBodyType {
    productID?:string;
    name?:string;
    description?:string;
    price?:number;
    category?:string;
    stock?:number;
    images?:string;
    rating?:number;
    sku?:string;
    discount?:number;
    brand?:string;
    height?:number;
    width?:number;
    depth?:number;
    weight?:number;
    tags?:string
}

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
        }),
        getAllProducts:builder.query({
            query:() => ({
                url:"/api/v1/product/all",
                method:"GET",
                credentials:"include"
            })
        }),
        getSingleProduct:builder.query({
            query:(productID) => ({
                url:`/api/v1/product/${productID}`,
                method:"GET",
                credentials:"include"
            })
        }),
        addToCart:builder.mutation({
            query:(data:{productID:string; quantity:number;}) => ({
                url:"/api/v1/cart/add",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:data
            })
        }),
        removeFromCart:builder.mutation({
            query:(data:{productID:string; quantity:number;}) => ({
                url:"/api/v1/cart/remove",
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:data
            })
        }),
        fetchMyCart:builder.query({
            query:() => ({
                url:"/api/v1/cart",
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
        }),
        createReview:builder.mutation({
            query:({productID, rating, comment}:{productID:string; rating:number; comment:string;}) => ({
                url:`/api/v1/review/${productID}/create`,
                method:"POST",
                credentials:"include",
                body:{rating, comment}
            })
        }),
        deleteReview:builder.mutation({
            query:({productID}:{productID:string;}) => ({
                url:`/api/v1/review/${productID}/remove`,
                method:"DELETE",
                credentials:"include"
            })
        }),
        myWhishlist:builder.query({
            query:() => ({
                url:`/api/v1/user/wishlist`,
                method:"GET",
                credentials:"include"
            })
        }),
        addRemoveFromWishlist:builder.mutation({
            query:({productID}:{productID:string;}) => ({
                url:`/api/v1/user/${productID}/wishlist`,
                method:"PUT",
                credentials:"include"
            })
        }),
        outStockProducts:builder.query({
            query:() => ({
                url:"/api/v1/product/outstock",
                method:"GET",
                credentials:"include"
            })
        }),
        updateProduct:builder.mutation({
            query:({productID,
                name,
                description,
                price,
                category,
                stock,
                images,
                rating,
                sku,
                discount,
                brand,
                height,
                width,
                depth,
                weight,
                tags}:UpdateProductBodyType) => ({
                url:`/api/v1/product/${productID}`,
                method:"PUT",
                credentials:"include",
                body:{name, description, price, category, stock, images, rating, sku, discount, brand, height, width, depth, weight, tags}
            })
        })
    })
})

export default api;
export const {useRegisterMutation, useLoginMutation, useMyProfileQuery, useAddProductMutation, useGetAllProductsQuery, useGetSingleProductQuery, useAddToCartMutation, useFetchMyCartQuery, useRemoveFromCartMutation, useCreateReviewMutation, useDeleteReviewMutation, useMyWhishlistQuery, useAddRemoveFromWishlistMutation,
    useOutStockProductsQuery, useUpdateProductMutation} = api;