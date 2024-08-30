import { Link } from "react-router-dom";
import "../styles/components/grouped_products.scss";
import photo from "/vite.svg";


const GroupedProducts = ({query, value}:{query:string; value:string|number}) => {


    return(
        <Link to={`/group/${query}/${value}`} className="grouped_products_cont">
            <div className="upper_part">
                <img src={`https://res.cloudinary.com/dx4comsu3/image/upload/v172/${query}/${value}.jpg`} alt={photo} />
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