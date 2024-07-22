import { useParams } from "react-router-dom";
import { useGetProductsOfSameQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import Products from "../components/Products";
//import { useFindProductByQuery } from "../redux/api/api";


const ProductsOfSame = () => {
    const {query, value} = useParams();
    const getSameProducts:{data?:{success:boolean; message:ProductTypes[];}} = useGetProductsOfSameQuery({query, value});
    //const groupedByProductsData:{data:{message:string[];}} = useFindProductByQuery("");

    return(
        <h1>
            Products of Same
            <Products products={getSameProducts.data?.message} />
        </h1>
    )
};

export default ProductsOfSame;