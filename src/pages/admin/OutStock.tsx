import { ProductTypes } from "../../assets/demoData";
import { useOutStockProductsQuery, useUpdateProductMutation } from "../../redux/api/api";
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
    const [list, setList] = useState<{ [key: string]:{
        name: string;
        rating: number;
        price: number;
        stock: number;
    };
}>({});
    const [updateProduct] = useUpdateProductMutation();

    return(
        <>
            {/*<pre>{JSON.stringify(outStockData.data?.message, null, `\t`)}</pre>*/}
            <p style={{margin:"0 auto", textAlign:"center"}}>Restock Products</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;}), ReturnType<typeof useUpdateProductMutation>[0]> thead={productTableHeadings} data={outStockData.data?.message} list={list} setList={setList} reduxQueryHook={updateProduct} />
        </>
    )
};

export default OutStock;