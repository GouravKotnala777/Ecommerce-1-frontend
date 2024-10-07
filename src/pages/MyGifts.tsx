import "../styles/pages/my_coupon.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CouponTypes } from "../assets/demoData";
import { SerializedError } from "@reduxjs/toolkit";
import { FaGift } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SelectedGiftReducerInitialState, setGiftReducer } from "../redux/reducers/selectedGiftReducer";



const MyGifts = ({myReferralGifts}:{myReferralGifts:{
    isLoading:boolean;
    data?:{success:boolean; message:{userID:{name:string; email:string;}; coupon:CouponTypes; status:"pending"|"completed"}[];};
    error?:FetchBaseQueryError|SerializedError;
}}) => {
    const {gift} = useSelector((state:{selectedGiftReducer:SelectedGiftReducerInitialState}) => state.selectedGiftReducer);
    const dispatch = useDispatch();

    return(
        <div className="my_coupons_bg">
            {/*<pre>{JSON.stringify(myReferralGifts.data?.message, null, `\t`)}</pre>*/}
            <pre>{JSON.stringify(gift, null, `\t`)}</pre>
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Gifts</div>
            {
                myReferralGifts.data?.message.map((gift, index) => (
                    <div className="gift_cont" key={index}>
                        <div className="upper_part">
                            <div className="image_cont">
                                <FaGift className="FaGift" />
                            </div>
                            <div className="heading_cont">
                                <div className="gift_for_you">Surprise Gift for you</div>
                                <div className="referee_name">for refering {gift.userID.name}</div>
                                <div className="amount">{gift.coupon.amount}₹ OFF</div>
                            </div>
                        </div>
                        <div className="lower_part">
                            <div className="left_part">
                                <div className="expires">expires</div>
                                <div className="date">{gift.coupon.endDate.toString().split("T")[0].split("-").reverse().join("-")}</div>
                                <div className="t_and_c"><a href="/policy">terms & conditions</a></div>
                            </div>
                            <div className="right_part">
                                {/*<button onClick={() => navigate(`/?couponID=${gift.coupon._id}`)}>Use Now</button>*/}
                                <button onClick={() => dispatch(setGiftReducer({isLoading:false, gift, isError:false}))}>Use Now</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default MyGifts;