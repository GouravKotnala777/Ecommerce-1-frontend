import "../styles/components/table.scss";
import { RiStockLine } from "react-icons/ri";
import photo from "/vite.svg";
import { ChangeEvent, Dispatch, useState } from "react";
import { useUpdateProductMutation } from "../redux/api/api";
import { MutationResTypes } from "../assets/demoData";
import HandleMutationRes from "./HandleMutationRes";
//import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/query";
//import { BaseQueryFn } from "@reduxjs/toolkit/query";



interface TablePropTypes<T1>{
    thead:{th:string; isEditable:boolean;}[];
    data:T1[]|undefined;
    list:{
        [key: string]: {
            name?: string;
            rating?: number;
            price?: number;
            stock?: number;
            total_servings?: number;
            diet_type?: string;
            flavour?: string;
            age_range?: string;
            about?: string[];
            ingredient?: string;
        };
    };
    setList:Dispatch<React.SetStateAction<{
        [key: string]: {
            name?: string;
            rating?: number;
            price?: number;
            stock?: number;
            total_servings?: number;
            diet_type?: string;
            flavour?: string;
            age_range?: string;
            about?: string[];
            ingredient?: string;
        };
    }>>,
}



const Table = <T1 extends {_id:string; [key:string]:string;}>({thead, data, list, setList}:TablePropTypes<T1>) => {
    const [updateProduct] = useUpdateProductMutation();
    const [outStockRes, setOutStockRes] = useState<MutationResTypes>();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>, productID:string) => {
        setList({...list, [productID]:{...list[productID], [e.target.name.toLowerCase()]:e.target.value}})
    };

    const onClickHandler = async(productID:string) => {
        try {            
            if (list && list[productID]) {
                console.log({[productID]:list[productID]});
                console.log(list);
                const res = await updateProduct({productID, name:list[productID].name, price:list[productID].price, rating:list[productID].rating, stock:list[productID].stock, total_servings:list[productID].total_servings, diet_type:list[productID].diet_type, flavour:list[productID].flavour, age_range:list[productID].age_range, about:list[productID].about, ingredient:list[productID].ingredient});
                console.log("::::::::::::::::::");
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
        <div className="table_bg">
            <HandleMutationRes res={outStockRes} />
            <div className="table">
                {/*<pre>{JSON.stringify(data[0].images[0], null, `\t`)}</pre>*/}
                <div className="thead">
                    <div className="th photo_cell">Img</div>
                    <div className="th id_cell">ID</div>
                    {
                        thead.map((item) => (
                            <div className="th" key={item.th}>{item.th}</div>
                        ))
                    }
                    <div className="th">Fill</div>
                </div>
                <div className="tbody">
                {
                    data&&data?.map((product) => (
                        <div className="tr" key={product._id}>
                            <div className="td photo_cell"><img src={product.images[0]} alt={photo} /></div>
                            {/*<div className="td photo_cell"><pre>{JSON.stringify(product.images[0], null, `\t`)}</pre></div>*/}
                            <div className="td id_cell">{product._id.split("").splice(14,10)}</div>
                            {
                                thead.map((item) => (
                                    item.isEditable ? 
                                    <div className="td" key={item.th}><input type="text" name={item.th} placeholder={product[item.th.toLowerCase()] as string} onChange={(e) => onChangeHandler(e, product._id)} /></div>
                                    :
                                    <div className="td" key={item.th}>{product[item.th.toLowerCase()]}</div>
                                ))
                            }
                            <div className="td update_btn" onClick={() => onClickHandler(product._id)}><RiStockLine /></div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
};

export default Table;



































//type MutationHookGeneric<T extends (arg:object) => any> = ReturnType<T>[0];

//interface TablePropTypes<T1, T2 extends (arg:object) => any>{
//    thead:{th:string; isEditable:boolean;}[];
//    data:T1[]|undefined;
//    list:{
//        [key: string]: {
//            name: string;
//            rating: number;
//            price: number;
//            stock: number;
//            total_servings: number;
//            diet_type: string;
//            flavour: string;
//            age_range: string;
//            about: string[];
//            ingredient: string;
//        };
//    };
//    setList:Dispatch<React.SetStateAction<{
//        [key: string]: {
//            name: string;
//            rating: number;
//            price: number;
//            stock: number;
//            total_servings: number;
//            diet_type: string;
//            flavour: string;
//            age_range: string;
//            about: string[];
//            ingredient: string;
//        };
//    }>>,
//    reduxQueryHook:MutationHookGeneric<T2>;
//}



//const Table = <T1 extends {_id:string; [key:string]:string;}, T2 extends (arg:object) => any>({thead, data, list, setList, reduxQueryHook}:TablePropTypes<T1, T2>) => {

//    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>, productID:string) => {
//        setList({...list, [productID]:{...list[productID], [e.target.name.toLowerCase()]:e.target.value}})
//    };

//    const onClickHandler = async(productID:string) => {
//        try {            
//            if (list && list[productID]) {
//                console.log({[productID]:list[productID]});
//                console.log(list);
                
//                    //if (list[productID].name || list[productID].price || list[productID].rating || list[productID].stock) {
//                        const res = await reduxQueryHook({productID, name:list[productID].name, price:list[productID].price, rating:list[productID].rating, stock:list[productID].stock, total_servings:list[productID].total_servings, diet_type:list[productID].diet_type, flavour:list[productID].flavour, age_range:list[productID].age_range, about:list[productID].about, ingredient:list[productID].ingredient});
//                        console.log("::::::::::::::::::");
//                        console.log(res);
//                        console.log("::::::::::::::::::");
//                    //}
//                    //else{
//                    //    console.log("Invalid input value");
//                    //}
                
//                //else if (typeof list[productID] === "string"){
//                //    if (list[productID]) {
//                //        const res = await reduxQueryHook({productID, stock:list[productID]});
//                //        console.log("::::::::::::::::::");
//                //        console.log(res);
//                //        console.log("::::::::::::::::::");
//                //    }
//                //    else{
//                //        console.log("Invalid input value");
//                //    }
//                //}
//            }
//            else{
//                console.log("list me productID nahi hai");
//            }

//        } catch (error) {
//            console.log("::::::::::::::::::");
//            console.log(error);            
//            console.log("::::::::::::::::::");
//        }
//    };


//    return(
//        <div className="table_bg">
//            <div className="table">
//                {/*<pre>{JSON.stringify(data[0].images[0], null, `\t`)}</pre>*/}
//                <div className="thead">
//                    <div className="th photo_cell">Img</div>
//                    <div className="th id_cell">ID</div>
//                    {
//                        thead.map((item) => (
//                            <div className="th" key={item.th}>{item.th}</div>
//                        ))
//                    }
//                    <div className="th">Fill</div>
//                </div>
//                <div className="tbody">
//                {
//                    data&&data?.map((product) => (
//                        <div className="tr" key={product._id}>
//                            <div className="td photo_cell"><img src={product.images[0]} alt={photo} /></div>
//                            {/*<div className="td photo_cell"><pre>{JSON.stringify(product.images[0], null, `\t`)}</pre></div>*/}
//                            <div className="td id_cell">{product._id.split("").splice(14,10)}</div>
//                            {
//                                thead.map((item) => (
//                                    item.isEditable ? 
//                                    <div className="td" key={item.th}><input type="text" name={item.th} placeholder={product[item.th.toLowerCase()] as string} onChange={(e) => onChangeHandler(e, product._id)} /></div>
//                                    :
//                                    <div className="td" key={item.th}>{product[item.th.toLowerCase()]}</div>
//                                ))
//                            }
//                            <div className="td update_btn" onClick={() => onClickHandler(product._id)}><RiStockLine /></div>
//                        </div>
//                    ))
//                }
//                </div>
//            </div>
//        </div>
//    )
//};

//export default Table;