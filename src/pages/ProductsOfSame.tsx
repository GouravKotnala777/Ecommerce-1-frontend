import { useParams } from "react-router-dom";
import { ProductTypes } from "../assets/demoData";
import Products from "../components/Products";
import { UserLocationTypes } from "./Login.Page";
import { useEffect, useState } from "react";
import { getProductsOfSame } from "../redux/api/api";
//import { useFindProductByQuery } from "../redux/api/api";


const ProductsOfSame = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const {query, value} = useParams();
    const [getSameProducts, setGetSameProducts] = useState<ProductTypes[]>([]);
    
    useEffect(() => {
        const getSameProductsRes = getProductsOfSame({query:query as string, value:value as string});

        getSameProductsRes.then((getSameProductsResolvedData) => {
            setGetSameProducts(getSameProductsResolvedData.message as ProductTypes[]);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <h1>
            Products of Same
            <Products userLocation={userLocation} products={getSameProducts} />
        </h1>
    )
};

export default ProductsOfSame;