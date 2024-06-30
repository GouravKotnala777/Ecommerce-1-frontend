import { Link } from "react-router-dom";
import "../styles/components/products.scss";
import photo from "/public/vite.svg";
import { useEffect, useState } from "react";
import { ProductTypes, productData } from "../assets/demoData";
import RatingSystem from "./RatingSystem";
import { useGetAllProductsQuery } from "../redux/api/api";


const Products = () => {
    //import.meta.env.VITE_SERVER_URL
    const [products, setProducts] = useState<ProductTypes[]>(productData);
    const {data, error} = useGetAllProductsQuery("");

    console.log(data);
    console.log(error);

    useEffect(() => {
        console.log("::::::::::::::::");
        setProducts(data.message)
        console.log(data);
        console.log(error);
        console.log("::::::::::::::::");
        

    }, []);

    return(
        <div className="products_bg">
            {products.map((product) => (
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
                        <button className="add_btn">Add</button>
                        <button className="buy_btn">Buy</button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Products;