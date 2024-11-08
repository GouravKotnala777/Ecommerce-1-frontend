import { ProductTypes } from "../../assets/demoData";
import { ResponseType, updateProduct, UpdateProductBodyType } from "../../redux/api/api";
import { MouseEvent, useState } from "react";
import Table from "../../components/Table";


const productTableHeadings = [
    {th:"name", isEditable:false},
    {th:"rating", isEditable:false},
    {th:"price", isEditable:false},
    {th:"stock", isEditable:true}
];

const OutStock = ({outStockProductsNotification}:{outStockProductsNotification:
    (ProductTypes&{_id:string; [key:string]:string})[]
}) => {
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
    }>({});
    //const [updatedProduct] = useState();
    const [outStockRes, setOutStockRes] = useState<ResponseType<string>>();


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
                data={outStockProductsNotification}
                list={list}
                setList={setList}
                onEditClickHandler={(e:MouseEvent<HTMLButtonElement>) => onClickHandler(e)}
                outStockRes={outStockRes}
            />
        </>
    )
};

export default OutStock;