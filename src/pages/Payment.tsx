import "../styles/components/payment.scss";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddressBodyTypes } from "./Address.Page";
import { useNewOrderMutation } from "../redux/api/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);



const CheckoutForm = ({clientSecret, userDetailes, address, orderItems, totalPrice, coupon, shippingType, parent}:{clientSecret:string; userDetailes:{name:string; email:string; phone:string;}; address:AddressBodyTypes; orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; shippingType:string; parent?:string;}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [newOrder] = useNewOrderMutation();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            }
            else if(paymentIntent.status === "succeeded"){
                setPaymentSuccess(true);

                console.log({paymentIntent});
                
                const newOrderRes = await newOrder({
                    orderItems,
                    totalPrice,
                    coupon,
                    transactionId:paymentIntent.id,
                    shippingType, status:paymentIntent.status,
                    message:"demo message",
                    parent:parent as string
                });

                console.log("---- Payment.tsx");
                console.log(newOrderRes);
                console.log("---- Payment.tsx");
                
            }
        } catch (error) {
            console.log("---- error from Payment.tsx");
            console.log(error);
            console.log("---- error from Payment.tsx");
        }

    };

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <pre>{JSON.stringify({
                orderItems,
                totalPrice,
                coupon,
                shippingType
            }, null, `\t`)}</pre>
            <CardElement className="card_element" />
            <button type="submit" disabled={!stripe}>Pay</button>
            {error && <div>{error}</div>}
            {paymentSuccess && <div>Payment Successfull</div>}
        </form>
    )
};


const StripePayment = () => {
    const location:{
        clientSecret:string;
        userDetailes:{name:string; email:string; phone:string;};
        address:AddressBodyTypes;
        orderItems:{productID:string; quantity:number;}[];
        totalPrice:number;
        shippingType:string;
        coupon:string;
        parent?:string;
    }|undefined = useLocation().state;

    console.log({clientSecret:location?.clientSecret});
    console.log({orderItems1:location?.orderItems});
    
    

    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm 
                clientSecret={location?.clientSecret as string}
                userDetailes={location?.userDetailes as {name:string; email:string; phone:string;}}
                address={location?.address as AddressBodyTypes}
                orderItems={location?.orderItems as {productID:string; quantity:number;}[]}
                totalPrice=
                    {
                        location?.shippingType === "express"?
                            location.totalPrice + 500
                            :
                            location?.shippingType === "standared"?
                                location.totalPrice + 300
                                :
                                location?.totalPrice as number

                    }
                coupon={location?.coupon as string}
                shippingType={location?.shippingType as string}
                parent={location?.parent as string} />
        </Elements>
    )
};

export default StripePayment;
