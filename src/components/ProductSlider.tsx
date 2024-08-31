import "../styles/components/product_slider.scss";
import photo from "../../public/vite.svg";
import { useGetProductsOfSameQuery } from "../redux/api/api";
import { ProductTypesPopulated } from "../assets/demoData";
import { Link } from "react-router-dom";
import unknownProductImg from "/public/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";

const ProductSlider = ({query, value}:{query:"category"|"brand"|"rating"; value:string|number;}) => {
    const getSameProducts:{data?:{success:boolean; message:ProductTypesPopulated[];}} = useGetProductsOfSameQuery({query, value});

    return(
        <div className="product_slider_cont">
            {
                getSameProducts.data&&
                <>
                    <div className="slider_heading">
                        Products Of Same {query.toUpperCase()}
                    </div>
                    <div className="slider_cont">
                        <div className="products_cont">
                            {
                                getSameProducts.data?.message.map((item, index) => (
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