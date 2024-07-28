import "../styles/pages/searched_products.scss";
import { useParams } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";


const SearchedProducts = () => {
    const {searchQry} = useParams();
    const searchedProducts:{data?:{message:ProductTypes[];}} = useSearchProductsQuery({searchQry:searchQry as string});

    console.log({searchedProducts});
    

    return (
        <div className="searched_products_bg">
            <div className="filters_cont">
                <input type="text" placeholder="Price" />
            </div>
            <div className="products_cont">
                {
                    searchedProducts.data?.message.map(({_id, name, price, category, description, rating, images}) => (
                        <SingleProductTemplate parent="singleProduct" name={name} price={price} quantity={1} category={category} description={description} rating={rating} productID={_id} photo={images[0]} />
                    ))
                }
            </div>
        </div>
    )
};

export default SearchedProducts;