import "../styles/pages/my_coupon.scss";
import logo from "../../public/logo1.jpg";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CouponTypes } from "../assets/demoData";
import { SerializedError } from "@reduxjs/toolkit";


const MyCoupons = ({myCoupons}:{myCoupons:{
    isLoading:boolean;
    data?:{success:boolean; message:CouponTypes[];};
    error?:FetchBaseQueryError|SerializedError;
}}) => {

    return(
        <div className="my_coupons_bg">
            {/*<pre>{JSON.stringify(myCoupons.data?.message, null, `\t`)}</pre>*/}
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Coupons</div>
            {
                myCoupons.data?.message.map((coupon, index) => (
                    <div className="coupon_cont" key={index}>
                        <div className="upper_part">
                            <div className="image_cont">
                                <img src={logo} alt={logo} />
                            </div>
                            <div className="heading_cont">
                                Gift Card valued at {coupon.discountType === "fixed" ? `${coupon.amount} ₹` : `${coupon.amount}% off`}
                            </div>
                        </div>
                        <div className="lower_part">
                            <div className="left_part">
                                <div className="expires">expires</div>
                                <div className="date">{coupon.endDate.toString().split("T")[0].split("-").reverse().join("-")}</div>
                                <div className="t_and_c"><a href="/policy">terms & conditions</a></div>
                            </div>
                            <div className="right_part">
                                <div className="your_coupon_code">
                                    Your coupon code
                                </div>
                                {/*<button onClick={() => navigate(`/user/cart?couponID=${coupon._id}`)}>{coupon.amount}</button>*/}
                                <div className="coupon_code">{coupon.code}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default MyCoupons;