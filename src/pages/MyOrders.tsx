import { useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import { UpdateProductBodyType, useMyOrdersQuery } from "../redux/api/api";
import ItemNotFound from "../components/ItemNotFound";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Spinner from "../components/Spinner";

export interface OrderResponseType {
	success: boolean;
	message:{
        paymentInfo?: {
            transactionId:string;
            status:string;
            shippingType:string;
            message:string;
        },
        _id:string;
        userID:string;
        orderItems:{
                productID?: {
                    _id:string;
                    name?:string;
                    price?:number;
                    images?:string[];
                },
                quantity:number;
                _id:string;
        }[];
        totalPrice:number;
        createdAt:Date;
	}[];
}


const productTableHeadings = [
    {th:"Name", isEditable:false},
    {th:"Price", isEditable:false},
    {th:"transactionId", isEditable:false},
    {th:"status", isEditable:false},
    //{th:"message", isEditable:false},
    //{th:"shippingType", isEditable:false},
];

const MyOrders = () => {
    const myOrders:{
        isLoading:boolean;
        data?:OrderResponseType;
        error?:FetchBaseQueryError | SerializedError;
    } = useMyOrdersQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;}>({});
    const [transformedData, setTransformedData] = useState<UpdateProductBodyType[]>([]);
    

    const dataTransformer = useCallback((): UpdateProductBodyType[] | undefined => {
        return myOrders.data?.message.flatMap((item) => {
            const vv = item?.paymentInfo;
            return item.orderItems.map((item2) => {
                return {
                    _id: item2?.productID?._id,
                    name: item2?.productID?.name,
                    price: item2?.productID?.price,
                    images: (item2?.productID?.images as string[])[0],
                    createdAt: item.createdAt,
                    ...vv,
                };
            });
        });
    }, [myOrders.data]);

    useEffect(() => {
        setTransformedData(dataTransformer() as UpdateProductBodyType[])
    }, [dataTransformer]);

    return(
        <div className="my_orders_bg">
            {/*<pre>{JSON.stringify(transformedData, null, `\t`)}</pre>*/}
            <div className="heading" style={{padding:"4px 4px", fontWeight:"bold"}}>My Orders</div>

            {
                myOrders.isLoading ?
                <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                    :
                    myOrders.error &&
                    "data" in myOrders.error &&
                    myOrders.error.data &&
                    typeof myOrders.error.data === "object" &&
                    "message" in myOrders.error.data ?
                        <ItemNotFound heading={myOrders.error?.data.message as string} statusCode={myOrders.error.status as number} />
                        :
                        myOrders.data?.message ?
                            myOrders.data?.message.length === 0 ?
                                <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />
                                :
                                <Table data={transformedData as { [key: string]: string|string[]; _id: string; }[]} list={list} setList={setList} thead={productTableHeadings} hideEditBtn={true} />
                            :
                            <ItemNotFound heading={"No Internet Connection!"} statusCode={523} />

            }
        </div>
    )
};

export default MyOrders;