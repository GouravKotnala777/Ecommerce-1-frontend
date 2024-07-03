import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import unknownUser from "/unknownUser.png"
import { ProductTypesPopulated } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";
import { useCreateReviewMutation, useGetSingleProductQuery } from "../redux/api/api";
import Skeleton from "../components/Skeleton";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { ChangeEvent, MouseEvent, useState } from "react";
import DialogWrapper from "../components/DialogWrapper";
import { useDispatch, useSelector } from "react-redux";
import { MiscReducerTypes, setIsReviewDialogActive } from "../redux/reducers/miscReducers";


const formFields = [
    {type:"text", name:"rating", placeHolder:"Rating"},
    {type:"text", name:"comment", placeHolder:"Comment"},
];


const SingleProduct = () => {
    const {productID} = useParams();
    const [formFieldData,setFormFieldData] = useState<{productID:string; rating:number; comment:string;}>({productID:"", rating:0, comment:""});
    const {data}:{data?:{success:boolean; message:ProductTypesPopulated;}; isLoading?:boolean; isSuccess:boolean;} = useGetSingleProductQuery(productID);
    const dispatch = useDispatch();
    const {isReviewDialogActive} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const [createReview] = useCreateReviewMutation();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setFormFieldData({...formFieldData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        try {
            const res = await createReview({productID:productID as string, rating:Number(formFieldData.rating), comment:formFieldData.comment});

            console.log("------- SingleProduct.tsx onClickHandler");
            console.log({productID:productID as string, rating:Number(formFieldData.rating), comment:formFieldData.comment});
            console.log(res);
            console.log("------- SingleProduct.tsx onClickHandler");
            
        } catch (error) {
            console.log("------- SingleProduct.tsx onClickHandler");
            console.log(error);
            console.log("------- SingleProduct.tsx onClickHandler");
        }
    };
    const reviewToggleHandler = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(setIsReviewDialogActive(false));
    }


    return(
        <div className="single_product_bg" onClick={(e) => reviewToggleHandler(e)}>

            <DialogWrapper toggler={isReviewDialogActive} Element={<Form heading="Give Review" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler} />} />

            <SingleProductTemplate productID={productID} category={data?.message?.category} name={data?.message?.name} price={data?.message?.price} rating={data?.message?.rating} description={data?.message?.description} photo={photo} parent="singleProduct" />

            {/*<pre>{JSON.stringify(data?.message, null, `\t`)}</pre>*/}
            <div className="reviews_cont">
                {
                    data?.message ?
                        data?.message?.reviews.map((review) => (
                            <div className="review_cont" key={review._id}>
                                <div className="left_part">
                                    <img src={photo} alt={photo} />
                                </div>
                                <div className="middle_part">
                                    <div className="email">{review.userID.email}</div>
                                    <div className="rating"><RatingSystem rating={review.rating} /></div>
                                </div>
                                <div className="right_part">
                                    <div className="comment_heading">Comment:</div>
                                    <div className="comment_value">{review.comment}</div>
                                </div>
                            </div>
                        ))
                        :
                        [1,2,3].map((q) => (
                            <div className="review_cont" key={q}>
                                <div className="left_part">
                                    <img src={unknownUser} alt={unknownUser} style={{background:"pink"}} />
                                </div>
                                <div className="middle_part">
                                    <div className="email"><Skeleton height="20px" margin="5px auto" /></div>
                                    <div className="rating"><Skeleton height="20px" margin="5px auto" /></div>
                                </div>
                                <div className="right_part">
                                    <div className="comment_heading">Comment:</div>
                                    <Skeleton width="100%" height="20px" margin="5px auto" />
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
};

export default SingleProduct;