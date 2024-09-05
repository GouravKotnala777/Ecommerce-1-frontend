import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface UserTypes{
    _id: string;
    name: string;
    email: string;
    password: string;
    address: {
        house:string;
        street: string;
        city: string;
        state: string;
        zip: string;
    }[];
    mobile: string;
    role: string;
    orderHistory: string[];
    wishlist: string[];
    cart: string;
    profileImage: string;
    emailVerified: boolean;
}
export interface ProductTypes {
    _id:string;
    name:string;
    description:string;
    price: number;
    category: string;
    stock: number;


    sub_category:string;
    sub_category_type?:string;
    item_form:string;

    total_servings:number;
    diet_type:string;
    flavour:string;
    age_range:string;
    about:string[];
    ingredient:string;


    images: string[];
    rating: number;
    reviews:string[];
    sku: string;
    discount: number;
    brand: string;
    dimensions: {
        height: number;
        width: number;
        depth: number;
    },
    weight: number;
    tags: string[]
}
export interface ProductTypesPopulated {
    _id:string;
    name:string;
    description:string;
    price: number;
    category: string;
    stock: number;


    sub_category:string;
    sub_category_type?:string;
    item_form:string;

    total_servings:number;
    diet_type:string;
    flavour:string;
    age_range:string;
    about:string[];
    ingredient:string;


    images: string[];
    rating: number;
    reviews:{
        _id:string;
        productID:string;
        userID:{
            _id:string;
            name:string;
            email:string;
        },
        rating:number;
        comment:string;
        isPurchaseVerified: boolean;

        upVotes:string[];
        downVotes:string[];

        updatedAt:string;
        createdAt:string;
    }[];
    sku: string;
    discount: number;
    brand: string;
    dimensions: {
        height: number;
        width: number;
        depth: number;
    },
    weight: number;
    tags: string[]
}
export interface CartTypes {
    _id: string;
    userID: string;
    products: {
        productID:string;
        quantity:number;
    }[];
    totalPrice: number;
}
export interface CouponTypes {
    _id:string;
    code:string;
    discountType:string;
    amount:number;
    minPerchaseAmount:number;
    startedDate:Date;
    endDate:Date;
    usageLimit:number;
    usedCount:number;
}
export interface MutationSuccessResponse {
    data: {success:boolean; message:string;};
    error?: undefined;
}
export interface MutationErrorResponse {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
}
export type MutationResTypes = (MutationSuccessResponse|MutationErrorResponse);






//export const userData:UserTypes = {
//    _id: "12345678765432333",
//    name: "gourav",
//    email: "gouravkotnala777@gmail.com",
//    password: "gg",
//    address: {
//        street:"2",
//        city:"faridabad",
//        state:"haryana",
//        zip:"121002"
//    },
//    mobile: "8882732859",
//    role: "user",
//    orderHistory: ["ssdsdsdsdsdsdsdsdsd"],
//    wishlist: ["ssdsdsdsdsdsdsdsdsd"],
//    cart: "12345678987654",
//    profileImage: "demo img",
//    emailVerified: true
//}

//export const productData:ProductTypes[] = [
//    {
//        _id:"45678986543456789",
//        name:"Product1",
//        description:"this is product1 it is best product ever in this site",
//        price: 1999,
//        category: "electronics",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it k;dsj.fklsjdf dfjlksdfk dsfhdgkdg c[bkqmdnf 00d fkmwe idifjidfk"
//        },{
//            _id:"qwertyuioplkjhgg",
//            name:"naruto",
//            rating:5,
//            comment:"I am naruto uzumaki"
//        },{
//            _id:"qwertyuioplkjhgh",
//            name:"sasuke",
//            rating:1,
//            comment:"It has to be better, sadkms qdjii aisskqmwioh sdintb erwje flksdfsdpifkanwe ossdjslkasd ksdj dsjdsd jas dasjdsdja kk,s"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "oppo",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["mobile", "phone"]
//    },
//    {
//        _id:"45678986543456788",
//        name:"Product2",
//        description:"this is product2",
//        price: 199,
//        category: "clothes",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "zara",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["clothes", "shirt"]
//    },
//    {
//        _id:"45678986543456787",
//        name:"Product3",
//        description:"this is product3",
//        price: 2999,
//        category: "electronics",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "samsung",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["mobile", "phone"]
//    },
//    {
//        _id:"45678986543456786",
//        name:"Product4",
//        description:"this is product4",
//        price: 1990,
//        category: "electronics",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "oppo",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["mobile", "phone"]
//    },
//    {
//        _id:"45678986543456785",
//        name:"Product5",
//        description:"this is product5",
//        price: 70,
//        category: "electronics",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "lava",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["mobile", "phone"]
//    },
//    {
//        _id:"45678986543456784",
//        name:"Product6",
//        description:"this is product6",
//        price: 5000,
//        category: "footwear",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "nike",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["shoe", "sneeker"]
//    },
//    {
//        _id:"45678986543456783",
//        name:"Product7",
//        description:"this is product7",
//        price: 19,
//        category: "clothes",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "armani",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["shirt", "tops"]
//    },
//    {
//        _id:"45678986543456782",
//        name:"Product8",
//        description:"this is product8",
//        price: 5800,
//        category: "electronics",
//        stock: 10,
//        images: ["demo img"],
//        rating: 9,
//        reviews:[{
//            _id:"qwertyuioplkjhgf",
//            name:"gourav",
//            rating:3,
//            comment:"this is it"
//        }],
//        sku:"string",
//        discount: 0,
//        brand: "nokia",
//        dimensions: {
//            height: 0,
//            width: 0,
//            depth: 0,
//        },
//        weight: 0,
//        tags: ["mobile", "phone"]
//    },
//];

//export const cartData:CartTypes = {
//    _id: "12345678908765",
//    userID:"12345678765432333",
//    products: [{
//        productID:"45678986543456789",
//        quantity:3,
//    }],
//    totalPrice: 696969,
//}