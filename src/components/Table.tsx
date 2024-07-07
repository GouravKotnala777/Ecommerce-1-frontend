import "../styles/components/table.scss";
import { RiStockLine } from "react-icons/ri";
import photo from "/vite.svg";
import { ChangeEvent, Dispatch } from "react";


type MutationHookGeneric<T extends (arg:object) => any> = ReturnType<T>[0];

interface TablePropTypes<T1, T2 extends (arg:object) => any>{
    thead:{th:string; isEditable:boolean;}[];
    data:T1[]|undefined;
    list:{
        [key: string]: {
            name: string;
            rating: number;
            price: number;
            stock: number;
        };
    };
    setList:Dispatch<React.SetStateAction<{
        [key: string]: {
            name: string;
            rating: number;
            price: number;
            stock: number;
        };
    }>>,
    reduxQueryHook:MutationHookGeneric<T2>;
}



const Table = <T1 extends {_id:string; [key:string]:string;}, T2 extends (arg:object) => any>({thead, data, list, setList, reduxQueryHook}:TablePropTypes<T1, T2>) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>, productID:string) => {
        setList({...list, [productID]:{...list[productID], [e.target.name.toLowerCase()]:e.target.value}})
    };

    const onClickHandler = async(productID:string) => {
        try {            
            if (list && list[productID]) {
                console.log({[productID]:list[productID]});
                console.log(list);
                console.log(list[productID].name);
                console.log(list[productID].price);
                console.log(list[productID].rating);
                console.log(list[productID].stock);
                
                    if (list[productID].name || list[productID].price || list[productID].rating || list[productID].stock) {
                        const res = await reduxQueryHook({productID, name:list[productID].name, price:list[productID].price, rating:list[productID].rating, stock:list[productID].stock});
                        console.log("::::::::::::::::::");
                        console.log(res);
                        console.log("::::::::::::::::::");
                    }
                    else{
                        console.log("Invalid input value");
                    }
                
                //else if (typeof list[productID] === "string"){
                //    if (list[productID]) {
                //        const res = await reduxQueryHook({productID, stock:list[productID]});
                //        console.log("::::::::::::::::::");
                //        console.log(res);
                //        console.log("::::::::::::::::::");
                //    }
                //    else{
                //        console.log("Invalid input value");
                //    }
                //}
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
            <div className="table">
                <pre>{JSON.stringify(list, null, `\t`)}</pre>
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
                            <div className="td photo_cell"><img src={photo} alt={photo} /></div>
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