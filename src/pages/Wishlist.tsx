import { ProductTypesPopulated, UserTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { UserLocationTypes } from "./Login.Page";


const Wishlist = ({loginedUser, wishlistData, userLocation}:{
    loginedUser:UserTypes;
    wishlistData:ProductTypesPopulated[];
    userLocation:UserLocationTypes;
}) => {


    return(
        <div className="wishlist_bg">
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Wishlist</div>
            {/*<pre>{JSON.stringify(data?.message, null, `\t`)}</pre>*/}
            {/*<button>fetch</button>*/}
            {
                wishlistData.map((product) => (
                    <SingleProductTemplate key={product._id}
                        userLocation={userLocation}
                        parent="wishlist"
                        productID={product._id}
                        userWishlist={loginedUser.wishlist}
                        category={product.category}
                        brand={product.brand}
                        name={product.name}
                        price={product.price}
                        rating={product.rating}
                        description={product.description}
                        photo={product.images[0]}
                    />
                ))
            }
        </div>
    )
};

export default Wishlist;