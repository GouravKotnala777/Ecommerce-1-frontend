import "../styles/components/product_btn_group.scss";
import { MouseEvent, useState } from "react";
import { useAddToCartMutation, useRemoveFromCartMutation } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { setIsReviewDialogActive } from "../redux/reducers/miscReducers";
import { useNavigate } from "react-router-dom";


interface ProductBtnGroupPropTypes{
    parent:string;
    productID:string;
    amount:number;
}

const ProductBtnGroup = ({parent, productID, amount}:ProductBtnGroupPropTypes) => {
    const [addToCart] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const buyHandler = async({amount}:{amount:number}) => {
        try {
            navigate("/user/address", {state:{amount:amount, quantity:quantity}});
        } catch (error) {
            console.log(error);            
        }
    };
    const reviewToggleHandler = (e:MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(setIsReviewDialogActive(true));
    }

    return(
        <div className="btns_cont">
            <div className="upper_btns">
                <button className="add_btn" style={{background:parent === "cart" ? "white":"linear-gradient(90deg, rgb(255, 34, 71), rgb(255, 156, 102))", border:parent === "cart"?"1px solid rgb(255, 34, 71)":"none", color:parent==="cart"?"rgb(255, 34, 71)":"white"}} onClick={() => parent === "cart"?removeFromCart({productID:productID!, price:amount, quantity}):addToCart({productID:productID!, price:amount, quantity})}>{parent === "cart" ? "Remove" : "Add"}</button>
                
                <select onChange={(e) => setQuantity(Number(e.target.value))}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <button className="buy_btn" onClick={() => buyHandler({amount})}>Buy</button>
            </div>
            {
                parent === "singleProduct" &&
                    <div className="lower_btns">
                        <button className="review_btn" onClick={(e) => reviewToggleHandler(e)}>Review</button>
                    </div>
            }
        </div>
    )
};

export default ProductBtnGroup;