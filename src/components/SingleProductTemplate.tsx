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
import { UserLocationTypes } from "../pages/Login.Page";
import { SelectedGiftReducerInitialState, setGiftReducer } from "../redux/reducers/selectedGiftReducer";
import { useDispatch, useSelector } from "react-redux";
import { BsInfo } from "react-icons/bs";
import { Heading, Note, Para } from "../pages/static/Policies";

interface SingleProductTemplatePropTypes{
    userLocation:UserLocationTypes;

    productID?:string;
    userWishlist?:string[];
    category?:string;
    brand?:string;
    name?:string;
    price?:number;
    quantity?:number;
    rating?:number;
    description?:string;
    photo:string;
    parent:string;


    transactionId?:string;
    shippingType?:string;
    paymentStatus?:string;
    orderStatus?:string;
    message?:string;
    createdAt?:string;

    setTotalAmount?:(value: SetStateAction<number>) => void;
    includedProducts?:{[key:string]:boolean;};
    setIncludedProducts?:Dispatch<SetStateAction<{[key:string]:boolean;}>>
}


const SingleProductTemplate = ({userLocation, productID, userWishlist, category, brand, name, price, quantity, rating, description, photo, parent, transactionId, shippingType, paymentStatus, orderStatus, message, createdAt, setTotalAmount, includedProducts, setIncludedProducts}:SingleProductTemplatePropTypes) => {
    const [addRemoveFromWishlist] = useAddRemoveFromWishlistMutation();
    const [addRemoveFromWishlistRes, setAddRemoveFromWishlistRes] = useState<MutationResTypes>();
    const {gift} = useSelector((state:{selectedGiftReducer:SelectedGiftReducerInitialState}) => state.selectedGiftReducer);
    const [isSelectedGiftInfoDialogActive, setIsSelectedGiftInfoDialogActive] = useState<boolean>(false);
    const dispatch = useDispatch();

    const addRemoveFromWishlistHandler = async() => {
        try {
            console.log("----- SingleProductTemplate addRemoveFromWishlistHandler");
            const res = await addRemoveFromWishlist({productID:productID as string, action:"update_wishlist", userLocation});
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
            <dialog className="selected_coupon_dialog" open={isSelectedGiftInfoDialogActive}>
                <Heading heading="You have selected a Gift Card" fontSize="0.9rem" />
                <Para para={gift?.coupon._id as string} />
                <Note heading="Note" para="You can unselect this Gift Card, If you want" />
                <div className="btns_cont">
                    <button className="unselect_gift_btn" onClick={() => {setIsSelectedGiftInfoDialogActive(false); dispatch(setGiftReducer({isLoading:true, gift:null, isError:false}))}}>Unselect Gift Card</button>
                    <button className="keep_selected_gift_btn" onClick={() => setIsSelectedGiftInfoDialogActive(false)}>No, Keep Selected</button>
                </div>

            </dialog>
            <div className="single_product_template_bg" onClick={() => setIsSelectedGiftInfoDialogActive(false)}>
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
                                            {
                                                parent==="cart" ?
                                                    <div className="include_cont">
                                                        {
                                                            userWishlist?.includes(productID as string) ?
                                                                <span>Include</span>
                                                                :
                                                                <span>Exclude</span>
                                                        }
                                                        {
                                                            userWishlist?.includes(productID as string) ?
                                                            <input type="checkbox" />
                                                            :
                                                            <input type="checkbox" name={`${productID}`} defaultChecked onChange={(e) => includeProductHandler(e)} />
                                                        }
                                                    </div>
                                                    :
                                                    <div className="wishlist_cont">
                                                        {
                                                            userWishlist?.includes(productID as string) ?
                                                            <span>Remove from wishlist</span>
                                                            :
                                                            <span>Add to wishlist</span>
                                                        }
                                                        {
                                                            userWishlist?.includes(productID as string) ?
                                                            <BiSolidHeart className="BiHeart" onClick={addRemoveFromWishlistHandler} />
                                                            :
                                                            <BiHeart className="BiHeart" onClick={addRemoveFromWishlistHandler} />
                                                        }
                                                    </div>
                                            }
                                            
                                            
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
                                        <span className="info_heading">Price</span><span className="info_value">
                                        {
                                            parent === "singleProduct" ?
                                                gift?.status === "pending" ? 
                                                    <>
                                                        <BsInfo style={{borderRadius:"50%", background:`linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`, fontSize:"0.9rem", color:"white"}} onClick={(e) => {e.stopPropagation(); setIsSelectedGiftInfoDialogActive(true)}} /> <s>{price} ₹</s><br/>
        
                                                        <span style={{color:"#00dd00", fontWeight:"600", fontSize:"0.9rem"}}>{(price as number)-gift.coupon.amount} ₹</span>
                                                    </>
                                                    :
                                                    price
                                                
                                                :
                                                price
                                                
                                        }
                                        </span>
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
                                                    <span className="info_heading">Payment Status</span><span className="info_value">{paymentStatus}</span>
                                                </div>
                                                <div className="heading_values">
                                                    <span className="info_heading">Order Status</span><span className="info_value">{orderStatus}</span>
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
                                    parent === "orders" ?
                                        ""
                                        :
                                        parent === "singleProduct" ?
                                            <ProductBtnGroup
                                                userLocation={userLocation}
                                                parent={parent}
                                                productID={productID as string}
                                                amount={
                                                    gift && gift.status === "pending" ?
                                                        (price as number)-(gift?.coupon.amount as number)
                                                        :
                                                        price as number
                                                }
                                                brand={brand as string}
                                                category={category as string}
                                                setTotalAmount={setTotalAmount}
                                                />
                                                :
                                                <ProductBtnGroup
                                                    userLocation={userLocation}
                                                    parent={parent}
                                                    productID={productID as string}
                                                    amount={price as number}
                                                    brand={brand as string}
                                                    category={category as string}
                                                    setTotalAmount={setTotalAmount}
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