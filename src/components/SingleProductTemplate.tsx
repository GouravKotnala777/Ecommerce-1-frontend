import "../styles/components/single_product_template.scss";
import { BiHeart } from "react-icons/bi";
import RatingSystem from "./RatingSystem";


interface SingleProductTemplatePropTypes{
    category:string;
    name:string;
    price:number;
    rating:number;
    description:string;
    photo:string;
    parent:string;
}

const SingleProductTemplate = ({category, name, price, rating, description, photo, parent}:SingleProductTemplatePropTypes) => {

    return(
        <div className="single_product_template_bg">
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
                        <div className="heading_values">
                            <span className="info_heading">Description</span><span className="info_value">{description}</span>
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
        </div>
    )
};

export default SingleProductTemplate;