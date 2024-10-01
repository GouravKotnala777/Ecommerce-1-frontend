import "../../styles/admin/coupon.scss";
import { ChangeEvent, useState } from "react";
import Form from "../../components/Form";
import { CreateCouponBodyType, useCreateCouponsMutation, useGetAllCouponsQuery } from "../../redux/api/api";
import { MutationResTypes } from "../../assets/demoData";
import HandleMutationRes from "../../components/HandleMutationRes";
import { UserLocationTypes } from "../Login.Page";
//import Table from "../../components/Table";
//import { CouponTypes } from "../../assets/demoData";


interface CouponFormFielsTypes{
    discountType?:string;
    amount?:number;
    minPerchaseAmount?:number;
    startedDate?:string;
    endDate?:string;
    usageLimit?:number;
    usedCount?:number;
}

const formFields = [
    {type:"select", name:"discountType", placeHolder:"Discount Type", options:["percentage", "fixed"]},
    {type:"text", name:"amount", placeHolder:"Amount"},
    {type:"text", name:"minPerchaseAmount", placeHolder:"Min Perchase Amount"},
    {type:"date", name:"startedDate", placeHolder:"Started Date"},
    {type:"date", name:"endDate", placeHolder:"End Date"},
    {type:"text", name:"usageLimit", placeHolder:"Usage Limit"},
    {type:"text", name:"usedCount", placeHolder:"Used Count"}
];

const Coupons = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const couponData:{data?:{message:[{_id:string; code:string; amount:number; discountType:string; minPerchaseAmount:number; usedCount:number; usageLimit:number; endDate:Date;}]}} = useGetAllCouponsQuery("");
    const [createCoupon] = useCreateCouponsMutation();
    const [formFieldsData, setFormFieldsData] = useState<CouponFormFielsTypes>();
    const [createCouponRes, setCreateCouponRes] = useState<MutationResTypes>();
    const parent = "admin";

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormFieldsData({...formFieldsData, [e.target.name]:e.target.value});
    };

    const onClickHandler = async() => {
        console.log(formFieldsData);
        
        try {
            const res = await createCoupon({...formFieldsData, action:"create_coupon", userLocation} as CreateCouponBodyType);

            console.log("------ Coupon.tsx  onCLickHandler");
            console.log(res);
            setCreateCouponRes(res);
            console.log("------ Coupon.tsx  onCLickHandler");
            
        } catch (error) {
            console.log("------ Coupon.tsx  onCLickHandler");
            console.log(error);
            console.log("------ Coupon.tsx  onCLickHandler");
        }
    };
    

    return(
        <div className="coupon_bg">
            <HandleMutationRes res={createCouponRes} />
            {/*<pre>{JSON.stringify(data, null, `\t`)}</pre>*/}
            <div className="left_part">
                <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>All Coupons ({couponData.data?.message?.length})</p>
                <div className="coupon_table_scroller">
                    {
                        couponData.data?.message.map((coupon) => (
                            <div className="coupon" key={coupon._id}>
                                <div className="left_part">
                                    <div className="used_coun">{coupon.usedCount}/{coupon.usageLimit}</div>
                                    {
                                        parent !== "admin" &&
                                            <div className="t_and_c">Terms & Conditions</div>
                                    }
                                </div>
                                <div className="right_part">
                                    {
                                        parent === "admin" ?
                                            <div className="id">{coupon._id.split("").splice(12, 22).join("")}</div>
                                            :
                                            <div className="id">{coupon.code}</div>
                                    }
                                    <div className="amount">{coupon.amount}{coupon.discountType==="percentage" ? "%":"₹"}</div>
                                    {
                                        parent !== "admin" &&
                                            <div className="description">Use code {coupon.code} % get {coupon.amount} off on orders above ₹{coupon.minPerchaseAmount}</div>
                                    }
                                    <div className="end_date">valid untill {coupon.endDate.toString().split("T")[0].split("-").reverse().join("-")}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className="right_part">
                <Form heading="Create Coupon" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e as ChangeEvent<HTMLInputElement>)} onClickHandler={onClickHandler} />
            </div>
        </div>
    )
};

export default Coupons;