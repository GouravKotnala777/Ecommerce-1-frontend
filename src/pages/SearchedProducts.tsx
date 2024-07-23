import { useParams } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import Products from "../components/Products";


const SearchedProducts = () => {
    const {searchQry} = useParams();
    const searchedProducts:{data?:{message:ProductTypes[];}} = useSearchProductsQuery({searchQry:searchQry as string});

    console.log({searchedProducts});
    

    return (
        <div className="searched_products_bg">
            <Products products={searchedProducts.data?.message} />
        </div>
    )
};

export default SearchedProducts;