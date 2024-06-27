export interface UserTypes{
    _id: string;
    name: string;
    email: string;
    password: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
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
export interface CartTypes {
    _id: string;
    userID: string;
    products: {
        productID:string;
        quantity:number;
    }[];
    totalPrice: number;
}





export const userData:UserTypes = {
    _id: "12345678765432333",
    name: "gourav",
    email: "gouravkotnala777@gmail.com",
    password: "gg",
    address: {
        street:"2",
        city:"faridabad",
        state:"haryana",
        zip:"121002"
    },
    mobile: "8882732859",
    role: "user",
    orderHistory: ["ssdsdsdsdsdsdsdsdsd"],
    wishlist: ["ssdsdsdsdsdsdsdsdsd"],
    cart: "12345678987654",
    profileImage: "demo img",
    emailVerified: true
}

export const productData:ProductTypes[] = [
    {
        _id:"45678986543456789",
        name:"Product1",
        description:"this is product1",
        price: 1999,
        category: "electronics",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "oppo",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["mobile", "phone"]
    },
    {
        _id:"45678986543456788",
        name:"Product2",
        description:"this is product2",
        price: 199,
        category: "clothes",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "zara",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["clothes", "shirt"]
    },
    {
        _id:"45678986543456787",
        name:"Product3",
        description:"this is product3",
        price: 2999,
        category: "electronics",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "samsung",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["mobile", "phone"]
    },
    {
        _id:"45678986543456786",
        name:"Product4",
        description:"this is product4",
        price: 1990,
        category: "electronics",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "oppo",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["mobile", "phone"]
    },
    {
        _id:"45678986543456785",
        name:"Product5",
        description:"this is product5",
        price: 70,
        category: "electronics",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "lava",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["mobile", "phone"]
    },
    {
        _id:"45678986543456784",
        name:"Product6",
        description:"this is product6",
        price: 5000,
        category: "footwear",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "nike",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["shoe", "sneeker"]
    },
    {
        _id:"45678986543456783",
        name:"Product7",
        description:"this is product7",
        price: 19,
        category: "clothes",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "armani",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["shirt", "tops"]
    },
    {
        _id:"45678986543456782",
        name:"Product8",
        description:"this is product8",
        price: 5800,
        category: "electronics",
        stock: 10,
        images: ["demo img"],
        rating: 9,
        reviews:["jhkjfalasfjlkdsf"],
        sku:"string",
        discount: 0,
        brand: "nokia",
        dimensions: {
            height: 0,
            width: 0,
            depth: 0,
        },
        weight: 0,
        tags: ["mobile", "phone"]
    },
];

export const cartData:CartTypes = {
    _id: "12345678908765",
    userID:"12345678765432333",
    products: [{
        productID:"45678986543456789",
        quantity:3,
    }],
    totalPrice: 696969,
}