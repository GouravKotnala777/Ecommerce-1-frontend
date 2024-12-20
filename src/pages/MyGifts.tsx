import "../styles/pages/my_coupon.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CouponTypes } from "../assets/demoData";
import { SerializedError } from "@reduxjs/toolkit";
import { FaGift } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setGiftReducer } from "../redux/reducers/selectedGiftReducer";
import toast, {Toaster} from "react-hot-toast";
import ItemNotFound from "../components/ItemNotFound";


const MyGifts = ({myReferralGifts}:{myReferralGifts:{
    isLoading:boolean;
    data?:{success:boolean; message:{userID:{name:string; email:string;}; coupon:CouponTypes; status:"pending"|"completed"}[];};
    error?:FetchBaseQueryError|SerializedError;
}}) => {
    //const {gift} = useSelector((state:{selectedGiftReducer:SelectedGiftReducerInitialState}) => state.selectedGiftReducer);
    const dispatch = useDispatch();

    const giftCardHandler = (gift:{
        userID: {
            name: string;
            email: string;
        };
        coupon: CouponTypes;
        status: "pending" | "completed";
    } | null) => {
        console.log(gift);
        
        dispatch(setGiftReducer({isLoading:false, gift, isError:false}));
        toast.success(`Gift card has been selected, Now your order will have ${gift?.coupon.amount}₹ off`, {
            position:"bottom-center",
            duration:5000
        });
    };


    return(
        <div className="my_coupons_bg">
            {/*<pre>{JSON.stringify(myReferralGifts, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(gift, null, `\t`)}</pre>*/}
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Gifts</div>
            <Toaster />
            {
                myReferralGifts.data?.message.length !== 0 ?
                    myReferralGifts.data?.message.map((gift, index) => gift.status === "pending" && (
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
                                    <div className="t_and_c"><a href="/policy/terms-and-conditions">terms & conditions</a></div>
                                </div>
                                <div className="right_part">
                                    {/*<button onClick={() => navigate(`/?couponID=${gift.coupon._id}`)}>Use Now</button>*/}
                                    <button onClick={() => giftCardHandler(gift as {userID: {name: string; email: string;}; coupon: CouponTypes; status: "pending" | "completed"; } | null)}>Use Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <ItemNotFound heading="You don't have any gift" statusCode={200}  />
            }
        </div>
    )
};

export default MyGifts;