import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import unknownUser from "/unknownUser.png"
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";
import { useGetSingleProductQuery } from "../redux/api/api";
import Skeleton from "../components/Skeleton";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const {productID} = useParams();
    const {data}:{data?:{success:boolean; message:ProductTypes;}; isLoading?:boolean; isSuccess:boolean;} = useGetSingleProductQuery(productID);
    return(
        <div className="single_product_bg">
            <SingleProductTemplate productID={productID} category={data?.message?.category} name={data?.message?.name} price={data?.message?.price} rating={data?.message?.rating} description={data?.message?.description} photo={photo} parent="singleProduct" />

            <div className="reviews_cont">
                {
                    data?.message ?
                        data?.message?.reviews.map((review) => (
                            <div className="review_cont" key={review._id}>
                                <div className="left_part">
                                    <img src={photo} alt={photo} />
                                </div>
                                <div className="middle_part">
                                    <div className="email">{review.name}</div>
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