import "../styles/components/single_product_template.scss";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import RatingSystem from "./RatingSystem";
import Skeleton from "./Skeleton";
import ProductBtnGroup from "./ProductBtnGroup";
import { useAddRemoveFromWishlistMutation } from "../redux/api/api";
import { SyntheticEvent, useEffect } from "react";
import { NavLink } from "react-router-dom";
import unknownProductImg from "/public/unknownProduct.png";


interface SingleProductTemplatePropTypes{
    productID?:string;
    userWishlist?:string[];
    category?:string;
    name?:string;
    price?:number;
    quantity?:number;
    rating?:number;
    description?:string;
    photo:string;
    parent:string;
}


const SingleProductTemplate = ({productID, userWishlist, category, name, price, quantity, rating, description, photo, parent}:SingleProductTemplatePropTypes) => {
    const [addRemoveFromWishlist] = useAddRemoveFromWishlistMutation();

    const imageFallbackHandler = (e:SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = unknownProductImg;
    };

    useEffect(() => {
        console.log(userWishlist);
    }, [userWishlist]);

    return(
        <div className="single_product_template_bg">
            {
                !category&&!name&&!price&&!rating ?
                    <div className="product_cont">
                        <div className="left_part">
                            <img src={photo} alt={photo} />
                        </div>
                        <div className="right_part">
                            <div className="whishlist_cont">
                                <BiHeart className="BiHeart" color="rgb(255, 69, 100)" />
                                <span>Add to wishlist</span>
                            </div>
                            <div className="info_cont">
                                <div className="heading_values">
                                    <span className="info_heading" style={{width:"60%"}}>Category</span><Skeleton height="20px" />
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading" style={{width:"60%"}}>Name</span><Skeleton height="20px" />
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading" style={{width:"60%"}}>Price</span><Skeleton height="20px" />
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading" style={{width:"60%"}}>Rating</span><Skeleton height="20px" />
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading" style={{width:"60%"}}>Description</span><Skeleton height="20px" />
                                </div>
                            </div>
                            <div className="btns_cont">
                                <div className="upper_btns">
                                    
                                    <button className="add_btn" style={{background:parent === "singleProduct" ? "linear-gradient(90deg, rgb(255, 34, 71), rgb(255, 156, 102))":"white", border:parent === "singleProduct"?"none":"1px solid rgb(255, 34, 71)", color:parent==="singleProduct"?"white":"rgb(255, 34, 71)"}}>{parent === "singleProduct" ? "Add" : "Remove"}</button>
                                    
                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                    <button className="buy_btn">Buy</button>
                                </div>
                                {
                                    parent === "singleProduct" &&
                                        <div className="lower_btns">
                                            <button className="review_btn">Review</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="product_cont">
                        <div className="left_part">
                            <NavLink to={`/product/${productID}`} className="navlink">
                                <img src={photo} alt={photo} onError={(e) => imageFallbackHandler(e)} />
                            </NavLink>
                        </div>
                        <div className="right_part">
                            <div className="whishlist_cont">
                                {
                                    userWishlist?.includes(productID as string) ?
                                    <BiSolidHeart className="BiHeart" color="rgb(255, 69, 100)" onClick={() => addRemoveFromWishlist({productID:productID as string})} />
                                    :
                                    <BiHeart className="BiHeart" color="rgb(255, 69, 100)" onClick={() => addRemoveFromWishlist({productID:productID as string})} />
                                }
                                {
                                    userWishlist?.includes(productID as string) ?
                                        <span>Remove from wishlist</span>
                                        :
                                        <span>Add to wishlist</span>
                                }
                            </div>
                            <div className="info_cont">
                                <div className="heading_values">
                                    <span className="info_heading">Category</span><span className="info_value">{category}</span>
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading">Name</span><span className="info_value">{name}</span>
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading">Price</span><span className="info_value">{price}</span>
                                </div>
                                <div className="heading_values">
                                    <span className="info_heading">Rating</span><span className="info_value"><RatingSystem rating={rating} /></span>
                                </div>
                                {
                                    parent === "cart"?
                                        <div className="heading_values">
                                            <span className="info_heading">Quantity</span><span className="info_value">{quantity} pic.</span>
                                        </div>
                                        :
                                        <div className="heading_values">
                                            <span className="info_heading">Description</span><span className="info_value">{description}</span>
                                        </div>
                                }
                            </div>
                            <ProductBtnGroup
                                parent={parent}
                                productID={productID as string}
                                amount={price as number}
                                totalPrice={price as number}
                                 />
                        </div>
                    </div>
            }
        </div>
    )
};

export default SingleProductTemplate;