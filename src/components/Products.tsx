import { Link } from "react-router-dom";
import "../styles/components/products.scss";
import photo from "/public/vite.svg";
//import { useEffect, useState } from "react";
import { ProductTypes } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
//import { useGetAllProductsQuery } from "../redux/api/api";
import ProductBtnGroup from "./ProductBtnGroup";


const Products = ({products}:{products:ProductTypes[]|undefined}) => {
    //const [products, setProducts] = useState<ProductTypes[]>([]);
    //const {data, isLoading, isSuccess} = useGetAllProductsQuery("");


    //useEffect(() => {
    //    if (isSuccess) {
    //        setProducts(data.message);
    //    }
    //}, [isSuccess]);

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
                                    <img src={product.images[0]} alt={photo} />
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