import { Link } from "react-router-dom";
import "../styles/components/products.scss";
import photo from "/public/vite.svg";
import { useEffect, useState } from "react";
import { ProductTypes } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
import { useAddToCartMutation, useGetAllProductsQuery } from "../redux/api/api";


const Products = () => {
    //import.meta.env.VITE_SERVER_URL
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const {data, isLoading, isSuccess} = useGetAllProductsQuery("");
    const [addToCart] = useAddToCartMutation();

    useEffect(() => {
        if (isSuccess) {
            setProducts(data.message);
        }
    }, [isSuccess]);

    return(
        <div className="products_bg">
            {
                isLoading ? 
                (
                    <h1>Loading...</h1>
                )
                :
                (
                    products.map((product) =>(
                        <div className="product_cont" key={product._id}>
                            <div className="upper_part">
                                <Link className="link" to={`/product/${product._id}`}>
                                    <img src={photo} alt={photo} />
                                </Link>
                            </div>
                            <div className="middle_part">
                                <div className="info name">{product.name}</div>
                                <div className="info price">{product.price}</div>
                                <div className="info rating"><RatingSystem rating={product.rating} /></div>
                            </div>
                            <div className="lower_part">
                                <button className="add_btn" onClick={() => {addToCart({productID:product._id, quantity:1})}}>Add</button>
                                <button className="buy_btn">Buy</button>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
};

export default Products;