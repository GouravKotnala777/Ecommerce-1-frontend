import { MouseEvent, useEffect, useState } from "react";
import Table from "../../components/Table";
import { outStockProducts, updateProduct, UpdateProductBodyType } from "../../redux/api/api";

const productTableHeadings = [
    {th:"name", isEditable:true},
    {th:"rating", isEditable:true},
    {th:"price", isEditable:true},
    {th:"stock", isEditable:true}
];


const UpdateProduct = () => {
    
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
    }>({});
    const [outStock, setOutStock] = useState<{ [key: string]: string | string[]; _id: string; }[]>([]);
    const [outStockRes, setOutStockRes] = useState<string>("");
    
    

    const onClickHandler = async(e:MouseEvent<HTMLButtonElement>) => {
        try {            
            if (list && list[e?.currentTarget?.value as string]) {
                console.log({[e?.currentTarget?.value as string]:list[e?.currentTarget?.value as string]});
                const res = await updateProduct({productID:e?.currentTarget?.value, name:list[e?.currentTarget?.value].name, price:list[e?.currentTarget?.value].price, rating:list[e?.currentTarget?.value].rating, stock:list[e?.currentTarget?.value].stock, total_servings:list[e?.currentTarget?.value].total_servings, diet_type:list[e?.currentTarget?.value].diet_type, flavour:list[e?.currentTarget?.value].flavour, age_range:list[e?.currentTarget?.value].age_range, about:list[e?.currentTarget?.value].about, ingredient:list[e?.currentTarget?.value].ingredient});
                console.log("::::::::::::::::::");
                console.log(list);
                console.log(res);
                setOutStockRes(res.message as string);
                // (ProductTypes&{_id:string; [key:string]:string})[]
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

    useEffect(() => {
        const res = outStockProducts();
        res.then((outStockResolvedData) => {
            setOutStock(outStockResolvedData.message as {[key: string]: string | string[]; _id: string; }[]);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return(
        <>
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Update Products</p>
            <Table
                thead={productTableHeadings}
                data={outStock}
                list={list}
                setList={setList}
                onEditClickHandler={onClickHandler}
                outStockRes={outStockRes}
            />
        </>
    )
};

export default UpdateProduct;