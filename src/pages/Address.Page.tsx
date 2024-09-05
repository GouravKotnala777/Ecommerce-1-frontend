import "../styles/pages/address.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Form from "../components/Form";
import { useCreatePaymentMutation, useProductRecommendationMutation, useRemoveAddressMutation, useUpdateMeMutation } from "../redux/api/api";
import { loggedInUserInitialState } from "../redux/reducers/loggedInUserReducer";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { ProductTypes } from "../assets/demoData";
import ProductsRecommendation from "../components/ProductsRecommendation";

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
    //const [searchedProducts] = useSearchProductsMutation();
    const [productRecommendation] = useProductRecommendationMutation();
    const {user} = useSelector((state:{loggedInUserReducer:loggedInUserInitialState}) => state.loggedInUserReducer);
    const location:{amount:number; quantity:number; orderItems:{productID:string; quantity:number; category:string; brand:string;}[]; totalPrice:number; coupon:string; shippingType:string; parent:string;} = useLocation().state;
    const navigate = useNavigate();
    const [sameCategoryProduct, setSameCategoryProduct] = useState<Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]>([]);
    const [sameBrandProduct, setSameBrandProduct] = useState<Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]>([]);
    const [recommendationProducts, setRecommendationProducts] = useState<{productID:string; name:string; price:number; quantity:number;}[]>([]);

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setAddress({...address, [e.target.name]:e.target.value});
    };

    const buyHandler = async() => {
        try {
            const res = await updateMe({...address});
            const paymentIntendRes = await createPayment({
                amount:shippingType === "express"?
                            location.amount+500
                            :
                            shippingType === "standared"?
                                location.amount + 300
                                :
                                location.amount as number,
                quantity:location.quantity,
                amountFormRecomm:recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
            });


            
            console.log("----- Address.Page.tsx buyHandler");
            console.log(address);
            console.log({orderItems:location.orderItems});
            console.log(res);
            console.log("----- Address.Page.tsx buyHandler");

            if (paymentIntendRes.data.message) {
                navigate("/product/pay", {state:{
                    clientSecret:paymentIntendRes.data.message,
                    userDetailes:{name:user?.name, email:user?.email, phone:user?.mobile},
                    address:address,
                    amount:location.amount,
                    quantity:location.quantity,
                    orderItems:[...location.orderItems, ...recommendationProducts],
                    totalPrice:location.totalPrice+recommendationProducts.reduce((acc, iter) => acc+iter.price, 0),
                    coupon:location.coupon,
                    shippingType:shippingType,
                    parent:location.parent
                }});
            }
            if (paymentIntendRes.error) {
                console.log("error aa gaya");
            }
            
        } catch (error) {
            console.log("----- Address.Page.tsx buyHandler");
            console.log(error);
            console.log("----- Address.Page.tsx buyHandler");
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
            quantity:location.quantity,
            amountFormRecomm:recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)
        });

        if (paymentIntendRes.data.message) {
            navigate("/product/pay", {state:{
                clientSecret:paymentIntendRes.data.message,
                userDetailes:{name:user?.name, email:user?.email, phone:user?.mobile},
                address:templateData,
                amount:location.amount+recommendationProducts.reduce((acc, iter) => acc+iter.price, 0),
                quantity:location.quantity,
                orderItems:[...location.orderItems, ...recommendationProducts],
                totalPrice:location.totalPrice+recommendationProducts.reduce((acc, iter) => acc+iter.price, 0),
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

    const getProductRecommendation = async() => {
        try {
            const sameCategoryProductRes:{data?:{message:Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[];}} = await productRecommendation({category:location.orderItems.map((iter) => (iter.category)), brand:location.orderItems.map((iter) => (iter.brand))});
            const sameBrandProductRes:{data?:{message:Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[];}} = await productRecommendation({category:[], brand:location.orderItems.map((iter) => iter.brand)});

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
    
    useEffect(() => {
        getProductRecommendation();
    }, []);
    
    return(
        <div className="address_bg">
            {/*<pre>{JSON.stringify(recommendationProducts, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify({
                amount:location.amount,
                quantity:location.quantity,
                orderItems:location.orderItems,
                totalPrice:location.totalPrice,
                coupon:location.coupon,
                shippingType:location.shippingType,
                parent:location.parent
            }, null, `\t`)}</pre>*/}
            <div className="shipping_type_cont">
                <div className="upper_cont">
                    <div className="heading">subtotal:</div>
                    <div className="value">₹{location.totalPrice + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)}/-</div>
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
                    <div className="value">₹{location.totalPrice + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)} + {shippingType.toUpperCase()}({
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
                                ` ₹${location.totalPrice + 500 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)}/-`
                                :
                                shippingType === "standared"?
                                    ` ₹${location.totalPrice + 300 + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)}/-`
                                    :
                                    ` ₹${location.totalPrice + recommendationProducts.reduce((acc, iter) => acc+iter.price, 0)}/-`

                        }
                    </div>
                </div>
            </div>

            {
                sameCategoryProduct.length !== 0 &&
                    <ProductsRecommendation heading="Products you may like" arrayOfSameProducts={
                        sameCategoryProduct.filter((product) => {
                            return location.orderItems.filter((iter) => {
                                if (iter.brand !== product.brand) {
                                    return {category:product.category, brand:product.brand, name:product.name, price:product.price, images:product.images}
                                }
                            })
                        }).splice(0,3)}
                        recommendationProducts={recommendationProducts}
                        setRecommendationProducts={setRecommendationProducts}
                    />
            }
            {
                sameBrandProduct.length !== 0 &&
                    <ProductsRecommendation heading="Products of same Brand you may like" arrayOfSameProducts={
                        sameBrandProduct.filter((product) => {
                            if (product.category !== location.orderItems[0].category) {
                                return {category:product.category, brand:product.brand, name:product.name, price:product.price, images:product.images}
                            }
                        }).splice(0,2)}
                        recommendationProducts={recommendationProducts}
                        setRecommendationProducts={setRecommendationProducts}
                    />
            }

            {
                user?.address.length !== 0 &&
                    <div className="select_address_heading">Select from previous address</div>
            }
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

            <Form heading="Address" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e as ChangeEvent<HTMLInputElement>)} onClickHandler={buyHandler} />
        </div>
    )
};

export default Address;