import "../styles/pages/my_coupon.scss";
import logo from "../../public/logo1.jpg";
import { CouponTypes } from "../assets/demoData";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { ResponseType } from "../redux/api/api";


const MyCoupons = ({myCoupons}:{myCoupons:CouponTypes[];}) => {

    const copyToClipboard = (text:string) => {
        try {
            navigator.clipboard.writeText(text);
            //alert("Code copied");
            toast.success("Code copied", {
                position:"bottom-center",
                duration:1800,
            });
            
            
        } catch (error) {
            toast.error("Failed to copy coupon code, try again!", {
                position:"bottom-center",
                duration:1800,
            });
        }
    };

    return(
        <div className="my_coupons_bg">
            {/*<pre>{JSON.stringify(myCoupons.data?.message, null, `\t`)}</pre>*/}
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Coupons</div>
            <Toaster />
            {
                myCoupons.map((coupon, index) => (
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
                                <div className="t_and_c"><a href="/policy/terms-and-conditions">terms & conditions</a></div>
                            </div>
                            <div className="right_part">
                                <div className="your_coupon_code">
                                    Your coupon code
                                </div>
                                {/*<button onClick={() => navigate(`/user/cart?couponID=${coupon._id}`)}>{coupon.amount}</button>*/}
                                <div className="coupon_code" onClick={() => copyToClipboard(coupon.code)}>{coupon.code}<FaRegCopy className="FaRegCopy" /></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default MyCoupons;