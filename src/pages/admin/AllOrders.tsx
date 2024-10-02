import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UpdateProductBodyType, useAllOrdersQuery, useUpdateOrderMutation } from "../../redux/api/api";
import { AllOrdersResponseType } from "../MyOrders";
import { SerializedError } from "@reduxjs/toolkit";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import Table from "../../components/Table";
import { MutationResTypes } from "../../assets/demoData";
import { UserLocationTypes } from "../Login.Page";

type AllOrdersChartType = "allPendingOrders"|"allConfirmedOrders"|"allProcessingOrders"|"allDispatchedOrders"|"allShippedOrders"|"allDeliveredOrders"|"allCancelledOrders"|"allFailedOrders"|"allReturnedOrders"|"allRefundedOrders";

const productTableHeadings = [
    {th:"name", isEditable:false},
    {th:"orderStatus", isEditable:true},
    {th:"price", isEditable:false},
    {th:"transactionId", isEditable:false},
    {th:"orderStatus", isEditable:false}
];

const AllOrders = ({userLocation}:{userLocation:UserLocationTypes}) => {
    const {data}:{
        isLoading:boolean;
        data?:AllOrdersResponseType;
        error?:FetchBaseQueryError | SerializedError;} = useAllOrdersQuery("");
    const [ordersChartType, setOrdersChartType] = useState<AllOrdersChartType>("allConfirmedOrders");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;}>({});
    const [transformedData, setTransformedData] = useState<UpdateProductBodyType[]>([]);
    const [outStockRes, setOutStockRes] = useState<MutationResTypes>();
    const [updateOrder] = useUpdateOrderMutation();


    //console.log(data?.message.allConfirmedOrders);
    


    const onClickHandler = async(e:MouseEvent<HTMLButtonElement>) => {
        try {
            if (list && list[e?.currentTarget?.value as string]) {
                const res = await updateOrder({orderID:e?.currentTarget?.value as string, orderStatus:list[e?.currentTarget?.value as string]?.orderStatus as "pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded", action:"update_order", userLocation});
                console.log("::::::::::::::::::");
                setOutStockRes(res);
                console.log(res);
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

    const dataTransformer = useCallback((): UpdateProductBodyType[] | undefined => {
        
        
        return data?.message[ordersChartType].flatMap((item) => {
            const vv = item?.paymentInfo;
            return item.orderItems.map((item2) => {
                return {
                    _id: item._id,
                    name: item2?.productID?.name,
                    orderStatus: item.orderStatus,
                    price: item2?.productID?.price,
                    images: item2?.productID?.images,
                    createdAt: item.createdAt,
                    ...vv,
                };
            });
        });
    }, [data, ordersChartType]);

    useEffect(() => {
        setTransformedData(dataTransformer() as UpdateProductBodyType[]);
    }, [dataTransformer, ordersChartType]);


    return(
        <div className="all_orderd">
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>All Orders</p>

            <select onChange={(e) => setOrdersChartType(e.target.value as AllOrdersChartType)} style={{padding:"10px", borderRadius:"8px"}}>
                <option value="allConfirmedOrders">Confirmed</option>
                <option value="allPendingOrders">Pending</option>
                <option value="allProcessingOrders">Processing</option>
                <option value="allDispatchedOrders">Dispatched</option>
                <option value="allShippedOrders">Shipped</option>
                <option value="allDeliveredOrders">Delivered</option>
                <option value="allCancelledOrders">Cancelled</option>
                <option value="allFailedOrders">Failed</option>
                <option value="allReturnedOrders">Returned</option>
                <option value="allRefundedOrders">Refunded</option>
            </select>

            <Table 
                data={transformedData as { [key: string]: string|string[]; _id: string; }[]}
                list={list}
                setList={setList}
                thead={productTableHeadings}
                hideEditBtn={false}


                onEditClickHandler={(e:MouseEvent<HTMLButtonElement>) => onClickHandler(e)} outStockRes={outStockRes} 
            />
        </div>
    )
}

export default AllOrders;