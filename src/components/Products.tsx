import "../styles/components/products.scss";
import { Link } from "react-router-dom";
import { ProductTypes } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
import ProductBtnGroup from "./ProductBtnGroup";
//import { SyntheticEvent } from "react";
import unknownProductImg from "/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";
import { UserLocationTypes } from "../pages/Login.Page";


const Products = ({products, userLocation}:{products:ProductTypes[]|undefined; userLocation:UserLocationTypes;}) => {

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
                                    <ImageWithFallback src={product.images[0].split("/upload")[0]+"/upload/w_200,h_200"+product.images[0].split("/upload")[1]} alt={unknownProductImg} fallbackSrc={unknownProductImg} />
                                </Link>
                            </div>
                            <div className="middle_part">
                                <div className="info name">{product.name}</div>
                                <div className="info price">{product.price}</div>
                                <div className="info rating"><RatingSystem rating={product.rating} /></div>
                            </div>
                            <div className="lower_part">
                                <ProductBtnGroup userLocation={userLocation} parent="home" productID={product._id} amount={product.price} category={product.category} brand={product.brand} />
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
};

export default Products;