import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageTypes } from "../../Chatbot";
import { UserLocationTypes } from "../../pages/Login.Page";

export interface UpdateProductBodyType {
    _id?:string;
    productID?:string;
    name?:string;
    description?:string;
    price?:number;
    category?:string;
    stock?:number;

    total_servings?:number; diet_type?:string; flavour?:string; age_range?:string; about?:string[]; ingredient?:string;

    images?:string;
    rating?:number;
    sku?:string;
    discount?:number;
    brand?:string;
    height?:number;
    width?:number;
    depth?:number;
    weight?:number;
    tags?:string;



    transactionId?:string;
    status?:string;
    message?:string;

    shippingType?:string;
    createdAt?:Date;
}
export interface CreateCouponBodyType {
    discountType:string;
    amount:number;
    minPerchaseAmount:number;
    startedDate:string;
    endDate:string;
    usageLimit:number;
    usedCount:number;
    action:string;
    userLocation:UserLocationTypes;
}
export interface UpdateMeBodyType {
    oldPassword?:string;
    name?:string;
    email?:string;
    password?:string;
    mobile?:string;
    house?:string;
    street?:string;
    city?:string;
    state?:string;
    zip?:string;


    action?:string;
    userLocation?:UserLocationTypes;

    //ipAddress:string; userAgent:string; userLocation:string; platform:string; device:string; referrer:string; success:boolean; errorDetails?:string;
}
//export interface MessagesTypes {
//    senderID: string;
//    content: string;
//    createdAt: string;
//}
export interface ChatTypes {
    adminID:string;
    chats:MessageTypes[];
    isHelpful?:boolean;
    createdAt?:string;
}

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_SERVER_URL
    }),
    tagTypes:["MyWishlistedProducts", "MyCartProducts", "SingleProduct", "MyProfile"],
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
        verifyEmail:builder.mutation({
            query:({verificationToken, emailType, newPassword}:{verificationToken:string; emailType:string; newPassword?:string;}) => ({
                url:"/api/v1/user/verifyemail",
                method:"POST",
                credentials:"include",
                body:{verificationToken, emailType, newPassword}
            })
        }),
        myProfile:builder.query({
            query:() => ({
                url:"/api/v1/user/me",
                method:"GET",
                credentials:"include"
            }),
            providesTags:["MyWishlistedProducts", "MyProfile"]
        }),
        updateMe:builder.mutation({
            query:({oldPassword, name, email, password, mobile, house, street, city, state, zip,           
                action, userLocation
                //device, errorDetails, ipAddress, platform, referrer, success, userAgent, userLocation
            }:UpdateMeBodyType) => ({
                url:"/api/v1/user/update",
                method:"PUT",
                credentials:"include",
                body:{oldPassword, name, email, password, mobile, house, street, city, state, zip,        
                    action, userLocation
                    //device, errorDetails, ipAddress, platform, referrer, success, userAgent, userLocation
                }
            })
        }),
        forgetPassword:builder.mutation({
            query:({email}:{email:string}) => ({
                url:"/api/v1/user/forgetPassword",
                method:"PUT",
                credentials:"include",
                body:{email}
            })
        }),
        removeAddress:builder.mutation({
            query:({house, street, city, state, zip, action, userLocation}:UpdateMeBodyType) => ({
                url:"/api/v1/user/update",
                method:"DELETE",
                credentials:"include",
                body:{house, street, city, state, zip, action, userLocation}
            }),
            invalidatesTags:["MyProfile"]

        }),
        logout:builder.mutation({
            query:({action, userLocation}:{action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/user/logout",
                method:"POST",
                credentials:"include",
                body:{action, userLocation}
            })
        }),
        getAllUsersActivities:builder.query({
            query:() => ({
                url:"/api/v1/user/activities",
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
            }),
            providesTags:["SingleProduct"]
        }),
        getProductsOfSame:builder.query({
            query:({query, value}) => ({
                url:`/api/v1/product/same/${query}/${value}`,
                method:"GET",
                credentials:"include"
            })
        }),
        searchProducts:builder.mutation({
            query:({searchQry, limit, skip, category, sub_category, brand, price}:{searchQry:string; limit:number; skip:number; category:string; sub_category:string; brand:string; price:{minPrice:number; maxPrice:number;}}) => ({
                url:`/api/v1/product/search/${searchQry}?skip=${skip}`,
                method:"POST",
                credentials:"include",
                body:{category, sub_category, brand, price, limit}
            })
        }),
        productRecommendation:builder.mutation({
            query:({category, brand}:{category?:string[]; brand?:string[];}) => ({
                url:"/api/v1/product/recommendation",
                method:"POST",
                credentials:"include",
                body:{category, brand}
            })
        }),
        addToCart:builder.mutation({
            query:(data:{productID:string; price:number; quantity:number; action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/cart/add",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:data
            }),
            invalidatesTags:["MyCartProducts"]
        }),
        removeFromCart:builder.mutation({
            query:(data:{productID:string; price:number; quantity:number; action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/cart/remove",
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:data
            }),
            invalidatesTags:["MyCartProducts"]
        }),
        fetchMyCart:builder.query({
            query:() => ({
                url:"/api/v1/cart",
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            }),
            providesTags:["MyCartProducts"]
        }),
        createReview:builder.mutation({
            query:({productID, rating, comment, action, userLocation}:{productID:string; rating:number; comment:string; action:string; userLocation:UserLocationTypes;}) => ({
                url:`/api/v1/review/${productID}/create`,
                method:"POST",
                credentials:"include",
                body:{rating, comment, action, userLocation}
            }),
            invalidatesTags:["SingleProduct"]
        }),
        deleteReview:builder.mutation({
            query:({productID, action, userLocation}:{productID:string; action:string; userLocation:UserLocationTypes;}) => ({
                url:`/api/v1/review/${productID}/remove`,
                method:"DELETE",
                credentials:"include",
                body:{action, userLocation}
            }),
            invalidatesTags:["SingleProduct"]
        }),
        updateVote:builder.mutation({
            query:({reviewID, voted, action, userLocation}:{reviewID:string; voted:boolean|undefined; action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/review/vote",
                method:"PUT",
                credentials:"include",
                body:{reviewID, voted, action, userLocation}
            }),
            invalidatesTags:["SingleProduct"]
        }),
        myWhishlist:builder.query({
            query:() => ({
                url:`/api/v1/user/wishlist`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["MyWishlistedProducts"]
        }),
        addRemoveFromWishlist:builder.mutation({
            query:({productID, action, userLocation}:{productID:string; action:string; userLocation:UserLocationTypes;}) => ({
                url:`/api/v1/user/${productID}/wishlist`,
                method:"PUT",
                credentials:"include",
                body:{action, userLocation}
            }),
            invalidatesTags:["MyWishlistedProducts"]
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
            query:({amount, quantity, amountFormRecomm, action, userLocation}:{amount:number; quantity:number; amountFormRecomm:number|0; action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/payment/new",
                method:"POST",
                credentials:"include",
                body:{amount, quantity, amountFormRecomm, action, userLocation}
            })
        }),
        newOrder:builder.mutation({
            query:({orderItems, totalPrice, coupon, transactionId, status, shippingType, message, parent, action, userLocation}:{orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; transactionId:string; status:string; shippingType:string; message:string; parent:string; action:string; userLocation:UserLocationTypes;}) => ({
                url:"/api/v1/order/new",
                method:"POST",
                credentials:"include",
                body:{orderItems, totalPrice, coupon, transactionId, status, shippingType, message, parent, action, userLocation}
            }),
            invalidatesTags:["MyCartProducts"]
        }),
        myOrders:builder.query({
            query:() => ({
                url:"/api/v1/order/myOrders",
                method:"GET",
                credentials:"include"
            })
        }),
        createChat:builder.mutation({
            query:({adminID, chats, isHelpful}:ChatTypes) => ({
                url:"/api/v1/chat/new",
                method:"POST",
                credentials:"include",
                body:{adminID, chats, isHelpful}
            })
        }),
        updateChatsHelpfulness:builder.mutation({
            query:({chatID, isHelpful}:{chatID:string; isHelpful:boolean;}) => ({
                url:"/api/v1/chat/isHelpfull",
                method:"PUT",
                credentials:"include",
                body:{chatID, isHelpful}
            })
        }),
        //newUserActivity:builder.mutation({
        //    query:({}:{}) => ({
        //        url:"/api/activity/new",
        //        method:"POST",
        //        credentials:"include",
        //        body:{}
        //    })
        //})
    })
})

export default api;
export const {useRegisterMutation, useLoginMutation, useVerifyEmailMutation, useMyProfileQuery, useForgetPasswordMutation, useUpdateMeMutation, useRemoveAddressMutation, useLogoutMutation, useGetAllUsersActivitiesQuery,
    useAddProductMutation, useGetAllProductsQuery, useGetSingleProductQuery, useGetProductsOfSameQuery, useFindAllFieldsQuery, useSearchProductsMutation, useProductRecommendationMutation,
    useAddToCartMutation, useFetchMyCartQuery,  useRemoveFromCartMutation, useCreateReviewMutation, useDeleteReviewMutation, useUpdateVoteMutation,
    useMyWhishlistQuery, useAddRemoveFromWishlistMutation,
    useOutStockProductsQuery, useIncompleteProductsQuery, useUpdateProductMutation,
    useCreateCouponsMutation, useGetAllCouponsQuery, useGetSingleCouponMutation,
    useCreatePaymentMutation,
    useNewOrderMutation, useMyOrdersQuery,
    useCreateChatMutation, useUpdateChatsHelpfulnessMutation
} = api;