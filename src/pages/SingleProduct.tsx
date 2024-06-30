import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import { useEffect, useState } from "react";
import { ProductTypes, productData } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import RatingSystem from "../components/RatingSystem";
import { useGetSingleProductQuery } from "../redux/api/api";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
    const {productID} = useParams();
    const {data, error} = useGetSingleProductQuery(productID);
    const [singleProduct, setSingleProduct] = useState<ProductTypes>(productData[0]);


    
    
    
    //useEffect(() => {
    //    console.log("::::::::::::");
    //    console.log(data);
    //    console.log({productID});
    //    console.log("::::::::::::");
    ////    console.log(data.message);
    ////    //setSingleProduct(data.message);
    //}, []);

    return(
        <div className="single_product_bg">
            <SingleProductTemplate category={data.message.category} name={data.message.name} price={data.message.price} rating={data.message.rating} description={data.message.description} photo={photo} parent="singleProduct" />

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