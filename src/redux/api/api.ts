import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UpdateProductBodyType {
    productID?:string;
    name?:string;
    description?:string;
    price?:number;
    category?:string;
    stock?:number;

    total_servings:number; diet_type:string; flavour:string; age_range:string; about:string[]; ingredient:string;

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
export interface CreateCouponBodyType {
    discountType:string;
    amount:number;
    minPerchaseAmount:number;
    startedDate:string;
    endDate:string;
    usageLimit:number;
    usedCount:number;
}
export interface UpdateMeBodyType {
    name?:string;
    email?:string;
    password?:string;
    mobile?:string;
    house?:string;
    street?:string;
    city?:string;
    state?:string;
    zip?:string;
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
        updateMe:builder.mutation({
            query:({name, email, password, mobile, house, street, city, state, zip}:UpdateMeBodyType) => ({
                url:"/api/v1/user/update",
                method:"PUT",
                credentials:"include",
                body:{name, email, password, mobile, house, street, city, state, zip}
            })
        }),
        removeAddress:builder.mutation({
            query:({house, street, city, state, zip}:UpdateMeBodyType) => ({
                url:"/api/v1/user/update",
                method:"DELETE",
                credentials:"include",
                body:{house, street, city, state, zip}
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
        //getAllProducts:builder.query({
        //    query:(skip:number) => ({
        //        url:`/api/v1/product/all?skip=${skip}`,
        //        method:"GET",
        //        credentials:"include"
        //    })
        //}),
        getAllProducts:builder.query({
            query:(skip:number) => ({
                url:`/api/v1/product/all?skip=${skip}`,
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
        getProductsOfSame:builder.query({
            query:({query, value}) => ({
                url:`/api/v1/product/same/${query}/${value}`,
                method:"GET",
                credentials:"include"
            })
        }),
        //searchProducts:builder.query({
        //    query:({searchQry, category, sub_category, brand}:{searchQry:string; category:string; sub_category:string; brand:string;}) => ({
        //        url:`/api/v1/product/search/${searchQry}`,
        //        method:"GET",
        //        credentials:"include"
        //    })
        //}),
        searchProducts:builder.mutation({
            query:({searchQry, category, sub_category, brand, price}:{searchQry:string; category:string; sub_category:string; brand:string; price:{minPrice:number; maxPrice:number;}}) => ({
                url:`/api/v1/product/search/${searchQry}`,
                method:"POST",
                credentials:"include",
                body:{category, sub_category, brand, price}
            })
        }),
        addToCart:builder.mutation({
            query:(data:{productID:string; price:number; quantity:number;}) => ({
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
            query:(data:{productID:string; price:number; quantity:number;}) => ({
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
        incompleteProducts:builder.query({
            query:() => ({
                url:"/api/v1/product/incomplete",
                method:"GET",
                credentials:"include"
            })
        }),
        findAllFields:builder.query({
            query:({groupedBy}:{groupedBy:string;}) => ({
                url:`/api/v1/product/groupedBy/${groupedBy}`,
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

                total_servings, diet_type, flavour, age_range, about, ingredient,

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
                body:{name, description, price, category, stock,
                    total_servings, diet_type, flavour, age_range, about, ingredient,                    
                    images, rating, sku, discount, brand, height, width, depth, weight, tags}
            })
        }),
        getAllCoupons:builder.query({
            query:() => ({
                url:"/api/v1/coupon/all",
                method:"GET",
                credentials:"include"
            })
        }),
        createCoupons:builder.mutation({
            query:(data:CreateCouponBodyType) => ({
                url:"/api/v1/coupon/new",
                method:"POST",
                credentials:"include",
                body:data
            })
        }),
        getSingleCoupon:builder.mutation({
            query:({code, totalAmount}:{code:string; totalAmount:number;}) => ({
                url:"/api/v1/coupon/apply",
                method:"POST",
                credentials:"include",
                body:{code, totalAmount}
            })
        }),
        createPayment:builder.mutation({
            query:({amount, quantity}:{amount:number; quantity:number;}) => ({
                url:"/api/v1/payment/new",
                method:"POST",
                credentials:"include",
                body:{amount, quantity}
            })
        }),
        newOrder:builder.mutation({
            query:({orderItems, totalPrice, coupon, transactionId, status, shippingType, message, parent}:{orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; transactionId:string; status:string; shippingType:string; message:string; parent:string;}) => ({
                url:"/api/v1/order/new",
                method:"POST",
                credentials:"include",
                body:{orderItems, totalPrice, coupon, transactionId, status, shippingType, message, parent}
            })
        })
    })
})

export default api;
export const {useRegisterMutation, useLoginMutation, useMyProfileQuery, useUpdateMeMutation, useRemoveAddressMutation,
    useAddProductMutation, useGetAllProductsQuery, useGetSingleProductQuery, useGetProductsOfSameQuery, useFindAllFieldsQuery, useSearchProductsMutation,
    useAddToCartMutation, useFetchMyCartQuery,  useRemoveFromCartMutation, useCreateReviewMutation, useDeleteReviewMutation, useMyWhishlistQuery, useAddRemoveFromWishlistMutation,
    useOutStockProductsQuery, useIncompleteProductsQuery, useUpdateProductMutation,
    useCreateCouponsMutation, useGetAllCouponsQuery, useGetSingleCouponMutation,
    useCreatePaymentMutation,
    useNewOrderMutation
} = api;