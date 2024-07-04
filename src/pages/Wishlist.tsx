import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { useMyWhishlistQuery } from "../redux/api/api";
import photo from "../assets/react.svg";


const Wishlist = () => {
    const {data}:{data:{success:boolean; message:ProductTypes[]}} = useMyWhishlistQuery("");


    return(
        <div className="wishlist_bg">
            <h1>Wishlist</h1>
            {/*<pre>{JSON.stringify(data, null, `\t`)}</pre>
            <button>fetch</button>*/}
            {
                data?.message.map((product) => (
                    <SingleProductTemplate key={product._id} parent="wishlist" productID={product._id} category={product.category} name={product.name} price={product.price} rating={product.rating} description={product.description} photo={photo} />
                ))
            }
        </div>
    )
};

export default Wishlist;