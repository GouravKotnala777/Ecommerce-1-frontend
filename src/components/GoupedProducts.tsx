import { Link } from "react-router-dom";
import "../styles/components/grouped_products.scss";
import photo from "/vite.svg";


const GroupedProducts = ({query, value}:{query:string; value:string}) => {


    return(
        <Link to={`/group/${query}/${value}`} className="grouped_products_cont">
            <div className="upper_part">
                <img src={photo} alt={photo} />
            </div>
            <div className="lower_part">
                <div className="grouped_products_name">
                    {value}
                </div>
            </div>
        </Link>
    )
};

export default GroupedProducts;