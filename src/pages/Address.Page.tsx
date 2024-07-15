import "../styles/pages/address.scss";
import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useCreatePaymentMutation, useRemoveAddressMutation, useUpdateMeMutation } from "../redux/api/api";
import { loggedInUserInitialState } from "../redux/reducers/loggedInUserReducer";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

export interface AddressBodyTypes {
    house?:string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}

const formFields = [
    {type:"text", name:"house", placeHolder:"House No."},
    {type:"text", name:"street", placeHolder:"Street"},
    {type:"text", name:"city", placeHolder:"City"},
    {type:"text", name:"state", placeHolder:"State"},
    {type:"text", name:"zip", placeHolder:"Zip Code"},
];

const Address = () => {
    const [address, setAddress] = useState<AddressBodyTypes>();
    const [updateMe] = useUpdateMeMutation();
    const [removeAddress] = useRemoveAddressMutation();
    const [createPayment] = useCreatePaymentMutation();
    const {user} = useSelector((state:{loggedInUserReducer:loggedInUserInitialState}) => state.loggedInUserReducer);
    const location:{amount:number; quantity:number; orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; shippingType:string;} = useLocation().state;
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setAddress({...address, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        try {
            const res = await updateMe({...address});
            const paymentIntendRes = await createPayment({amount:location.amount, quantity:location.quantity});


            
            console.log("----- Address.Page.tsx onClickHandler");
            console.log(address);
            console.log({orderItems:location.orderItems});
            console.log(res);
            console.log("----- Address.Page.tsx onClickHandler");

            if (paymentIntendRes.data.message) {
                navigate("/product/pay", {state:{
                    clientSecret:paymentIntendRes.data.message,
                    userDetailes:{name:user?.name, email:user?.email, phone:user?.mobile},
                    address:address,
                    amount:location.amount,
                    quantity:location.quantity,
                    orderItems:location.orderItems,
                    totalPrice:location.totalPrice,
                    coupon:location.coupon,
                    shippingType:location.shippingType
                }});
            }
            if (paymentIntendRes.error) {
                console.log("error aa gaya");
            }
            
        } catch (error) {
            console.log("----- Address.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Address.Page.tsx onClickHandler");
        }
    };
    
    const setAddressFromTemplate = async(templateData:AddressBodyTypes) => {
        const paymentIntendRes = await createPayment({amount:location.amount, quantity:location.quantity});


        console.log({paymentIntendRes});
        console.log({amount:location.amount, quantity:location.quantity});
        

        if (paymentIntendRes.data.message) {
            navigate("/product/pay", {state:{
                clientSecret:paymentIntendRes.data.message,
                userDetailes:{name:user?.name, email:user?.email, phone:user?.mobile},
                address:templateData,
                amount:location.amount,
                quantity:location.quantity,
                orderItems:location.orderItems,
                totalPrice:location.totalPrice,
                coupon:location.coupon,
                shippingType:location.shippingType
            }});
        }
        if (paymentIntendRes.error) {
            console.log("error aa gaya");
        }
    };

    const removeAddressTemplate = async({house, street, city, state, zip}:{house:string; street:string; city:string; state:string; zip:string;}) => {
        try {
            const res = await removeAddress({house, street, city, state, zip});

            console.log("----- Addesss.Page.tsx  removeAddressTemplate");
            console.log(res);
            console.log("----- Addesss.Page.tsx  removeAddressTemplate");
            
        } catch (error) {
            console.log("----- Addesss.Page.tsx  removeAddressTemplate");
            console.log(error);
            console.log("----- Addesss.Page.tsx  removeAddressTemplate");
        }
    };
    
    return(
        <div className="address_bg">
            {/*{JSON.stringify(address)}*/}
            <pre>{JSON.stringify({
                amount:location.amount,
                quantity:location.quantity,
                totalPrice:location.totalPrice,
                coupon:location.coupon,
                shippingType:location.shippingType
            }, null, `\t`)}</pre>
            <Form heading="Address" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e as ChangeEvent<HTMLInputElement>)} onClickHandler={onClickHandler} />
            <h4>Select from previous address</h4>
            <div className="addresses_cont">
                {
                    user?.address.map((address, index) => (
                        <div className="address_cont" key={index} onClick={() => setAddressFromTemplate(address)}>
                            <div className="remove_btn_cont">
                                <CgClose className="CgClose" onClick={() => removeAddressTemplate(address)} />
                            </div>
                            <div className="detaile_cont">
                                <div className="heading">House No.</div><div className="value">{address.house}</div>
                                <div className="heading">Street</div><div className="value">{address.street}</div>
                                <div className="heading">City</div><div className="value">{address.city}</div>
                                <div className="heading">State</div><div className="value">{address.state}</div>
                                <div className="heading">Zip</div><div className="value">{address.zip}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Address;