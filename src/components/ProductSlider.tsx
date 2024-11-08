import "../styles/components/product_slider.scss";
import photo from "../../public/vite.svg";
import { ProductTypes } from "../assets/demoData";
import { Link } from "react-router-dom";
import unknownProductImg from "/public/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";
import { useEffect, useState } from "react";
import { getProductsOfSame } from "../redux/api/api";

const ProductSlider = ({query, value}:{query:"category"|"brand"|"rating"; value:string;}) => {
    const [getSameProducts, setGetSameProducts] = useState<ProductTypes[]>([]);

    useEffect(() => {
        const getSameProductsRes = getProductsOfSame({query, value});

        getSameProductsRes.then((getSameProductsResolvedData) => {
            setGetSameProducts(getSameProductsResolvedData.message as ProductTypes[]);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return(
        <div className="product_slider_cont">
            {
                getSameProducts &&
                <>
                    <div className="slider_heading">
                        Products Of Same {query.toUpperCase()}
                    </div>
                    <div className="slider_cont">
                        <div className="products_cont">
                            {
                                getSameProducts.map((item, index) => (
                                    <Link to={`/product/${item._id}`} className="product_cont" key={index}>
                                        <div  className="img_cont">
                                            <ImageWithFallback src={item.images[0].split("/upload")[0]+"/upload/w_100,h_80"+item.images[0].split("/upload")[1]} alt={photo} fallbackSrc={unknownProductImg} />
                                        </div>
                                        <div className="detaile_cont">
                                            <div className="value">{item[query]}</div>
                                            <div className="value name">{item.name}</div>
                                            <div className="value">{item.price}₹</div>
                                        </div>
                                    </Link>
                                ))
                            }
                            
                            

                        </div>
                    </div>
                
                </>
            }
            {/*<pre>{JSON.stringify(getSameProducts.data?.message, null, `\t`)}</pre>*/}

        </div>
    )
};

export default ProductSlider;