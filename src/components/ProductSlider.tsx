import "../styles/components/product_slider.scss";
import photo from "../../public/vite.svg";
import { useGetProductsOfSameQuery } from "../redux/api/api";
import { ProductTypesPopulated } from "../assets/demoData";
import { Link } from "react-router-dom";

const ProductSlider = ({query, value}:{query:string; value:string|number;}) => {
    const getSameProducts:{data?:{success:boolean; message:ProductTypesPopulated[];}} = useGetProductsOfSameQuery({query, value});

    return(
        <div className="product_slider_cont">
            {/*<pre>{JSON.stringify(getSameProducts.data?.message, null, `\t`)}</pre>*/}
            <div className="slider_heading">
                Products Of Same {query.toUpperCase()}
            </div>
            <div className="slider_cont">
                <div className="products_cont">
                    {
                        getSameProducts.data?.message.map((item) => (
                            <div className="product_cont">
                                <Link to={`/product/${item._id}`} className="link">
                                    <img src={photo} alt={photo} />
                                </Link>
                                <div className="detaile_cont">
                                    {/*<div className="heading">{query === "category" ? "Brand" : "Category"}</div>*/}
                                    <div className="value">{item[query]}</div>
                                    <div className="value">{item[query === "category" ? "brand" : "category"]}</div>
                                    {/*<div className="heading">Price</div>*/}
                                    <div className="value">{item.price}₹</div>
                                </div>
                            </div>
                        ))
                    }
                    
                    

                </div>
            </div>

        </div>
    )
};

export default ProductSlider;