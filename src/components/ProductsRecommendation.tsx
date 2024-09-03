import { Dispatch, MouseEvent, SetStateAction } from "react";
import { ProductTypes } from "../assets/demoData";
import ImageWithFallback from "./ImageWithFallback";
import unknownProductImg from "../../public/unknownProduct.png";


const ProductsRecommendation = ({heading, arrayOfSameProducts, recommendationProducts, setRecommendationProducts}:{heading:string; arrayOfSameProducts?:Pick<ProductTypes, "category"|"brand"|"_id"|"name"|"price"|"images">[]; recommendationProducts:{productID:string; price:number; quantity:number;}[]; setRecommendationProducts:Dispatch<SetStateAction<{productID:string; price:number; quantity:number;}[]>>}) => {
    const func2 = ({e, _id, price}:{e:MouseEvent<HTMLButtonElement>; _id:string; price:number;}) => {
        const recommendRealContBtn = document.getElementById(`${_id}-add_from_recomm`)?.parentElement;
        const recommendPlaceHolderBtn = document.getElementById(`${_id}-remove_from_recomm`)?.parentElement;
        if (e.currentTarget.id === `${_id}-add_from_recomm`) {
            setRecommendationProducts([...recommendationProducts, {productID:_id, quantity:1, price}]);
    
            if (recommendRealContBtn&&recommendPlaceHolderBtn) {
                recommendPlaceHolderBtn.style.transform = "rotateY(0deg)";
                recommendRealContBtn.style.transform = "rotateY(90deg)";
            }
        }
        else{
            setRecommendationProducts([...recommendationProducts.filter((iter) => iter.productID !== _id)]);
            
            if (recommendRealContBtn&&recommendPlaceHolderBtn) {
                recommendPlaceHolderBtn.style.transform = "rotateY(90deg)";
                recommendRealContBtn.style.transform = "rotateY(0deg)";
            }
        }
    };

    return(
        <div className="recommendation_cont">
            <div className="same_brand_recommendation">
                <div className="heading">{heading}</div>
                <div className="products">
                    {
                        arrayOfSameProducts?.map((product, index) => (
                            <div className="product_cont" key={index}>
                                <div className="product_placeholder_cont">
                                    <div className="heading">
                                        Product Added to checkout
                                    </div>
                                    <button id={`${product._id}-remove_from_recomm`} onClick={(e) => func2({e, _id:product._id, price:product.price})}>Remove from Checkout</button>
                                </div>
                                <div className="real_cont" key={index}>
                                    <div className="image_cont">
                                        <ImageWithFallback src={product.images[0].split("/upload")[0]+"/upload/w_200,h_200"+product.images[0].split("/upload")[1]} alt={product.images[0].split("/upload")[0]+"/upload/w_200,h_200"+product.images[0].split("/upload")[1]} fallbackSrc={unknownProductImg}/>
                                    </div>
                                    <div className="name">{product?.name}</div>
                                    <div className="price">{product?.price}/- ₹</div>
                                    <button id={`${product._id}-add_from_recomm`} onClick={(e) => func2({e, _id:product._id, price:product.price})}>Add to Checkout</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default ProductsRecommendation;