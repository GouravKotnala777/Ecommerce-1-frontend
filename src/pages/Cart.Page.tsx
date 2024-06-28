import "../styles/pages/cart.scss";
import photo from "/vite.svg";
import { ProductTypes, productData } from "../assets/demoData";
import { useState } from "react";
import SingleProductTemplate from "../components/SingleProductTemplate";


const Cart = () => {
    const [product, setProduct] = useState<ProductTypes>(productData[0]);

    return(
        <div className="cart_bg">
            <SingleProductTemplate category={product.category} name={product.name} price={product.price} rating={product.rating} description={product.description} photo={photo} parent="cart" />
        </div>
    )
};

export default Cart;