import "../styles/components/payment.scss";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressBodyTypes } from "./Address.Page";
import { useCreatePaymentMutation, useNewOrderMutation, useProductRecommendationMutation } from "../redux/api/api";
import Spinner from "../components/Spinner";
import { ProductTypes } from "../assets/demoData";
import ProductsRecommendation from "../components/ProductsRecommendation";
import { UserLocationTypes } from "./Login.Page";
import Tab from "../components/Tab";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);



const CheckoutForm = ({clientSecret, userDetailes, address, orderItems, totalPrice, coupon, shippingType, parent, userLocation, newOrder}:{clientSecret:string; userDetailes:{name:string; email:string; phone:string;}; address:AddressBodyTypes; orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; shippingType:string; parent?:string; userLocation:UserLocationTypes; newOrder:ReturnType<typeof useNewOrderMutation>[0]}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //const [newOrder] = useNew     OrderMutation();
    const navigate = useNavigate();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        

        try {
            if (!stripe || !elements) {
                return null;
            }
    
            const cardElement = elements.getElement(CardElement);
    
            const {paymentIntent, error} = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method:{
                        card:cardElement as StripeCardElement,
                        billing_details:{
                            name:userDetailes.name,
                            email:userDetailes.email,
                            phone:userDetailes.phone,
                            address:{
                                line1:address.house,
                                line2:address.street,
                                city:address.city,
                                state:address.state,
                                country:address.state,
                                postal_code:address.zip
                            }
                        }
                    }
                }
            );
    
            if (error) {
                setError(error.message);

                console.log({paymentIntent});
                
                const newOrderRes = await newOrder({
                    orderItems,
                    totalPrice,
                    coupon,
                    transactionId:"no transactionID",
                    shippingType, paymentStatus:"cancelled", orderStatus:"failed",
                    message:error.message?error.message:"no message",
                    parent:parent as string,
                    action:"new_order_fail",
                    userLocation
                });

                console.log("---- Payment.tsx");
                console.log(newOrderRes);
                console.log("---- Payment.tsx");
            }
            else if(paymentIntent.status === "succeeded"){
                setPaymentSuccess(true);

                console.log({paymentIntent});
                
                const newOrderRes = await newOrder({
                    orderItems,
                    totalPrice,
                    coupon,
                    transactionId:paymentIntent.id,
                    shippingType, paymentStatus:paymentIntent.status, orderStatus:"confirmed",
                    message:"demo message",
                    parent:parent as string,
                    action:"new_order",
                    userLocation
                });

                console.log("---- Payment.tsx");
                console.log(newOrderRes);
                console.log("---- Payment.tsx");
                
            }
            setIsLoading(false);
        } catch (error) {
            console.log("---- error from Payment.tsx");
            console.log(error);
            console.log("---- error from Payment.tsx");
            setIsLoading(false);
        }

    };

    return(
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/*<pre>{JSON.stringify({
                    orderItems,
                    totalPrice,
                    coupon,
                    shippingType
                }, null, `\t`)}</pre>*/}
                <CardElement className="card_element" />
                <button type="submit" disabled={!stripe}>{isLoading ? <Spinner type={2} color="white" width={16} /> : `${totalPrice}₹ Pay`}</button>
            </form>
            
                {
                    error && 
                        <div className="flash_message">
                            <div>{error}</div>
                            <button className="navigate_btn" onClick={() => navigate("/payment_failure", {state:"Payment Fail"})}>Go Home</button>
                        </div>
                }
                {
                    paymentSuccess && 
                        <div className="flash_message">
                            <div>Payment Successfull</div>
                            <button className="navigate_btn" onClick={() => navigate("/")}>Go Home</button>
                        </div>
                }
        </>
    )
};

const CashOnDelivery = ({orderItems, totalPrice, coupon, shippingType, parent, userLocation, newOrder}:{orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; shippingType:string; parent?:string; userLocation:UserLocationTypes; newOrder:ReturnType<typeof useNewOrderMutation>[0];}) => {
    const [error, setError] = useState<string|null>(null);
    const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const orderOnCashHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        
        try {
            //const [newOrder] = useNewOrderMutation();
            console.log("------- CashOnDelivery Payment");
            const newOrderRes = await newOrder({
                orderItems,
                totalPrice,
                coupon,
                transactionId:"cash",
                shippingType, paymentStatus:"cash_on_delivery", orderStatus:"pending",
                message:"demo message",
                parent:parent as string,
                action:"new_order",
                userLocation
            });
            console.log(newOrderRes);
            
            console.log("cash on delivery");
            console.log("------- CashOnDelivery Payment");
            setIsLoading(false);
            setOrderPlaced(true);
            setError(null);
        } catch (error) {
            console.log("------- CashOnDelivery Payment error");
            console.log(error);
            console.log("------- CashOnDelivery Payment error");
            setIsLoading(false);
            setError("Error aa gaya!");
        }
    };


    return(
        <>
            <form className="cash_on_delivery" onSubmit={(e) => orderOnCashHandler(e)}>



                <button type="submit" disabled={isLoading}>{isLoading ? <Spinner type={2} color="white" width={16} /> : `${totalPrice}₹ cash on delivery`}</button>
            </form>
            
                {
                    error && 
                        <div className="flash_message">
                            <div>{error}</div>
                            <button className="navigate_btn" onClick={() => navigate("/payment_failure", {state:"Payment Fail"})}>Go Home</button>
                        </div>
                }
                {
                    orderPlaced && 
                        <div className="flash_message">
                            <div>Order Placed Successfully</div>
                            <button className="navigate_btn" onClick={() => navigate("/")}>Go Home</button>
                        </div>
                }
            
        </>
    )
};


const StripePayment = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const location:{
        clientSecret:string;
        userDetailes:{name:string; email:string; phone:string;};
        address:AddressBodyTypes;
        orderItems:{productID:string; quantity:number; category:string; brand:string;}[];
        totalPrice:number;
        shippingType:string;
        coupon:string;
        parent?:string;
    }|undefined = useLocation().state;
    const [productRecommendation] = useProductRecommendationMutation();
    const [createPayment] = useCreatePaymentMutation();
    const [sameCategoryProduct, setSameCategoryProduct] = useState<Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]>([]);
    const [sameBrandProduct, setSameBrandProduct] = useState<Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]>([]);
    const [recommendationProducts, setRecommendationProducts] = useState<{productID:string; name:string; price:number; quantity:number;}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hideGetClientSecretAgain, setHideGetClientSecretAgain] = useState<boolean>(false);
    const [newOrder] = useNewOrderMutation();
    const [clientSecret, setClientSecret] = useState<string>("");

    
    const getProductRecommendation = async() => {
        try {
            const sameCategoryProductRes:{data?:{message:Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[];}} = await productRecommendation({category:location?.orderItems.map((iter) => (iter.category)), brand:location?.orderItems.map((iter) => (iter.brand))});
            const sameBrandProductRes:{data?:{message:Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[];}} = await productRecommendation({category:[], brand:location?.orderItems.map((iter) => iter.brand)});

            if (sameCategoryProductRes.data?.message) {
                setSameCategoryProduct(sameCategoryProductRes.data.message);
            }
            if (sameBrandProductRes.data?.message) {
                setSameBrandProduct(sameBrandProductRes.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const requestForClientSecretAgain = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const paymentIntendRes = await createPayment({
                amount:location?.totalPrice as number,
                quantity:1,
                amountFormRecomm:recommendationProducts.reduce((acc, iter) => acc+iter.price, 0),
                action:"create_payment_intend_again",
                userLocation
            });



            
            console.log("----- Payment.tsx requestForClientSecretAgain");
            console.log({amount:location?.totalPrice as number});
            console.log({quantity:1});
            console.log({amountFormRecomm:recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)});
            console.log("----- Payment.tsx requestForClientSecretAgain");

            if (paymentIntendRes.data.message) {
                setClientSecret(paymentIntendRes.data.message);
            }
            if (paymentIntendRes.error) {
                console.log("error aa gaya");
                setClientSecret("");
            }
            setIsLoading(false);
            setHideGetClientSecretAgain(true);
            
        } catch (error) {
            console.log("----- Payment.tsx requestForClientSecretAgain");
            console.log(error);
            setClientSecret("");
            setIsLoading(false);
            console.log("----- Payment.tsx requestForClientSecretAgain");
        }
    };


    useEffect(() => {
        getProductRecommendation();
    }, []);
    useEffect(() => {
        setHideGetClientSecretAgain(false);
    }, [recommendationProducts]);
    

    return(
        <Elements stripe={stripePromise}>
            {/*<pre>{JSON.stringify(recommendationProducts, null, `\t`)}</pre>
            <pre>{JSON.stringify(clientSecret, null, `\t`)}</pre>*/}
            {
                sameCategoryProduct.length >= 4 &&
                    <ProductsRecommendation
                        heading="Products you may like"
                        arrayOfSameProducts={
                            sameCategoryProduct.filter((product) => {
                                return location?.orderItems.filter((iter) => {
                                    if (iter.brand !== product.brand) {
                                        return {category:product.category, brand:product.brand, name:product.name, price:product.price, images:product.images}
                                    }
                                })
                            }).splice(3,3)
                        }
                        recommendationProducts={recommendationProducts}
                        setRecommendationProducts={setRecommendationProducts}
                    />
            }
            {
                sameBrandProduct.length >= 4 &&
                    <ProductsRecommendation
                        heading="Products of same brand you may like"
                        arrayOfSameProducts={
                            sameBrandProduct.filter((product) => {
                                return location?.orderItems.filter((iter) => {
                                    if (iter.brand !== product.brand) {
                                        return {category:product.category, brand:product.brand, name:product.name, price:product.price, images:product.images}
                                    }
                                })
                            }).splice(3,3)
                        }
                        recommendationProducts={recommendationProducts}
                        setRecommendationProducts={setRecommendationProducts}
                    />
            }

            {
                recommendationProducts.length !== 0 && !hideGetClientSecretAgain &&
                    <form className="getClientSecretAgain" onSubmit={requestForClientSecretAgain}>
                        {
                            recommendationProducts.map((product, index) => (
                                <div className="row" key={index}>
                                    <div className="col">{index+1}.</div>
                                    <div className="col">{product.name}</div>
                                    <div className="col">{product.price}/- ₹</div>
                                </div>
                            ))
                        }
                        <button  type="submit" disabled={isLoading} >{isLoading ? <Spinner type={2} color="white" width={16} /> : "Add these products also"}</button>
                    </form>
            }


            <Tab panelsArray={[
                {
                    name:"CreditCard", children:<CheckoutForm 
                    clientSecret={clientSecret ? clientSecret : location?.clientSecret as string}
                    userDetailes={location?.userDetailes as {name:string; email:string; phone:string;}}
                    address={location?.address as AddressBodyTypes}
                    orderItems={[
                        ...location?.orderItems as {productID:string; quantity:number;}[],
                        ...recommendationProducts
                    ]}
                    totalPrice=
                        {
                            location?.shippingType === "express"?
                                location.totalPrice + 500 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
                                :
                                location?.shippingType === "standared"?
                                    location.totalPrice + 300 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
                                    :
                                    (location?.totalPrice as number) + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
    
                        }
                    coupon={location?.coupon as string}
                    shippingType={location?.shippingType as string}
                    parent={location?.parent as string}
                    userLocation={userLocation}
                    newOrder={newOrder} />
                },
                {
                    name:"CashOnDelivery", children:<CashOnDelivery
                    orderItems={[
                        ...location?.orderItems as {productID:string; quantity:number;}[],
                        ...recommendationProducts
                    ]}
                    totalPrice=
                        {
                            location?.shippingType === "express"?
                                location.totalPrice + 500 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
                                :
                                location?.shippingType === "standared"?
                                    location.totalPrice + 300 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
                                    :
                                    (location?.totalPrice as number) + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
    
                        }
                    coupon={location?.coupon as string}
                    shippingType={location?.shippingType as string}
                    parent={location?.parent as string}
                    userLocation={userLocation}
                    newOrder={newOrder} />

                }
            ]} />
            

            
        </Elements>
    )
};

export default StripePayment;
