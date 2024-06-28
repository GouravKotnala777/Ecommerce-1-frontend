import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import { useState } from "react";
import { ProductTypes, productData } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";

const SingleProduct = () => {
    const [singleProduct, setSingleProduct] = useState<ProductTypes>(productData[0]);

    return(
        <div className="single_product_bg">
            <SingleProductTemplate category={singleProduct.category} name={singleProduct.name} price={singleProduct.price} rating={singleProduct.rating} description={singleProduct.description} photo={photo} parent="singleProduct" />

            <div className="reviews_cont">
                {
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
                }
            </div>
        </div>
    )
};

export default SingleProduct;