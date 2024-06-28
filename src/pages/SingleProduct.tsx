import { BiHeart } from "react-icons/bi";
import "../styles/pages/single_product.scss";
import photo from "/vite.svg";
import { useState } from "react";
import { ProductTypes, productData } from "../assets/demoData";

const SingleProduct = () => {
    const [singleProduct, setSingleProduct] = useState<ProductTypes>(productData[0]);

    return(
        <div className="single_product_bg">
            <div className="product_cont">
                <div className="left_part">
                    <img src={photo} alt={photo} />
                </div>
                <div className="right_part">
                    <div className="whishlist_cont">
                        <BiHeart className="BiHeart" />
                        <span>Add to wishlist</span>
                    </div>
                    <div className="info_cont">
                        <div className="heading_values">
                            <span className="info_heading">Category</span><span className="info_value">{singleProduct.category}</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Name</span><span className="info_value">{singleProduct.name}</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Price</span><span className="info_value">{singleProduct.price}</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Rating</span><span className="info_value">{singleProduct.rating}</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Description</span><span className="info_value">{singleProduct.description}</span>
                        </div>
                    </div>
                    <div className="btns_cont">
                        <div className="upper_btns">
                            <button className="add_btn">Add</button>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <button className="buy_btn">Buy</button>
                        </div>
                        <div className="lower_btns">
                            <button className="review_btn">Review</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="reviews_cont">
                {
                    singleProduct.reviews.map((review) => (
                        <div className="review_cont">
                            <div className="left_part">
                                <img src={photo} alt={photo} />
                            </div>
                            <div className="middle_part">
                                <div className="email">{review.name}</div>
                                <div className="rating">{review.rating}</div>
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