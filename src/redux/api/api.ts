import { CouponTypes, ProductTypes, ProductTypesPopulated, UserTypes } from "../../assets/demoData";
import { MessageTypes } from "../../Chatbot";
import { UserLocationTypes } from "../../pages/Login.Page";
import { AllOrdersResponseType, MyOrderResponseType } from "../../pages/MyOrders";
import { UserActivitiesTypes } from "../../pages/UserActivities";

export interface UpdateProductBodyType {
    _id?:string;
    productID?:string;
    name?:string;
    description?:string;
    price?:number;
    category?:string;
    stock?:number;

    total_servings?:number; diet_type?:string; flavour?:string; age_range?:string; about?:string[]; ingredient?:string;

    images?:string[];
    rating?:number;
    sku?:string;
    discount?:number;
    brand?:string;
    height?:number;
    width?:number;
    depth?:number;
    weight?:number;
    tags?:string;



    orderID?:string;
    quantity?:number;
    transactionId?:string;
    paymentStatus?:string;
    orderStatus?:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded";
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
export interface ChatTypes {
    adminID:string;
    chats:MessageTypes[];
    isHelpful?:boolean;
    createdAt?:string;
}
export type ResponseType<T> = {success:boolean; message:T;};
export interface OrderTransformedTypes {
    _id: string;
    orderID: string;
    name: string;
    price: number;
    quantity: number;
    images: string;
    orderStatus: string;
    createdAt: string;
    transactionId: string;
    paymentStatus: string;
    shippingType: string;
    message: string;
}

export const register = async({name, email, mobile, password, c_password, referrerUserID}:{name?:string; email?:string; mobile?:string; password?:string; c_password?:string; referrerUserID?:string|null;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/new`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({name, email, mobile, password, c_password,  referrerUserID})
        });

        const data:unknown = await res.json();

        console.log("----- register  api.ts");
        console.log(data);
        console.log("----- register  api.ts");
        return data as ResponseType<string>;
    } catch (error) {
        console.log(error);
        return error as ResponseType<Error>;
    }
};
//export const getMyChats = async() => {
//    try {
//        const myChatsRes = await fetch(`${import.meta.env.VITE_SERVER_URL`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/my_chats`, {
//            method:"GET",
//            credentials:"include"
//        });

//        const myChatsData = await myChatsRes.json();

//        console.log("----- getMyChats  api.ts");
//        console.log(myChatsData);
//        console.log("----- getMyChats  api.ts");
//        return myChatsData as ResponseType<ChatTypes[]>;
//    } catch (error) {
//        console.log("----- getMyChats  api.ts");
//        console.log(error);
//        console.log("----- getMyChats  api.ts");
//        return error as ResponseType<Error>;
//    }
//};
export const login = async(loginFormData:{email:string; password:string; action:string; userLocation:UserLocationTypes;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(loginFormData)
        });
        const data = await res.json();

        return data as ResponseType<string>;
    } catch (error) {
        return error as ResponseType<Error>;
    }
};
export const verifyEmail = async({verificationToken, emailType, newPassword, action, userLocation,   referrerUserID}:{verificationToken:string; emailType:string; newPassword?:string; action:string; userLocation:UserLocationTypes;    referrerUserID?:string|null;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/verifyemail`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({verificationToken, emailType, newPassword, action, userLocation,   referrerUserID})
        });
        const data = await res.json();
        return data as ResponseType<UserTypes>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const myProfile = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/me`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
        
        return data as ResponseType<UserTypes>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["MyWishlistedProducts", "MyProfile"]
};
export const myReferralGifts = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/referee`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<{userID:{name:string; email:string;}; coupon:CouponTypes; status:"pending"|"completed"}[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const applyMyCoupon = async({couponID}:{couponID:string;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/referee`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({couponID})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const updateMe = async({oldPassword, name, email, password, mobile, house, street, city, state, zip,           
    action, userLocation
}:UpdateMeBodyType) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({oldPassword, name, email, password, mobile, house, street, city, state, zip,        
                action, userLocation
            })
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const forgetPassword = async({email, action, userLocation}:{email:string, action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/forgetPassword`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({email, action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const removeAddress = async({house, street, city, state, zip, action, userLocation}:UpdateMeBodyType) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update`, {
            method:"DELETE",
            credentials:"include",
            body:JSON.stringify({house, street, city, state, zip, action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["MyProfile"]
};
export const logout = async({action, userLocation}:{action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const getAllUsersActivities = async({skip}:{skip:number}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/activities`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({skip})
        });
        const data = await res.json();

        return data as ResponseType<{
            activity:(UserActivitiesTypes&{_id:string; [key:string]:string})[];
            activityCount:number;
        }>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const addProduct = async(addProductFormData:FormData) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/new`, {
            method:"POST",

            credentials:"include",
            body:JSON.stringify(addProductFormData)
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const getAllProducts = async({skip}:{skip:number}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/all?skip=${skip}`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<{products:ProductTypes[]; totalProducts:number;}>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const getSingleProduct = async(productID:string) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productID}`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<ProductTypesPopulated>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["SingleProduct"]
};
export const getProductsOfSame = async({query, value}:{query:string; value:string;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/same/${query}/${value}`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<ProductTypes[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const searchProducts = async({searchQry, limit, skip, category, sub_category, brand, price, action, userLocation}:{searchQry:string; limit:number; skip:number; category:string; sub_category:string; brand:string; price:{minPrice:number; maxPrice:number;}, action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/search/${searchQry}?skip=${skip}`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({category, sub_category, brand, price, limit, action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<ProductTypes[] & {totalProducts:number}> ;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const productRecommendation = async({category, brand}:{category?:string[]; brand?:string[];}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/recommendation`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({category, brand})
        });
        const data = await res.json();

        return data as ResponseType<Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const addToCart = async(addToCartFormData:{productID:string; price:number; quantity:number; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/add`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(addToCartFormData)
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["MyCartProducts"]
};
export const removeFromCart = async(removeFromCartFormData:{productID:string; price:number; quantity:number; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/remove`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(removeFromCartFormData)
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["MyCartProducts"]
};
export const fetchMyCart = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["MyCartProducts"]
};
export const createReview = async({productID, rating, comment, action, userLocation}:{productID:string; rating:number; comment:string; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/review/${productID}/create`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({rating, comment, action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["SingleProduct"]
};
export const deleteReview = async({productID, action, userLocation}:{productID:string; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/review/${productID}/remove`, {
            method:"DELETE",
            credentials:"include",
            body:JSON.stringify({action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["SingleProduct"]
};
export const updateVote = async({reviewID, voted, action, userLocation}:{reviewID:string; voted:boolean|undefined; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/review/vote`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({reviewID, voted, action, userLocation})
        });
        const data = await res.json();

        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["SingleProduct"]
};
export const myWhishlist = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();

        return data as ResponseType<ProductTypesPopulated[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["MyWishlistedProducts"]
};
export const addRemoveFromWishlist = async({productID, action, userLocation}:{productID:string; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/${productID}/wishlist`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({action, userLocation})
        });

        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["MyWishlistedProducts"]
};
export const outStockProducts = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/outstock`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
        return data as ResponseType<(ProductTypes&{_id:string; [key:string]:string})[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const incompleteProducts = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/incomplete`, {
            method:"GET",
            credentials:"include"
        })
        const data = await res.json();
        return data as ResponseType<(ProductTypes&{_id:string; [key:string]:string})[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const findAllFields = async({groupedBy}:{groupedBy:string;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/groupedBy/${groupedBy}`, {
            method:"GET",
            credentials:"include"
        })
        const data = await res.json();
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC");
        console.log(data);
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC");
        
        return data as ResponseType<string[]>;
    }catch(error){
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC");
        console.log(error);
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC");
        return error as ResponseType<Error>;
    }
};
export const updateProduct = async({productID,
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
    tags}:UpdateProductBodyType) => {
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productID}`, {
                method:"PUT",
                credentials:"include",
                body:JSON.stringify({name, description, price, category, stock,
                    total_servings, diet_type, flavour, age_range, about, ingredient,                    
                    images, rating, sku, discount, brand, height, width, depth, weight, tags})
            })
            const data = await res.json();
            return data as ResponseType<string>;
        }catch(error){
            return error as ResponseType<Error>;
        }
};
export const getAllCoupons = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/coupon/all`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
        return data as ResponseType<CouponTypes[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["NewCoupon"]
};
export const myCoupons = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/coupon/myCoupons`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
        return data as ResponseType<CouponTypes[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["NewCoupon"]
};
export const createCoupons = async(createCouponsFormData:CreateCouponBodyType) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/coupon/new`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify(createCouponsFormData)
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["NewCoupon"]
};
export const getSingleCoupon = async({code, totalAmount}:{code:string; totalAmount:number;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/coupon/apply`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({code, totalAmount})
        });
        const data = await res.json();
        return data as ResponseType<CouponTypes>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const createPayment = async({amount, quantity, amountFormRecomm, action, userLocation}:{amount:number; quantity:number; amountFormRecomm:number|0; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/new`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({amount, quantity, amountFormRecomm, action, userLocation})
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const newOrder = async({orderItems, totalPrice, coupon, transactionId, paymentStatus, orderStatus, shippingType, message, parent, action, userLocation, recommendationProductsAmount}:{orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; transactionId:string; paymentStatus:string; orderStatus:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded"; shippingType:string; message:string; parent:string; action:string; userLocation:UserLocationTypes;    recommendationProductsAmount?:number;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/new`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({orderItems, totalPrice, coupon, transactionId, paymentStatus, orderStatus, shippingType, message, parent, action, userLocation,     recommendationProductsAmount})
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["MyCartProducts"]
};
export const fetchMyOrders = async({skip}:{skip:number}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/myOrders`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({skip})
        });
        const data = await res.json();
        return data as ResponseType<MyOrderResponseType>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export interface TTTT {
    _id?:string;
    orderID?:string;
    name?:string;
    price?:number;
    quantity?:number;
    images?:string[];
    orderStatus?:string;
    createdAt?:string;
    transactionId?:string;
    paymentStatus?:string;
    shippingType?:string;
    message?:string;
}
export const removeProductFromOrder = async({orderID, productID, removingProductPrice, removingProductQuantity, updatedOrderState, action, userLocation, orderCancelReason}:{orderID:string; productID:string; removingProductPrice:number; removingProductQuantity:number; updatedOrderState:"cancelled"|"returned"; action:string; userLocation:UserLocationTypes; orderCancelReason:string;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/myOrders`, {
            method:"DELETE",
            credentials:"include",
            body:JSON.stringify({orderID, productID, removingProductPrice, removingProductQuantity, updatedOrderState, action, userLocation, orderCancelReason})
        });
        const data = await res.json();
        //return data as ResponseType<OrderTransformedTypes[]>;
        return data as ResponseType<TTTT[]>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const allOrders = async() => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/all`, {
            method:"GET",
            credentials:"include"
        });
        const data = await res.json();
        return data as ResponseType<AllOrdersResponseType>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //providesTags:["Orders"]
};
export const updateOrder = async({orderID, orderStatus, action, userLocation}:{orderID:string; orderStatus:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded"; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/all`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({orderID, orderStatus, action, userLocation})
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
    //invalidatesTags:["Orders"]
};
export const createChat = async({adminID, chats, isHelpful, action, userLocation}:ChatTypes & {action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/new`, {
            method:"POST",
            credentials:"include",
            body:JSON.stringify({adminID, chats, isHelpful, action, userLocation})
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};
export const updateChatsHelpfulness = async({chatID, isHelpful, action, userLocation}:{chatID:string; isHelpful:boolean; action:string; userLocation:UserLocationTypes;}) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/isHelpfull`, {
            method:"PUT",
            credentials:"include",
            body:JSON.stringify({chatID, isHelpful, action, userLocation})
        });
        const data = await res.json();
        return data as ResponseType<string>;
    }catch(error){
        return error as ResponseType<Error>;
    }
};

//export const {
//    useRegisterMutation, useLoginMutation, useVerifyEmailMutation, useMyProfileQuery, useMyReferralGiftsQuery, , useForgetPasswordMutation, useUpdateMeMutation, useRemoveAddressMutation, useLogoutMutation, useGetAllUsersActivitiesMutation,
//    useAddProductMutation, useGetAllProductsQuery, useGetSingleProductQuery, useGetProductsOfSameQuery, useFindAllFieldsQuery, useSearchProductsMutation, useProductRecommendationMutation,
//    useAddToCartMutation, useFetchMyCartQuery,  useRemoveFromCartMutation, useCreateReviewMutation, useDeleteReviewMutation, useUpdateVoteMutation,
//    useMyWhishlistQuery, useAddRemoveFromWishlistMutation,
//    useOutStockProductsQuery, useIncompleteProductsQuery, useUpdateProductMutation,
//    useCreateCouponsMutation, useGetAllCouponsQuery, useMyCouponsQuery, useGetSingleCouponMutation,
//    useCreatePaymentMutation,
//    useNewOrderMutation, useMyOrdersMutation, useAllOrdersQuery, useRemoveProductFromOrderMutation, useUpdateOrderMutation,
//    useCreateChatMutation, useUpdateChatsHelpfulnessMutation
//};