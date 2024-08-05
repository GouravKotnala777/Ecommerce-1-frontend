import "../styles/components/products.scss";
import { Link } from "react-router-dom";
import { ProductTypes } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
import ProductBtnGroup from "./ProductBtnGroup";
//import { SyntheticEvent } from "react";
import unknownProductImg from "/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";


const Products = ({products}:{products:ProductTypes[]|undefined}) => {

    return(
        <div className="products_bg">
            {
                products?.length === 0 ? 
                (
                    <h1>Products Not Found</h1>
                )
                :
                (
                    products?.map((product) =>(
                        <div className="product_cont" key={product._id}>
                            <div className="upper_part">
                                <Link className="link" to={`/product/${product._id}`}>
                                    <ImageWithFallback src={product.images[0]} alt={unknownProductImg} fallbackSrc={unknownProductImg} />
                                </Link>
                            </div>
                            <div className="middle_part">
                                <div className="info name">{product.name}</div>
                                <div className="info price">{product.price}</div>
                                <div className="info rating"><RatingSystem rating={product.rating} /></div>
                            </div>
                            <div className="lower_part">
                                <ProductBtnGroup parent="home" productID={product._id} amount={product.price} />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
};

export default Products;