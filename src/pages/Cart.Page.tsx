import "../styles/pages/cart.scss";
import { CouponTypes, ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { useFetchMyCartQuery, useGetSingleCouponMutation } from "../redux/api/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Spinner from "../components/Spinner";
import ItemNotFound from "../components/ItemNotFound";
import DialogWrapper from "../components/DialogWrapper";


const Cart = () => {
    //let totalAmount:number = 0;
    const cartData:{
        isLoading:boolean;
        data?:{success:boolean; message:{products:{productID:ProductTypes; quantity:number;}[], totalPrice:number;}};
        error?:FetchBaseQueryError|SerializedError;
    } = useFetchMyCartQuery("");
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
                orderItems:cartData.data?.message.products.map((item) => ({
                        productID:item.productID._id,
                        quantity:item.quantity
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
        console.log("isse useEffect ke ander likhna hai......1");
        cartData.data?.message.products.forEach((item) => {
            setTotalAmount((prev) => prev + (item.productID.price * item.quantity));
        });
        console.log("isse useEffect ke ander likhna hai......2");
    }, [cartData.data, cartData.isLoading, cartData.error]);
    
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
            <DialogWrapper Element={<SummeryComponent data={summeryData} totalAmount={totalAmount} />} toggler={summeryDialogToggle} setToggler={setSummeryDialogToggle} />



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
                        cartData.data?.message.products.length === 0 ?
                            <ItemNotFound heading={"Cart is empty"} statusCode={204} />
                            :
                            cartData.data?.message?.products.map((product) => (
                                <SingleProductTemplate key={product.productID._id} productID={product.productID._id} category={product.productID.category} name={product.productID.name} price={product.productID.price} quantity={product.quantity} rating={product.productID.rating} description={product.productID.description} photo={product.productID.images[0]} parent="cart" />
                            ))

            }
        </div>
    )
};

const SummeryComponent = ({data, totalAmount}:{data:{name:string; quantity:number; price:number;}[]|undefined; totalAmount:number;}) => (
        <div className="summery_cont">
            <div className="heading">Summery</div>
            <div className="summery_table">
                <div className="scrollable_part">
                    {
                        data &&
                            data.map((item) => (
                                <div className="row">
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
                            ))
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