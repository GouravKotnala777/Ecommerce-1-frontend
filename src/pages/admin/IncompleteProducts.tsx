import { useState } from "react";
import { ProductTypes } from "../../assets/demoData";
import { useIncompleteProductsQuery, useUpdateProductMutation } from "../../redux/api/api";
import Table from "../../components/Table";


const productTableHeadings = [
    {th:"Name", isEditable:false},
    {th:"total_servings", isEditable:true},
    {th:"diet_type", isEditable:true},
    {th:"flavour", isEditable:true},
    {th:"age_range", isEditable:true},
    {th:"about", isEditable:true},
    {th:"ingredient", isEditable:true}
];

const IncompleteProducts = () => {
    //const outStockData:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useGetAllProductsQuery("");
    const incompleteProducts:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useIncompleteProductsQuery("");
    const [list, setList] = useState<{ [key: string]:{
        total_servings: number;
        diet_type: string;
        flavour: string;
        age_range: string;
        about: string[];
        ingredient: string;
    };
}>({});
    const [updateProduct] = useUpdateProductMutation();    

    return(
        <div className="fill_detailes_bg">
            <p style={{margin:"0 auto", textAlign:"center"}}>Fill Detailes</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;}), ReturnType<typeof useUpdateProductMutation>[0]> thead={productTableHeadings} data={incompleteProducts.data?.message} list={list} setList={setList} reduxQueryHook={updateProduct} />
        </div>
    )
};

export default IncompleteProducts;