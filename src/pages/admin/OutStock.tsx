import { ProductTypes } from "../../assets/demoData";
import { UpdateProductBodyType, useOutStockProductsQuery } from "../../redux/api/api";
import { useState } from "react";
import Table from "../../components/Table";


const productTableHeadings = [
    {th:"Name", isEditable:false},
    {th:"Rating", isEditable:false},
    {th:"Price", isEditable:false},
    {th:"Stock", isEditable:true}
];

const OutStock = () => {
    const outStockData:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useOutStockProductsQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
}>({});

    return(
        <>
            {/*<pre>{JSON.stringify(outStockData.data?.message, null, `\t`)}</pre>*/}
            <p style={{margin:"0 auto", textAlign:"center"}}>Restock Products</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;})> thead={productTableHeadings} data={outStockData.data?.message} list={list} setList={setList} />
        </>
    )
};

export default OutStock;


















//const updateProductFunc = async(productID:string) => {
//    try {
//        if (list && list[productID]) {
//            console.log({[productID]:list[productID]});
//            const res = await fetch(`/api/v1/product/${productID}`, {
//                method:"PUT",
//                headers:{
//                    "Content-Type":"application/json"
//                },
//                credentials:"include",
//                body:JSON.stringify({productID, name:list[productID].name, price:list[productID].price, rating:list[productID].rating, stock:list[productID].stock, total_servings:list[productID].total_servings, diet_type:list[productID].diet_type, flavour:list[productID].flavour, age_range:list[productID].age_range, about:list[productID].about, ingredient:list[productID].ingredient})
//            });

//            const data = await res.json();

//            console.log("----OutStock.tsx  updateProductFunc");
//            console.log(data);
//            console.log("----OutStock.tsx  updateProductFunc");
//        }
//        else{
//            console.log("list me productID nahi hai");
//        }
//    } catch (error) {
//        console.log("----OutStock.tsx  updateProductFunc");
//        console.log(error);
//        console.log("----OutStock.tsx  updateProductFunc");
//    }
//}















//import { ProductTypes } from "../../assets/demoData";
//import { useOutStockProductsQuery, useUpdateProductMutation } from "../../redux/api/api";
//import { useState } from "react";
//import Table from "../../components/Table";


//const productTableHeadings = [
//    {th:"Name", isEditable:false},
//    {th:"Rating", isEditable:false},
//    {th:"Price", isEditable:false},
//    {th:"Stock", isEditable:true}
//];

//const OutStock = () => {
//    const outStockData:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useOutStockProductsQuery("");
//    const [list, setList] = useState<{ [key: string]:{
//        name: string;
//        rating: number;
//        price: number;
//        stock: number;
//    };
//}>({});
//    const [updateProduct] = useUpdateProductMutation();

//    return(
//        <>
//            {/*<pre>{JSON.stringify(outStockData.data?.message, null, `\t`)}</pre>*/}
//            <p style={{margin:"0 auto", textAlign:"center"}}>Restock Products</p>
//            <Table<(ProductTypes & {_id: string; [key: string]: string;}), ReturnType<typeof useUpdateProductMutation>[0]> thead={productTableHeadings} data={outStockData.data?.message} list={list} setList={setList} reduxQueryHook={updateProduct} />
//        </>
//    )
//};

//export default OutStock;