import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import unknownUser from "/unknownUser.png"
import { useEffect, useState } from "react";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";
import { useGetSingleProductQuery } from "../redux/api/api";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const SingleProduct = () => {
    const {productID} = useParams();
    const {data, isSuccess}:{data?:{success:boolean; message:ProductTypes;}; isLoading?:boolean; isSuccess:boolean;} = useGetSingleProductQuery(productID);
    const [singleProduct, setSingleProduct] = useState<ProductTypes|undefined>();


    //console.log(productID);
    //console.log(singleProduct);
    
    useEffect(() => {
        if (isSuccess) {
            setSingleProduct(data?.message);
        }
    }, [isSuccess]);

    return(
        <div className="single_product_bg">
            <SingleProductTemplate category={singleProduct?.category} name={singleProduct?.name} price={singleProduct?.price} rating={singleProduct?.rating} description={singleProduct?.description} photo={photo} parent="singleProduct" />

            <div className="reviews_cont">
                {
                    singleProduct ?
                        singleProduct.reviews.map((review) => (
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
                                    <img src={unknownUser} alt={unknownUser} style={{background:"smokewhite"}} />
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