import { MouseEvent, useEffect, useState } from "react";
import { ProductTypes } from "../../assets/demoData";
import { incompleteProducts, ResponseType, updateProduct, UpdateProductBodyType } from "../../redux/api/api";
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
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;
    }>({});
    const [outStockRes, setOutStockRes] = useState<ResponseType<string|Error>>();
    const [incompleteProductsArray, setIncompleteProductsArray] = useState<(ProductTypes&{_id:string; [key:string]:string})[]>([]);


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

    useEffect(() => {
        const res = incompleteProducts();
        res.then((resolved) => {
            setIncompleteProductsArray(resolved.message as (ProductTypes&{_id:string; [key:string]:string})[])
        }).catch((err) => {
            console.log(err);
        })
        // (ProductTypes&{_id:string; [key:string]:string})[]

    }, []);

    return(
        <div className="fill_detailes_bg">
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Fill Detailes</p>
            <Table<(ProductTypes & {_id: string; [key: string]: string;})> 
                thead={productTableHeadings}
                data={incompleteProductsArray as (ProductTypes & {
                    [key: string]: string;
                    _id: string;
                })[]}
                list={list}
                setList={setList}
                onEditClickHandler={(e:MouseEvent<HTMLButtonElement>) => onClickHandler(e)}
                outStockRes={outStockRes}
            />
        </div>
    )
};

export default IncompleteProducts;