import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import unknownUser from "/unknownUser.png"
import { ProductTypesPopulated, UserTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";
import Skeleton from "../components/Skeleton";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { ChangeEvent, useEffect, useState } from "react";
import DialogWrapper from "../components/DialogWrapper";
import { useDispatch, useSelector } from "react-redux";
import { MiscReducerTypes, setIsReviewDialogActive } from "../redux/reducers/miscReducers";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import ProductSlider from "../components/ProductSlider";
import HandleMutationRes from "../components/HandleMutationRes";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { PRIMARY_LOW } from "../styles/utils";
import { UserLocationTypes } from "./Login.Page";
import { createReview, deleteReview, getSingleProduct, ResponseType, updateVote } from "../redux/api/api";


const formFields = [
    {type:"text", name:"rating", placeHolder:"Rating"},
    {type:"text", name:"comment", placeHolder:"Comment"},
];

const SingleProduct = ({loginedUser, userLocation}:{loginedUser:UserTypes; userLocation:UserLocationTypes;}) => {
    const {productID} = useParams();
    const [formFieldData,setFormFieldData] = useState<{productID:string; rating:number; comment:string;}>({productID:"", rating:0, comment:""});
    const [postReviewRes, setPostReviewRes] = useState<ResponseType<string|Error>>({success:false, message:""});
    const dispatch = useDispatch();
    const {isReviewDialogActive} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [singleProduct, setSingleProduct] = useState<ProductTypesPopulated>();
    

    //const getSameProducts:{data?:{success:boolean; message:ProductTypesPopulated[];}} = useGetProductsOfSameQuery({query:"brand", value:"labrada"});

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormFieldData({...formFieldData, [e.target.name]:e.target.value});
    };
    const postReviewHandler = async() => {
        setIsLoading(true);
        try {
            const res = await createReview({productID:productID as string, rating:Number(formFieldData.rating), comment:formFieldData.comment, action:"create_review", userLocation});

            console.log("------- SingleProduct.tsx onClickHandler");
            console.log({productID:productID as string, rating:Number(formFieldData.rating), comment:formFieldData.comment});
            setPostReviewRes(res);
            console.log(res);
            console.log("------- SingleProduct.tsx onClickHandler");
            dispatch(setIsReviewDialogActive(false));
        } catch (error) {
            console.log("------- SingleProduct.tsx onClickHandler");
            console.log(error);
            console.log("------- SingleProduct.tsx onClickHandler");
        }
        setIsLoading(false);
    };
    const updateReviewVoteHandler = async(reviewID:string, voted:boolean|undefined) => {
        try {
            const updateVoteRes = await updateVote({reviewID, voted, action:"update_vote", userLocation});

            console.log("------ updateReviewVoteHandler  SingleProduct.tsx");
            console.log(updateVoteRes);
            console.log("------ updateReviewVoteHandler  SingleProduct.tsx");
            
        } catch (error) {
            console.log("------ updateReviewVoteHandler  SingleProduct.tsx");
            console.log(error);
            console.log("------ updateReviewVoteHandler  SingleProduct.tsx");
        }
    };

    
    useEffect(() => {
        const singleProductRes = getSingleProduct(productID as string);

        singleProductRes.then((singleProductResolvedData) => {
            setSingleProduct(singleProductResolvedData.message as ProductTypesPopulated);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <div className="single_product_bg">
            {/*<button onClick={yy}>Fetch</button>
            <pre>{JSON.stringify(singleProduct.data?.message, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(postReviewRes, null, `\t`)}</pre>*/}
            <HandleMutationRes res={postReviewRes} />

            <DialogWrapper toggler={isReviewDialogActive} setToggler={setIsReviewDialogActive} Element={<Form isLoading={isLoading} heading="Give Review" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={postReviewHandler} />} />


            <SingleProductTemplate userLocation={userLocation} productID={productID} userWishlist={loginedUser.wishlist} category={singleProduct?.category} name={singleProduct?.name} price={singleProduct?.price} rating={singleProduct?.rating} description={singleProduct?.description} photo={singleProduct?.images[0] as string} parent="singleProduct" />

            
            
            <p>About</p>
            <ul>
                {singleProduct?.about.map((item, liIndex) => (
                    <li key={liIndex}>{item}</li>
                ))}
            </ul>
            {
                singleProduct &&
                    <>
                        <ProductSlider query="category" value={singleProduct.category as string} />
                        <ProductSlider query="brand" value={singleProduct.brand as string} />
                        <ProductSlider query="rating" value={"5"} />
                    </>
            }

            {/*<pre>{JSON.stringify(loginedUser.message._id, null, `\t`)}</pre>*/}
            <div className="reviews_cont">
                {
                    singleProduct &&
                    singleProduct?.reviews.map((review) => review.userID?._id === loginedUser._id && (
                        <div className="review_cont" key={review._id}>
                            <div className="upper_part">
                                <span className="date_heading">{review.updatedAt === review.createdAt ? "createdAt" : "updatedAt"} : </span>
                                <span className="date_value">{review.updatedAt === review.createdAt ? review.createdAt.split("T")[0].split("-").reverse().join("-") : review?.updatedAt.split("T")[0].split("-").reverse().join("-")}</span>
                                <MdDeleteForever className="MdDeleteForever" onClick={() => deleteReview({productID:productID as string, action:"delete_review", userLocation})} />
                            </div>
                            <div className="lower_part">
                                <div className="left_part">
                                    <img src={photo} alt={photo} />
                                </div>
                                <div className="middle_part">
                                    <div className="email">{review.userID.email}</div>
                                    <div className="rating"><RatingSystem rating={review.rating} /></div>
                                </div>
                                <div className="right_part">
                                    <div className="comment_heading">
                                    <span>Comment:</span>
                                        <span className="verified_purchases">
                                            {
                                                review.isPurchaseVerified &&
                                                    <MdVerified className="MdVerified"/>
                                            }
                                        </span>
                                    </div>
                                    <div className="comment_value">{review.comment}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    singleProduct ?
                        singleProduct?.reviews.length !== 0 ?
                            singleProduct?.reviews.map((review) => (
                                <div className="review_cont" key={review._id}>
                                    <div className="upper_part">
                                        <span className="date_heading">{review.updatedAt === review.createdAt ? "createdAt" : "updatedAt"} : </span>
                                        <span className="date_value">{review.updatedAt === review.createdAt ? review.createdAt?.split("T")[0].split("-").reverse().join("-") : review.updatedAt?.split("T")[0].split("-").reverse().join("-")}</span>
                                    </div>
                                    <div className="lower_part">
                                        <div className="left_part">
                                            <img src={photo} alt={photo} />
                                        </div>
                                        <div className="middle_part">
                                            <div className="email">{review.userID?.email}</div>
                                            <div className="rating"><RatingSystem rating={review?.rating} /></div>
                                        </div>
                                        <div className="right_part">
                                            <div className="comment_heading">
                                                <span>Comment:</span>
                                                <span className="verified_purchases">
                                                    {
                                                        review.isPurchaseVerified &&
                                                            <MdVerified className="MdVerified"/>
                                                    }
                                                </span>
                                            </div>
                                            <div className="comment_value">{review.comment}</div>
                                            <div className="vote_icons">
                                                <div className="down_vote">
                                                    <FaArrowAltCircleDown className="FaArrowAltCircleDown" style={{color:review.downVotes.includes(loginedUser._id) ? PRIMARY_LOW : "unset"}} onClick={() => updateReviewVoteHandler(review._id, false)}/>
                                                    <div className="down_vote_value">{review.downVotes.length}</div>
                                                </div>
                                                <div className="up_vote">
                                                    <FaArrowAltCircleUp className="FaArrowAltCircleUp" style={{color:review.upVotes.includes(loginedUser._id) ? PRIMARY_LOW : "unset"}} onClick={() => updateReviewVoteHandler(review._id, true)}/>
                                                    <div className="up_vote_value">{review.upVotes.length}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="review_cont_no_reviews">
                                <div className="heading_para">
                                    <div className="heading" style={{fontWeight:"bold"}}>No Reviews Yet!</div>
                                    <div className="para">for this product</div>
                                </div>
                            </div>
                        :
                        [1,2,3].map((q) => (
                            <div className="review_cont" key={q}>
                                <div className="lower_part">
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
                            </div>
                        ))
                }
            </div>
        </div>
    )
};

export default SingleProduct;