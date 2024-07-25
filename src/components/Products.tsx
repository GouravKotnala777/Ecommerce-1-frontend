import "../styles/components/products.scss";
import { Link } from "react-router-dom";
import photo from "/public/vite.svg";
import { ProductTypes } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
import ProductBtnGroup from "./ProductBtnGroup";
import { SyntheticEvent } from "react";
import unknownProductImg from "/unknownProduct.png";


const Products = ({products}:{products:ProductTypes[]|undefined}) => {

    const imageFallbackHandler = (e:SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = unknownProductImg;
    }
    return(
        <div className="products_bg">
            {
                !products ? 
                (
                    <h1>Loading...</h1>
                )
                :
                (
                    products.map((product) =>(
                        <div className="product_cont" key={product._id}>
                            <div className="upper_part">
                                <Link className="link" to={`/product/${product._id}`}>
                                    <img src={product.images[0]} alt={photo} onError={(e) => imageFallbackHandler(e)} />
                                </Link>
                            </div>
                            <div className="middle_part">
                                <div className="info name">{product.name}</div>
                                <div className="info price">{product.price}</div>
                                <div className="info rating"><RatingSystem rating={product.rating} /></div>
                            </div>
                            <div className="lower_part">
                                <ProductBtnGroup parent="home" productID={product._id} amount={product.price} totalPrice={product.price} />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
};

export default Products;