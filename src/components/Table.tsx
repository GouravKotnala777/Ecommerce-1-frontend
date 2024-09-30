import "../styles/components/table.scss";
import { RiStockLine } from "react-icons/ri";
import photo from "/vite.svg";
import { ChangeEvent, Dispatch, MouseEvent, ReactElement, SetStateAction } from "react";
import { BsInfoSquare } from "react-icons/bs";
import DialogWrapper from "./DialogWrapper";
import { UserLocationTypes } from "../pages/Login.Page";
import { MutationResTypes } from "../assets/demoData";
import ImageWithFallback from "./ImageWithFallback";
import unknownProductImg from "../../public/unknownProduct.png";
import { MdDeleteForever } from "react-icons/md";


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




            userID?: string;
            action?: string;
            ipAddress?: string;
            userAgent?: string;
            userLocation?: UserLocationTypes;
            platform?: string;
            device?: string;
            referrer?: string;
            success?: boolean;
            errorDetails?: string;
            timestamp?: Date;
            orderStatus?:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded";
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





            userID?: string;
            action?: string;
            ipAddress?: string;
            userAgent?: string;
            userLocation?: UserLocationTypes;
            platform?: string;
            device?: string;
            referrer?: string;
            success?: boolean;
            errorDetails?: string;
            timestamp?: Date;

            orderStatus?:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded";
        };
    }>>,
    hideEditBtn?:boolean;
    hideImg?:boolean;

    DialogElement?:ReactElement;
    dialogShowInfo?:(e:MouseEvent<HTMLButtonElement>) => void;
    isOrderInfoDialogOpen?:boolean;
    setIsOrderInfoDialogOpen?:Dispatch<SetStateAction<boolean>>;
    
    DeleteRowDialog?:ReactElement;
    isDeleteRowDialogOpen?:boolean;
    setIsDeleteRowDialogOpen?:Dispatch<SetStateAction<boolean>>;

    onEditClickHandler?:(e:MouseEvent<HTMLButtonElement>) => Promise<void>;
    outStockRes?:MutationResTypes | undefined
}

const Table = <T1 extends {_id:string; [key:string]:string|string[];}>({thead, data, list, setList, hideEditBtn, hideImg, 
        DialogElement, dialogShowInfo, isOrderInfoDialogOpen, setIsOrderInfoDialogOpen,  onEditClickHandler,
        isDeleteRowDialogOpen, setIsDeleteRowDialogOpen, DeleteRowDialog
    }:TablePropTypes<T1>) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>, productID:string) => {
        setList({...list, [productID]:{...list[productID], [e.target.name]:e.target.value}})
    };

    //const showDeleteWarningHandler = (e:MouseEvent<HTMLButtonElement>) => {
    //    (dialogShowInfo as (e:MouseEvent<HTMLButtonElement>) => void)(e);
    //    (setIsDeleteRowDialogOpen as Dispatch<SetStateAction<boolean>>)(true);
    //}

    return(
        <div className="table_bg">
            {/*<pre>{JSON.stringify(data, null, `\t`)}</pre>*/}
            {
                DialogElement &&
                    <DialogWrapper Element={DialogElement as ReactElement} toggler={isOrderInfoDialogOpen as boolean} setToggler={setIsOrderInfoDialogOpen as Dispatch<SetStateAction<boolean>>} />
            }

            {
                DeleteRowDialog &&
                    <DialogWrapper Element={DeleteRowDialog as ReactElement} toggler={isDeleteRowDialogOpen as boolean} setToggler={setIsDeleteRowDialogOpen as Dispatch<SetStateAction<boolean>>} />

            }

            {/*<HandleMutationRes res={outStockRes} />*/}
            <div className="table">
                <div className="thead">
                    {
                        !hideImg &&
                        <div className="th photo_cell">Img</div>
                    }
                    <div className="th id_cell">ID</div>
                    {
                        thead.map((item) => (
                            <div className="th" key={Math.random()}>{item.th}</div>
                        ))
                    }
                    {
                        !hideEditBtn &&
                            <div className="th">Fill</div>
                    }
                    {
                        hideEditBtn &&
                            <div className="th">View</div>
                    }
                </div>
                <div className="tbody">
                {
                    data&&data?.map((product, index) => (
                        <div className="tr" key={product._id+index} style={{
                            background:product?.["orderStatus"] === "failed" ? "#ff000020" : "",
                            color:product?.["orderStatus"] === "failed" ? "red" : "black",
                            fontWeight:product?.["orderStatus"] === "failed" ? "500" : "400",
                            boxShadow:product?.["orderStatus"] === "failed" ? "" : "1px 1px 8px 1px #ff4b6941"
                        }}>
                            {
                                product?.images&&product.images[0] &&
                                    <div className="td photo_cell">
                                        <ImageWithFallback src={product.images[0].split("/upload")[0]+"/upload/w_100,h_80"+product.images[0].split("/upload")[1]} alt={photo} fallbackSrc={unknownProductImg} />
                                        {/*<img src={product.images[0]} alt={photo} />*/}
                                    </div>
                            }
                            <div className="td id_cell">{product._id.split("").splice(14,10)}</div>
                            {
                                thead.map((item, index) => (
                                    item.isEditable ? 
                                    <div className="td" key={item.th+index}><input type="text" name={item.th} placeholder={product[item.th.toString()] as string} onChange={(e) => onChangeHandler(e, product._id)} /></div>
                                    :
                                    item.th === "userID" ?
                                        <div className="td" key={item.th+index}>{product[item.th]?.slice(13, 24)}</div>
                                        :
                                        item.th === "orderStatus" ?
                                            <div className="td" key={item.th+index} style={{borderRadius:"8px", color:"white", fontWeight:"bold",
                                                background:product[item.th] === "cancelled"||product[item.th] === "failed" ? 
                                                                "#ff4b69c0"
                                                                :
                                                                product[item.th] === "confirmed" ?
                                                                    "#00ee00b0"
                                                                    :
                                                                    product[item.th] === "returned" || product[item.th] === "refunded" ?
                                                                        "#80808095"
                                                                        :
                                                                        product[item.th] === "dispatched" ?
                                                                            "#0000ff93"
                                                                            :
                                                                            product[item.th] === "shipped" ?
                                                                                "#00bfff"
                                                                                :
                                                                                product[item.th] === "pending" ?
                                                                                    "#e1e100eb"
                                                                                    :
                                                                                    "#008000c1"

                                            }}>{product[item.th]}</div>
                                            :
                                            item.th === "cancel" ?
                                                <button className="td update_btn" value={product._id} style={{fontSize:"15px", width:"100px"}} onClick={(e) => {dialogShowInfo!(e); setIsDeleteRowDialogOpen!(true);}}><MdDeleteForever /></button>
                                                :    
                                                <div className="td" key={item.th+index}>{product[item.th]}</div>
                                ))
                            }
                            {
                                !hideEditBtn && onEditClickHandler &&
                                    <button className="td update_btn" value={product._id} onClick={(e) => onEditClickHandler(e)}><RiStockLine /></button>
                            }
                            {
                                hideEditBtn &&
                                    <button className="td update_btn" value={index} onClick={(e:MouseEvent<HTMLButtonElement>) => {dialogShowInfo!(e); setIsOrderInfoDialogOpen!(true);}}><BsInfoSquare/></button>
                            }
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