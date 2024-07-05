import "../../styles/admin/outstock.scss";
import { ProductTypes } from "../../assets/demoData";
//import SingleProductTemplate from "../../components/SingleProductTemplate";
import { useOutStockProductsQuery, useUpdateProductMutation } from "../../redux/api/api";
import photo from "/vite.svg";
import { RiStockLine } from "react-icons/ri";
import { ChangeEvent, useState } from "react";

const OutStock = () => {
    const outStockData:{data?:{success:boolean; message:ProductTypes[]}} = useOutStockProductsQuery("");
    const [productList, setProductList] = useState<{[key:string]:number;}>();
    const [updateProduct] = useUpdateProductMutation();
    //const [quantity, setQuantity] = useState<number>(0);

    const stockRefillChangeHandler = (e:ChangeEvent<HTMLInputElement>, productID:string) => {
        setProductList({...productList, [productID]:Number(e.target.value)})
    };
    const stockRefillClickHandler = async(productID:string) => {
        try {
            if (productList && productList[productID]) {
                console.log({productID, stock:productList[productID]});
                if (productList[productID] >= 1) {
                    const res = await updateProduct({productID, stock:productList[productID]});
                    console.log("::::::::::::::::::");
                    console.log(res);
                    console.log("::::::::::::::::::");
                }
                else{
                    console.log("Invalid stock value");
                }
            }
            else{
                console.log("productList me productID nahi hai");
            }

        } catch (error) {
            console.log("::::::::::::::::::");
            console.log(error);            
            console.log("::::::::::::::::::");
        }
    };

    return(
        <div className="table_bg">
            <div className="table">
                <div className="thead">
                    <div className="th">Img</div>
                    <div className="th">ID</div>
                    <div className="th">Name</div>
                    <div className="th">Rating</div>
                    <div className="th">Price</div>
                    <div className="th">Stock</div>
                    <div className="th">Fill</div>
                </div>
                <div className="tbody">
                {
                    outStockData.data?.message.map((product) => (
                        <div className="tr" key={product._id}>
                            <div className="td"><img src={photo} alt={photo} /></div>
                            <div className="td">{product._id.split("").splice(14,10)}</div>
                            <div className="td">{product.name}</div>
                            <div className="td">{product.rating}</div>
                            <div className="td">{product.price}</div>
                            <div className="td"><input type="number" name="quantity" placeholder={product.stock.toString()} onChange={(e) => stockRefillChangeHandler(e, product._id)} /></div>
                            <div className="td" onClick={() => stockRefillClickHandler(product._id)}><RiStockLine /></div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
};

export default OutStock;