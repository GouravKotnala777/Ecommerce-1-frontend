import { MutationResTypes, ProductTypes } from "../../assets/demoData";
import { UpdateProductBodyType, useUpdateProductMutation } from "../../redux/api/api";
import { MouseEvent, useState } from "react";
import Table from "../../components/Table";


const productTableHeadings = [
    {th:"name", isEditable:false},
    {th:"rating", isEditable:false},
    {th:"price", isEditable:false},
    {th:"stock", isEditable:true}
];

const OutStock = ({outStockProductsNotification}:{outStockProductsNotification:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}}}) => {
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
    }>({});
    const [updateProduct] = useUpdateProductMutation();
    const [outStockRes, setOutStockRes] = useState<MutationResTypes>();


    const onClickHandler = async(e:MouseEvent<HTMLButtonElement>) => {
        try {            
            if (list && list[e?.currentTarget?.value as string]) {
                console.log({[e?.currentTarget?.value as string]:list[e?.currentTarget?.value as string]});
                const res = await updateProduct({productID:e?.currentTarget?.value, name:list[e?.currentTarget?.value].name, price:list[e?.currentTarget?.value].price, rating:list[e?.currentTarget?.value].rating, stock:list[e?.currentTarget?.value].stock, total_servings:list[e?.currentTarget?.value].total_servings, diet_type:list[e?.currentTarget?.value].diet_type, flavour:list[e?.currentTarget?.value].flavour, age_range:list[e?.currentTarget?.value].age_range, about:list[e?.currentTarget?.value].about, ingredient:list[e?.currentTarget?.value].ingredient});
                console.log("::::::::::::::::::");
                console.log(list);
                console.log(res);
                setOutStockRes(res);
                
                console.log("::::::::::::::::::");
            }
            else{
                console.log("list me productID nahi hai");
            }

        } catch (error) {
            console.log("::::::::::::::::::");
            console.log(error);            
            console.log("::::::::::::::::::");
        }
    };

    return(
        <>
            {/*<pre>{JSON.stringify(outStockData.data?.message, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(orderNumber, null, `\t`)}</pre>*/}
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Restock Products</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;})>
                thead={productTableHeadings}
                data={outStockProductsNotification.data?.message}
                list={list}
                setList={setList}
                onEditClickHandler={(e:MouseEvent<HTMLButtonElement>) => onClickHandler(e)}
                outStockRes={outStockRes}
            />
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