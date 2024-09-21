import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import Table from "../components/Table";
import { UpdateProductBodyType, useMyOrdersQuery } from "../redux/api/api";
import ItemNotFound from "../components/ItemNotFound";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Spinner from "../components/Spinner";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { UserLocationTypes } from "./Login.Page";

export interface OrderResponseType {
	success: boolean;
	message:{
        paymentInfo?: {
            transactionId:string;
            paymentStatus:string;
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
                    category?:string;
                },
                quantity:number;
                _id:string;
        }[];
        orderStatus:"pending"|"confirmed"|"processing"|"shipped"|"dispatched"|"delivered"|"cancelled"|"failed"|"returned"|"refunded";
        totalPrice:number;
        createdAt:Date;
	}[];
}
export interface SingleOrderInfoTypes{
    productID?:string;
    category?:string;
    name?:string;
    price?:number;
    quantity?:number;
    rating?:number;
    description?:string;
    photo:string;
    parent:string;

    orderID?:string;
    transactionId?:string;
    shippingType:string;
    paymentStatus?:string;
    orderStatus?:string;
    message?:string;
    createdAt?:string;

    userLocation:UserLocationTypes;
}


const productTableHeadings = [
    {th:"name", isEditable:false},
    {th:"price", isEditable:false},
    {th:"transactionId", isEditable:false},
    {th:"status", isEditable:false}
];

const MyOrders = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const myOrders:{
        isLoading:boolean;
        data?:OrderResponseType;
        error?:FetchBaseQueryError | SerializedError;
    } = useMyOrdersQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;}>({});
    const [transformedData, setTransformedData] = useState<UpdateProductBodyType[]>([]);
    const [orderNumber, setOrderNumber] = useState<number>(0);
    const [isOrderInfoDialogOpen, setIsOrderInfoDialogOpen] = useState<boolean>(false);


    const showOrderInfo = (e:MouseEvent<HTMLButtonElement>) => {
        setOrderNumber(Number(e.currentTarget.value));
        setIsOrderInfoDialogOpen(true);
    }
    

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
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Orders</div>

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
                                <Table data={transformedData as { [key: string]: string|string[]; _id: string; }[]}
                                    list={list}
                                    setList={setList}
                                    thead={productTableHeadings}
                                    hideEditBtn={true}

                                    DialogElement={<SingleOrderInfo userLocation={userLocation} parent="orders" orderID={transformedData?.[orderNumber]._id} name={transformedData?.[orderNumber].name as string} price={Number(transformedData?.[orderNumber].price)} quantity={1} rating={Number(transformedData?.[orderNumber].price)} description="aaaaaa" photo={""} transactionId={transformedData?.[orderNumber].transactionId as string} shippingType={transformedData?.[orderNumber].shippingType as string} paymentStatus={transformedData?.[orderNumber].paymentStatus as string} orderStatus={transformedData?.[orderNumber].orderStatus as string} message={transformedData?.[orderNumber].message as string} createdAt={transformedData?.[orderNumber]?.createdAt?.toString()} />}
                                    dialogShowInfo={(e:MouseEvent<HTMLButtonElement>) => showOrderInfo(e)}
                                    isOrderInfoDialogOpen={isOrderInfoDialogOpen as boolean}
                                    setIsOrderInfoDialogOpen={setIsOrderInfoDialogOpen as Dispatch<SetStateAction<boolean>>}
                                />
                            :
                            <ItemNotFound heading={"No Internet Connection!"} statusCode={523} />

            }
        </div>
    )
};

export const SingleOrderInfo = ({userLocation, parent, name, price, quantity, rating, orderID, description, photo, transactionId, shippingType, paymentStatus, orderStatus, message, createdAt}:SingleOrderInfoTypes) => {

    return(
        <div className="single_order_cont" onClick={(e) => e.stopPropagation()}>
            <div className="single_order_scrollable">
                <SingleProductTemplate userLocation={userLocation} parent={parent} name={name} price={price} quantity={quantity} rating={rating} productID={orderID} description={description} photo={photo} transactionId={transactionId} shippingType={shippingType} paymentStatus={paymentStatus} orderStatus={orderStatus} message={message} createdAt={createdAt} />
            </div>
        </div>
    )
}

export default MyOrders;