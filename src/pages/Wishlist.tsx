import { SerializedError } from "@reduxjs/toolkit";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { useMyWhishlistQuery } from "../redux/api/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ItemNotFound from "../components/ItemNotFound";
import Spinner from "../components/Spinner";


const Wishlist = () => {
    const wishlistData:{
        isLoading:boolean;
        data?:{success:boolean; message:ProductTypes[]};
        error?:FetchBaseQueryError | SerializedError;
    } = useMyWhishlistQuery("");


    return(
        <div className="wishlist_bg">
            <div className="heading" style={{padding:"4px 4px", fontWeight:"bold"}}>Wishlist</div>
            {/*<pre>{JSON.stringify(data?.message, null, `\t`)}</pre>*/}
            {/*<button>fetch</button>*/}
            {
                wishlistData.isLoading ?
                <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                    :
                    wishlistData.error &&
                    "data" in wishlistData.error &&
                    wishlistData.error.data &&
                    typeof wishlistData.error.data === "object" &&
                    "message" in wishlistData.error.data ?
                        <ItemNotFound heading={wishlistData.error?.data.message as string} statusCode={wishlistData.error.status as number} />
                        :
                        wishlistData.data?.message ?
                            wishlistData.data?.message.length === 0 ?
                                <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />
                                :
                                wishlistData.data?.message.map((product) => (
                                    <SingleProductTemplate key={product._id} parent="wishlist" productID={product._id} category={product.category} name={product.name} price={product.price} rating={product.rating} description={product.description} photo={product.images[0]} />
                                ))                              
                            :
                            <ItemNotFound heading={"No Internet Connection!"} statusCode={523} />

            }
        </div>
    )
};

export default Wishlist;