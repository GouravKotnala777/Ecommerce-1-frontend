import { useState } from "react";
import Table from "../../components/Table";
import { UpdateProductBodyType, useOutStockProductsQuery } from "../../redux/api/api";

const productTableHeadings = [
    {th:"Name", isEditable:true},
    {th:"Rating", isEditable:true},
    {th:"Price", isEditable:true},
    {th:"Stock", isEditable:true}
];


const UpdateProduct = () => {
    const {data} = useOutStockProductsQuery("");
    const [productList, setProductList] = useState<{ [key: string]:UpdateProductBodyType;
}>({"aaaaa":{name:"name", price:0, rating:0, stock:0}});

    return(
        <>
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Restock Products</p>
            <Table list={productList} setList={setProductList} thead={productTableHeadings} data={data?.message} />
        </>
    )
};

export default UpdateProduct;