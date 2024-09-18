import "../styles/pages/cart.scss";
import { CouponTypes, ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { useGetSingleCouponMutation } from "../redux/api/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Spinner from "../components/Spinner";
import ItemNotFound from "../components/ItemNotFound";
import DialogWrapper from "../components/DialogWrapper";
import { UserLocationTypes } from "./Login.Page";

const Cart = ({cartData, userLocation}:{cartData:{
    isLoading:boolean;
    data?:{success:boolean; message:{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}};
    error?:FetchBaseQueryError|SerializedError;
}, userLocation:UserLocationTypes;}) => {
    //const cartData:{
        //    isLoading:boolean;
        //    data?:{success:boolean; message:{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}};
        //    error?:FetchBaseQueryError|SerializedError;
        //} = useFetchMyCartQuery("");
    const [includedProducts, setIncludedProducts] = useState<{[key:string]:boolean;}>({});
    const [getSingleCoupon] = useGetSingleCouponMutation();
    const [hideHeader, setHideHeader] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [singleCoupon, setSingleCoupon] = useState<CouponTypes>();
    //const [discountedAmount, setDiscountedAmount] = useState<number>(0);
    const previousScrollPos = useRef<number>(0);
    const [summeryDialogToggle, setSummeryDialogToggle] = useState<boolean>(false);
    const navigate = useNavigate();
    const [summeryData, setSummeryData] = useState<{_id:string; name:string; quantity:number; price:number;}[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [oneTimeRefresh, setOneTimeRefresh] = useState<number>(0);
    //const [refresh, setRefresh] = useState<boolean>(false);
    
    let num = 0;

    

    const applyCouponHandler = async() => {
        try {
            const couponRes:{data?:{message:CouponTypes}} = await getSingleCoupon({code, totalAmount});

            console.log("-----  Cart.Page.tsx applyCouponHandler");
            console.log(couponRes);
            setSingleCoupon(couponRes.data?.message);
            console.log("-----  Cart.Page.tsx applyCouponHandler");
        } catch (error) {
            console.log("-----  Cart.Page.tsx applyCouponHandler");
            console.log(error);            
            console.log("-----  Cart.Page.tsx applyCouponHandler");
        }
    };

    const buyAllHandler = async({amount}:{amount:number}) => {
        try {
            navigate("/user/address", {state:{
                amount:amount,
                quantity:1,
                orderItems:cartData.data?.message.products.filter((item) => includedProducts[item.productID._id]).map((item) => ({
                    productID:item.productID._id,
                    quantity:item.quantity,
                    category:item.productID.category,
                    brand:item.productID.brand
                }))
                ,
                totalPrice:amount,
                coupon:singleCoupon?._id,
                parent:"cart"
            }});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (oneTimeRefresh < 3) {
            cartData.data?.message.products.forEach((item) => {
                setIncludedProducts((prev) => ({...prev, [item.productID._id]:true}))
            })
            setOneTimeRefresh((prev) => prev+1);
        }
    }, [totalAmount]);
    useEffect(() => {
        if (num < 1) {
            cartData.data?.message.products.forEach((item) => {
                setTotalAmount((prev) => prev+(item.productID.price * item.quantity));
            });
        }
        num += 1;
    }, [cartData.data]);
        
    useEffect(() => {
        const summeryDataLoc = cartData.data?.message.products.map((item1) => {
                return {_id:item1.productID._id, name:item1.productID.name, quantity:item1.quantity, price:item1.productID.price}
            })
        setSummeryData(summeryDataLoc as {_id:string; name:string; quantity:number; price:number;}[]);
    }, [summeryDialogToggle]);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setHideHeader(currentScrollPos >= previousScrollPos.current);      
            previousScrollPos.current = currentScrollPos
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);    
    
    return(
        <div className="cart_bg">
            {/*<pre>{JSON.stringify(cartData.data?.message.products, null, `\t`)}</pre>*/}
            <DialogWrapper Element={<SummeryComponent data={summeryData} totalAmount={totalAmount} includedProducts={includedProducts} />} toggler={summeryDialogToggle} setToggler={setSummeryDialogToggle} />
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Cart</div>


            <div className="access_bar_bg" style={{bottom:hideHeader?"-12%":"0%"}}>
                <div className="left_part">
                    <div className="feedback">
                        <button>feedback</button>
                    </div>
                </div>
                <nav className="right_part">
                    <div className="input_cont">
                        <input type="text" placeholder="Coupon" onChange={(e) => setCode(e.target.value)} />
                        <button onClick={applyCouponHandler}>add</button>
                    </div>
                    <div className="total_price_cont">
                        <div className="see_list" onClick={() => setSummeryDialogToggle(true)}>see</div>
                        <div className="detailes">
                            <div className="heading">Total Price</div>
                            <div className="value">{singleCoupon?.discountType === "percentage"?
                                                        totalAmount - ((singleCoupon.amount*totalAmount)/100)
                                                        :
                                                        singleCoupon?.discountType === "fixed"?
                                                            totalAmount - singleCoupon?.amount
                                                            :
                                                            totalAmount
                                                    }/- ₹</div>
                        </div>
                    </div>
                    <div className="buy_all">
                        <button onClick={() => buyAllHandler({amount:singleCoupon?.discountType === "percentage"?
                                                        totalAmount - ((singleCoupon.amount*totalAmount)/100)
                                                        :
                                                        singleCoupon?.discountType === "fixed"?
                                                            totalAmount - singleCoupon?.amount
                                                            :
                                                            totalAmount
                                                    })}>Buy All</button>
                    </div>
                </nav>
            </div>














            {
                cartData.isLoading ?
                    <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                    :
                    cartData.error &&
                    "data" in cartData.error &&
                    cartData.error.data &&
                    typeof cartData.error.data === "object" &&
                    "message" in cartData.error.data ?
                        <ItemNotFound heading={cartData.error?.data.message as string} statusCode={cartData.error.status as number} />
                        :
                        cartData.data?.message?.products ?
                            cartData.data?.message.products.length === 0 ?
                                <ItemNotFound heading={"Cart is empty"} statusCode={204} />
                                :
                                cartData.data?.message?.products.map((product) => (
                                    <SingleProductTemplate key={product.productID._id}
                                        userLocation={userLocation}
                                        productID={product.productID._id}
                                        category={product.productID.category}
                                        brand={product.productID.brand}
                                        name={product.productID.name}
                                        price={product.productID.price}
                                        quantity={product.quantity}
                                        rating={product.productID.rating}
                                        description={product.productID.description}
                                        photo={product.productID.images[0]}
                                        parent="cart"
                                        setTotalAmount={setTotalAmount}
                                        includedProducts={includedProducts}
                                        setIncludedProducts={setIncludedProducts}
                                    />
                                ))
                            :
                            <ItemNotFound heading={"No Internet Connection!"} statusCode={523} />

            }
        </div>
    )
};

const SummeryComponent = ({data, totalAmount, includedProducts}:{data:{_id:string; name:string; quantity:number; price:number;}[]|undefined; totalAmount:number; includedProducts:{[key:string]:boolean;}}) => (
        <div className="summery_cont">
            <div className="heading">Summery</div>
            <div className="summery_table">
                <div className="scrollable_part">
                    {
                        data &&
                            data.map((item) =>
                                includedProducts[item._id] ?
                                (
                                    <div className="row" key={item._id}>
                                        <div className="col">
                                            {item.name}
                                        </div>
                                        <div className="col">
                                            {item.price}
                                        </div>
                                        <div className="col">
                                            x {item.quantity}
                                        </div>
                                        <div className="col">
                                            = {item.price * item.quantity}₹
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <s className="row" key={item._id}>
                                        <div className="col">
                                            {item.name}
                                        </div>
                                        <div className="col">
                                            {item.price}
                                        </div>
                                        <div className="col">
                                            x {item.quantity}
                                        </div>
                                        <div className="col">
                                            = {item.price * item.quantity}₹
                                        </div>
                                    </s>
                                )
                            )
                    }
                </div>
            </div>
            <div className="footer total_amount_row">
                <div className="col"></div>
                <div className="col">Total</div>
                <div className="col"></div>
                <div className="col">{totalAmount}₹</div>
            </div>
                        
        </div>
)

export default Cart;