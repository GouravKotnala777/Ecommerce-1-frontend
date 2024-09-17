import { useState } from "react";
import { ProductTypes } from "../../assets/demoData";
import { UpdateProductBodyType, useIncompleteProductsQuery } from "../../redux/api/api";
import Table from "../../components/Table";


const productTableHeadings = [
    {th:"name", isEditable:false},
    {th:"total_servings", isEditable:true},
    {th:"diet_type", isEditable:true},
    {th:"flavour", isEditable:true},
    {th:"age_range", isEditable:true},
    {th:"about", isEditable:true},
    {th:"ingredient", isEditable:true}
];

const IncompleteProducts = () => {
    const incompleteProducts:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useIncompleteProductsQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
}>({}); 

    return(
        <div className="fill_detailes_bg">
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Fill Detailes</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;})> thead={productTableHeadings} data={incompleteProducts.data?.message} list={list} setList={setList} />
        </div>
    )
};

export default IncompleteProducts;