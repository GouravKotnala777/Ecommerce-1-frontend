import { useState } from "react";
import Table from "../../components/Table";
import { useOutStockProductsQuery, useUpdateProductMutation } from "../../redux/api/api";

const productTableHeadings = [
    {th:"Name", isEditable:true},
    {th:"Rating", isEditable:true},
    {th:"Price", isEditable:true},
    {th:"Stock", isEditable:true}
];


const UpdateProduct = () => {
    const {data} = useOutStockProductsQuery("");
    const [updateProduct] = useUpdateProductMutation();
    const [productList, setProductList] = useState<{ [key: string]:{
        name: string;
        rating: number;
        price: number;
        stock: number;
    };
}>({"aaaaa":{name:"name", price:0, rating:0, stock:0}});

    return(
        <>
            <p style={{margin:"0 auto", textAlign:"center"}}>Restock Products</p>
            <Table list={productList} setList={setProductList} thead={productTableHeadings} data={data?.message} reduxQueryHook={updateProduct} />
        </>
    )
};

export default UpdateProduct;