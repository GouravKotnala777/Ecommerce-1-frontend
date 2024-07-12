import "../styles/components/payment.scss";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddressBodyTypes } from "./Address.Page";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);



const CheckoutForm = ({clientSecret, userDetailes, address}:{clientSecret:string; userDetailes:{name:string; email:string; phone:string;}; address:AddressBodyTypes}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
        }
    };

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <CardElement className="card_element" />
            <button type="submit" disabled={!stripe}>Pay</button>
            {error && <div>{error}</div>}
            {paymentSuccess && <div>Payment Successfull</div>}

        </form>
    )
};


const StripePayment = () => {
    const location:{clientSecret:string; userDetailes:{name:string; email:string; phone:string;}; address:AddressBodyTypes}|undefined = useLocation().state;

    console.log({clientSecret:location?.clientSecret});
    

    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={location?.clientSecret as string} userDetailes={location?.userDetailes as {name:string; email:string; phone:string;}} address={location?.address as AddressBodyTypes} />
        </Elements>
    )
};

export default StripePayment;
