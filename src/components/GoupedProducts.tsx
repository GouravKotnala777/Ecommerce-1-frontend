import { Link } from "react-router-dom";
import "../styles/components/grouped_products.scss";
import unknownProduct from "../../public/unknownProduct.png";
import ImageWithFallback from "./ImageWithFallback";


const GroupedProducts = ({query, value}:{query:string; value:string|number}) => {


    return(
        <Link to={`/group/${query}/${value}`} className="grouped_products_cont">
            <div className="upper_part">
                <ImageWithFallback src={`https://res.cloudinary.com/dx4comsu3/image/upload/w_100,h_100/v172/${query}/${value}.jpg`} alt={`https://res.cloudinary.com/dx4comsu3/image/upload/w_100,h_100/v172/${query}/${value}.jpg`} fallbackSrc={unknownProduct} />
            </div>
            <div className="lower_part">
                <div className="grouped_products_name">
                    {query === "rating" ?
                        `${value} stars`
                        :
                        value
                    }
                </div>
            </div>
        </Link>
    )
};

export default GroupedProducts;