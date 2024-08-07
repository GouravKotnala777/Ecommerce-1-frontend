import "../styles/components/product_btn_group.scss";
import { MouseEvent, useState } from "react";
import { useAddToCartMutation, useRemoveFromCartMutation } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { setIsReviewDialogActive } from "../redux/reducers/miscReducers";
import { useNavigate } from "react-router-dom";
import { MutationResTypes } from "../assets/demoData";
import HandleMutationRes from "./HandleMutationRes";
import Spinner from "./Spinner";


interface ProductBtnGroupPropTypes{
    parent:string;
    productID:string;
    amount:number;
}

const ProductBtnGroup = ({parent, productID, amount}:ProductBtnGroupPropTypes) => {
    const [addToCart] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [quantity, setQuantity] = useState<number>(1);
    const [addRemoveCartRes, setAddRemoveCartRes] = useState<MutationResTypes>();
    const [isAddRemoveCartloading, setIsAddRemoveCartLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();




    const addToCartHandler = async() => {
        try {
            setIsAddRemoveCartLoading(true);
            if (parent === "cart") {
                const res = await removeFromCart({productID:productID!, price:amount, quantity});
                setAddRemoveCartRes(res);
                setIsAddRemoveCartLoading(false);
            }
            else{
                const res = await addToCart({productID:productID!, price:amount, quantity});
                setAddRemoveCartRes(res);
                setIsAddRemoveCartLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsAddRemoveCartLoading(false);
        }
    }
    const buyHandler = async() => {
        try {
            console.log({orderItems2:[{productID, quantity}]});
            
            navigate("/user/address", {state:{
                amount,
                quantity,
                orderItems:[{productID, quantity}],
                totalPrice:(amount*quantity),
                parent
            }});
        } catch (error) {
            console.log(error);            
        }
    };
    const reviewToggleHandler = (e:MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(setIsReviewDialogActive(true));
    }

    return(
        <>
        
        <HandleMutationRes res={addRemoveCartRes} />
        <div className="btns_cont">
            <div className="upper_btns">
                <button className="add_btn" style={{background:parent === "cart" ? "white":"linear-gradient(90deg, rgb(255, 34, 71), rgb(255, 156, 102))", border:parent === "cart"?"1px solid rgb(255, 34, 71)":"none", color:parent==="cart"?"rgb(255, 34, 71)":"white"}} onClick={addToCartHandler}>{isAddRemoveCartloading ? <Spinner type={2} color="white" width={14} /> : parent === "cart" ? "Remove" : "Add"}</button>
                
                <select onChange={(e) => setQuantity(Number(e.target.value))}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                </select>
                <button className="buy_btn" onClick={() => buyHandler()}>Buy</button>
            </div>
            {
                parent === "singleProduct" &&
                    <div className="lower_btns">
                        <button className="review_btn" onClick={(e) => reviewToggleHandler(e)}>Review</button>
                    </div>
            }
        </div>
        </>
    )
};

export default ProductBtnGroup;