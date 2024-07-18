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
    const [shippingType, setShippingType] = useState<string>("regular");
    const [updateMe] = useUpdateMeMutation();
    const [removeAddress] = useRemoveAddressMutation();
    const [createPayment] = useCreatePaymentMutation();
    const {user} = useSelector((state:{loggedInUserReducer:loggedInUserInitialState}) => state.loggedInUserReducer);
    const location:{amount:number; quantity:number; orderItems:{productID:string; quantity:number;}[]; totalPrice:number; coupon:string; shippingType:string; parent:string;} = useLocation().state;
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setAddress({...address, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        try {
            const res = await updateMe({...address});
            const paymentIntendRes = await createPayment({
                amount:shippingType === "express"?
                            location.amount + 500
                            :
                            shippingType === "standared"?
                                location.amount + 300
                                :
                                location.amount as number,
                quantity:location.quantity
            });


            
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
                    shippingType:shippingType,
                    parent:location.parent
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
        const paymentIntendRes = await createPayment({
            amount:shippingType === "express"?
                            location.amount + 500
                            :
                            shippingType === "standared"?
                                location.amount + 300
                                :
                                location.amount as number,
            quantity:location.quantity
        });


        //console.log({paymentIntendRes});
        //console.log({amount:location.amount, quantity:location.quantity});
        

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
                shippingType:shippingType,
                parent:location.parent
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
            <div className="shipping_type_cont">
                <div className="upper_cont">
                    <div className="heading">subtotal:</div>
                    <div className="value">₹{location.totalPrice*location.quantity}/-</div>
                </div>
                <div className="middle_cont">
                    <div className="heading">Shipping Type:</div>
                    <div className="radios_cont">
                        <label>
                            <input type="radio" name="shippingType" value="express" onChange={(e) => setShippingType(e.target.value)} />
                            <p>Express Shipping (1-3 days) : ₹500/-</p>
                        </label>
                        <label>
                            <input type="radio" name="shippingType" value="standared" onChange={(e) => setShippingType(e.target.value)} />
                            <p>Standered Shipping (3-5 days) : ₹300/-</p>
                        </label>
                        <label>
                            <input type="radio" name="shippingType" defaultChecked value="regular" onChange={(e) => setShippingType(e.target.value)} />
                            <p>Regular Shipping (6-7 days) : ₹0/-</p>
                        </label>
                    </div>
                </div>
                <div className="lower_cont">
                    <div className="heading">total:</div>
                    <div className="value">₹{location.totalPrice*location.quantity} - {shippingType.toUpperCase()}({
                            shippingType === "express"?
                                "₹500"
                                :
                                shippingType === "standared"?
                                    "₹300"
                                    :
                                    "₹0"

                        }) =  
                        {
                            shippingType === "express"?
                                ` ₹${location.totalPrice + 500}/-`
                                :
                                shippingType === "standared"?
                                    ` ₹${location.totalPrice + 300}/-`
                                    :
                                    ` ₹${location.totalPrice}/-`

                        }
                    </div>
                </div>
            </div>


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