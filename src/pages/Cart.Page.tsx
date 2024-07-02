import "../styles/pages/cart.scss";
import photo from "/vite.svg";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { useFetchMyCartQuery } from "../redux/api/api";


const Cart = () => {
    const {data}:{data?:{success:boolean; message:{products:[{productID:ProductTypes}]}};} = useFetchMyCartQuery("");


    console.log("??????????????????");
    
    return(
        <div className="cart_bg">
            {
                data?.message?.products.map((product) => (
                    <SingleProductTemplate key={product.productID._id} productID={product.productID._id} category={product.productID.category} name={product.productID.name} price={product.productID.price} rating={product.productID.rating} description={product.productID.description} photo={photo} parent="cart" />
                ))
            }
        </div>
    )
};

export default Cart;