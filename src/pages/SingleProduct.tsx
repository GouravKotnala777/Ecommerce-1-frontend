import { BiHeart } from "react-icons/bi";
import "../styles/pages/single_product.scss";
import photo from "/vite.svg";

const SingleProduct = () => {

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
                            <span className="info_heading">Category</span><span className="info_value">category</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Name</span><span className="info_value">name</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Price</span><span className="info_value">price</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Rating</span><span className="info_value">rating</span>
                        </div>
                        <div className="heading_values">
                            <span className="info_heading">Description</span><span className="info_value">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ducimus, iusto voluptatum consequuntur porro necessitatibus molestiae maiores illo vitae aliquid quos soluta odit temporibus ipsa, ab labore accusamus enim similique.</span>
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
        </div>
    )
};

export default SingleProduct;