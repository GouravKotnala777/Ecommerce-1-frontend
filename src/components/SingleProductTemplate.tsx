import "../styles/components/single_product_template.scss";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import RatingSystem from "./RatingSystem";
import Skeleton from "./Skeleton";
import ProductBtnGroup from "./ProductBtnGroup";
import { useAddRemoveFromWishlistMutation } from "../redux/api/api";
import { NavLink } from "react-router-dom";
import unknownProductImg from "/public/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";
//import {Toaster} from "react-hot-toast";
import HandleMutationRes from "./HandleMutationRes";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { MutationResTypes } from "../assets/demoData";
import Spinner from "./Spinner";
import { PRIMARY, SECONDARY } from "../styles/utils";

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


    transactionId?:string;
    shippingType?:string;
    status?:string;
    message?:string;
    createdAt?:string;

    setTotalAmount?:(value: SetStateAction<number>) => void;
    includedProducts?:{[key:string]:boolean;};
    setIncludedProducts?:Dispatch<SetStateAction<{[key:string]:boolean;}>>
}


const SingleProductTemplate = ({productID, userWishlist, category, name, price, quantity, rating, description, photo, parent, transactionId, shippingType, status, message, createdAt,        setTotalAmount, includedProducts, setIncludedProducts}:SingleProductTemplatePropTypes) => {
    const [addRemoveFromWishlist] = useAddRemoveFromWishlistMutation();
    const [addRemoveFromWishlistRes, setAddRemoveFromWishlistRes] = useState<MutationResTypes>();

    const addRemoveFromWishlistHandler = async() => {
        try {
            console.log("----- SingleProductTemplate addRemoveFromWishlistHandler");
            const res = await addRemoveFromWishlist({productID:productID as string});
            setAddRemoveFromWishlistRes(res);
            console.log("----- SingleProductTemplate addRemoveFromWishlistHandler");
        } catch (error) {
            console.log("----- error addRemoveFromWishlistHandler");
            console.log(error);
            console.log("----- error addRemoveFromWishlistHandler");   
        }
    };

    const includeProductHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (setTotalAmount) {
            if (e.target.checked === true) {
                setTotalAmount((prev) => prev + (price! * quantity!))
            }
            else{
                setTotalAmount((prev) => prev - (price! * quantity!))
            }
        }
        includedProducts && setIncludedProducts && setIncludedProducts({...includedProducts, [e.target.name]:e.target.checked})
    }

    return(
        <>
            <HandleMutationRes res={addRemoveFromWishlistRes} />
            <div className="single_product_template_bg">
                {
                    !category&&!name&&!price&&!rating ?
                        <div className="product_cont">
                            <div className="left_part">
                                <div className="navlink">
                                    <img src={unknownProductImg} alt={unknownProductImg} className="navlink" />
                                </div>
                            </div>
                            <div className="right_part">
                                <div className="whishlist_cont">
                                    <BiHeart className="BiHeart" color="#ff4b69" />
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
                                        
                                        <button className="add_btn" style={{background:parent === "singleProduct" ? `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`:"white", border:parent === "singleProduct"?"none":PRIMARY, color:parent==="singleProduct"?"white":PRIMARY}}><Spinner type={1} color="white" /></button>
                                        
                                        <select>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                        <button className="buy_btn"><Spinner type={1} color="white" /></button>
                                    </div>
                                    {
                                        parent === "singleProduct" &&
                                            <div className="lower_btns">
                                                <button className="review_btn"><Spinner type={1} color={PRIMARY} /></button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="product_cont">
                            <div className="left_part">
                                <NavLink to={`/product/${productID}`} className="navlink">
                                    <ImageWithFallback src={photo.split("/upload")[0]+"/upload/w_256,h_256"+photo.split("/upload")[1]} alt={photo} fallbackSrc={unknownProductImg} />
                                </NavLink>
                            </div>
                            <div className="right_part">
                                {
                                    parent !== "orders" &&
                                        <div className="upper_part">
                                            <div className="wishlist_cont">
                                                {
                                                    userWishlist?.includes(productID as string) ?
                                                    <BiSolidHeart className="BiHeart" onClick={addRemoveFromWishlistHandler} />
                                                    :
                                                    <BiHeart className="BiHeart" onClick={addRemoveFromWishlistHandler} />
                                                }
                                                {
                                                    userWishlist?.includes(productID as string) ?
                                                        <span>Remove from wishlist</span>
                                                        :
                                                        <span>Add to wishlist</span>
                                                }
                                            </div>
                                            <div className="include_cont">
                                                {
                                                    userWishlist?.includes(productID as string) ?
                                                    <input type="checkbox" />
                                                    :
                                                    <input type="checkbox" name={`${productID}`} defaultChecked onChange={(e) => includeProductHandler(e)} />
                                                }
                                                {
                                                    userWishlist?.includes(productID as string) ?
                                                        <span>Include</span>
                                                        :
                                                        <span>Exclude</span>
                                                }
                                            </div>
                                        </div>
                                }
                                <div className="info_cont">
                                    {
                                        category &&
                                            <div className="heading_values">
                                                <span className="info_heading">Category</span><span className="info_value">{category}</span>
                                            </div>
                                    }
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
                                    {
                                        parent === "orders" &&
                                            <>
                                                <div className="heading_values">
                                                    <span className="info_heading">OrderID</span><span className="info_value">{productID?.split("").splice(10,22).join("")}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">TransactionID</span><span className="info_value">{transactionId?.split("").splice(10,22).join("")}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Status</span><span className="info_value">{status}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Shipping Type</span><span className="info_value">{shippingType}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Message</span><span className="info_value">{message}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Created At</span><span className="info_value">{createdAt?.split("T")[0]}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Time</span><span className="info_value">{createdAt?.split("T")[1]}</span>
                                                </div>
                                            </>
                                    }
                                </div>

                                {
                                    parent !== "orders" &&
                                        <ProductBtnGroup
                                            parent={parent}
                                            productID={productID as string}
                                            amount={price as number}
                                            />
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    )
};

export default SingleProductTemplate;