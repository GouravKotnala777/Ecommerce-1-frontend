import "../styles/pages/my_orders.scss";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import Table from "../components/Table";
import { UpdateProductBodyType, useMyOrdersMutation, useRemoveProductFromOrderMutation } from "../redux/api/api";
import ItemNotFound from "../components/ItemNotFound";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Spinner from "../components/Spinner";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { UserLocationTypes } from "./Login.Page";
import { Note } from "./static/Policies";

export interface SingleOrderTypes {
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
}


export interface AllOrdersResponseType {
	success: boolean;
	message:{
        allPendingOrders:SingleOrderTypes[],
        allConfirmedOrders:SingleOrderTypes[],
        allProcessingOrders:SingleOrderTypes[],
        allDispatchedOrders:SingleOrderTypes[],
        allShippedOrders:SingleOrderTypes[],
        allDeliveredOrders:SingleOrderTypes[],
        allCancelledOrders:SingleOrderTypes[],
        allFailedOrders:SingleOrderTypes[],
        allReturnedOrders:SingleOrderTypes[],
        allRefundedOrders:SingleOrderTypes[]
    };
}
export interface MyOrderResponseType {
	success: boolean;
	message:{orders:SingleOrderTypes[]; ordersCount:number;};
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
    {th:"orderStatus", isEditable:false},
    {th:"cancel", isEditable:false},
    {th:"return", isEditable:false}
];

const MyOrders = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const [skip, setSkip] = useState<number>(0);
    const [myOrdersMethod] = useMyOrdersMutation();
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;}>({});
    const [transformedData, setTransformedData] = useState<UpdateProductBodyType[]>([]);
    const [orderNumber, setOrderNumber] = useState<number>(0);
    const [orderID, setOrderID] = useState<string>("");
    const [productID, setProductID] = useState<string>("");
    const [removingProductPrice, setRemovingProductPrice] = useState<number>(0);
    const [removingProductQuantity, setRemovingProductQuantity] = useState<number>(0);
    const [updatedOrderState, setUpdatedOrderState] = useState<"cancelled"|"returned">("cancelled");
    const [ordersCount, setOrdersCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOrderInfoDialogOpen, setIsOrderInfoDialogOpen] = useState<boolean>(false);
    const [isDeleteRowDialog, setIsDeleteRowDialog] = useState<boolean>(false);
    const [orderCancelReason, setOrderCancelReason] = useState<string>("");
    const [myOrdersData, setMyOrdersData] = useState<{
            data?:MyOrderResponseType;
            error?:FetchBaseQueryError | SerializedError;
        }>();
    const [removeProductFromOrder] = useRemoveProductFromOrderMutation();




    const showOrderInfo = (e:MouseEvent<HTMLButtonElement>) => {
        setOrderNumber(Number(e.currentTarget.value));
        setOrderID(e.currentTarget.value.split("-")[0]);
        setProductID(e.currentTarget.value.split("-")[1]);
        setRemovingProductPrice(Number(e.currentTarget.value.split("-")[2]));
        setRemovingProductQuantity(Number(e.currentTarget.value.split("-")[3]));
        setUpdatedOrderState(e.currentTarget.value.split("-")[4] as "cancelled"|"returned");

        console.log({e:e.currentTarget.value});
        console.log({eNum:Number(e.currentTarget.value.split("-")[2])*Number(e.currentTarget.value.split("-")[3])});
        console.log({productID:e.currentTarget.value.split("-")[1], orderID:e.currentTarget.value.split("-")[0]});
        
        //setTransformedData([
        //    ...transformedData.filter((item) => {
        //        if (item._id === e.currentTarget.value.split("-")[1]&&item.orderID === e.currentTarget.value.split("-")[0]) {
        //            return item;
        //        }
        //        else{
        //            return item;
        //        }  
        //    })
        //]);
    }

    const dataTransformer = (myOrders:{
        data?:MyOrderResponseType;
        error?:FetchBaseQueryError | SerializedError;
    }) => {
        myOrders?.data?.message.orders.flatMap((item) => {
            const vv = item?.paymentInfo;
            item.orderItems?.map((item2) => {

                setTransformedData((prev) => [...prev, {
                    _id: item2?.productID?._id as string,
                    orderID:item._id,
                    name: item2?.productID?.name as string,
                    price: item2?.productID?.price,
                    quantity:item2?.quantity,
                    images: item2?.productID?.images,
                    orderStatus:item.orderStatus,
                    createdAt: item.createdAt,
                    ...vv,
                }]);
            });
        });
    };

    const fetchFirstTime = async() => {
        setIsLoading(true);
        try {
            const myOrders:{
                    data?:MyOrderResponseType;
                    error?:FetchBaseQueryError | SerializedError;
                } = await myOrdersMethod({skip});

            
            console.log("--------- fetchFirstTime MyOrders");
            console.log(myOrders.data?.message.orders);
            console.log({ordersCount, skip});


            setMyOrdersData(myOrders);            
            
            if (myOrders.data?.message.orders !== undefined) {
                dataTransformer(myOrders);
                setOrdersCount(myOrders.data.message.ordersCount);
                setSkip(skip+(myOrders.data.message.orders.length as number));
            }
            //setJointData(myOrders.data.message.orders);
            //dataTransformer(myOrders.data.message.orders);
            console.log("--------- fetchFirstTime MyOrders");
            setIsLoading(false);
        } catch (error) {
            console.log("--------- fetchFirstTime MyOrders");
            console.log(error);
            console.log("--------- fetchFirstTime MyOrders");
            setIsLoading(false);
        }
    }

    const removeProductFromOrderHandler = async() => {
        setIsLoading(true);
        try {
            const res = await removeProductFromOrder({orderID, productID, removingProductPrice:(Number(removingProductPrice)), removingProductQuantity:Number(removingProductQuantity), updatedOrderState, action:"remove_product_from_order", userLocation, orderCancelReason});

            console.log("---------  removeProductFromOrder MyOrders");
            console.log(res.data.message);
            console.log("---------  removeProductFromOrder MyOrders");
            setIsLoading(false);
            setIsDeleteRowDialog(false);
            setTransformedData((prev) => [
                ...prev.map((item) => {
                    if (item._id === productID&&item.orderID === orderID) {
                        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
                        console.log({"item._id":item._id, productID, "item.orderID":item.orderID, orderID});
                        
                        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
                        
                        return res.data.message;
                    }
                    else{
                        return item;
                    }  
                })
            ]);

            
        } catch (error) {
            console.log("---------  removeProductFromOrder MyOrders error");
            console.log(error);
            console.log("---------  removeProductFromOrder MyOrders error");
            setIsLoading(false);
        }
    };

    //const gg = () => {
    //    setTransformedData((prev) => [...prev.filter((item) => item._id === productID&&item.orderID === orderID)]);
    //}

    useEffect(() => {
        if (skip !== undefined) {
            fetchFirstTime();
        }
    }, []);

    return(
        <div className="my_orders_bg">
            {/*<pre>{JSON.stringify(jointData, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(transformedData, null, `\t`)}</pre>*/}
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Orders</div>
                {
                    myOrdersData === undefined ?
                        <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                        :
                        myOrdersData?.error ?
                            myOrdersData.error &&
                            "data" in myOrdersData.error &&
                            myOrdersData.error.data &&
                            typeof myOrdersData.error.data === "object" &&
                            "message" in myOrdersData.error.data ?
                                <ItemNotFound heading={myOrdersData.error.data.message as string} statusCode={204} />
                                :
                                <h1>Hello Guys</h1>
                            :
                            !myOrdersData.data?.success ?
                                <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />
                                :
                                <>
                                    <Table data={transformedData as { [key: string]: string|string[]; _id: string; }[]}
                                        list={list}
                                        setList={setList}
                                        thead={productTableHeadings}
                                        hideEditBtn={true}
                                        //hideImg={false}

                                        DialogElement={<SingleOrderInfo userLocation={userLocation} parent="orders" orderID={transformedData?.[orderNumber]?._id} name={transformedData?.[orderNumber]?.name as string} price={Number(transformedData?.[orderNumber]?.price)} quantity={1} rating={Number(transformedData?.[orderNumber]?.rating)} description="aaaaaa" photo={transformedData[orderNumber]?.images?.[0] as string} transactionId={transformedData?.[orderNumber]?.transactionId as string} shippingType={transformedData?.[orderNumber]?.shippingType as string} paymentStatus={transformedData?.[orderNumber]?.paymentStatus as string} orderStatus={transformedData?.[orderNumber]?.orderStatus as string} message={transformedData?.[orderNumber]?.message as string} createdAt={transformedData?.[orderNumber]?.createdAt?.toString()} />}
                                        dialogShowInfo={(e:MouseEvent<HTMLButtonElement>) => showOrderInfo(e)}
                                        isOrderInfoDialogOpen={isOrderInfoDialogOpen as boolean}
                                        setIsOrderInfoDialogOpen={setIsOrderInfoDialogOpen as Dispatch<SetStateAction<boolean>>}

                                        DeleteRowDialog={<DeleteRowWarning orderID={orderID} productID={productID} removeProductFromOrderHandler={removeProductFromOrderHandler} setIsDeleteRowDialog={setIsDeleteRowDialog} setOrderCancelReason={setOrderCancelReason} isLoading={isLoading} />}
                                        isDeleteRowDialogOpen={isDeleteRowDialog}
                                        setIsDeleteRowDialogOpen={setIsDeleteRowDialog}
                                    />

                                    <span>Isse Thik Karna hai</span>
                                    {
                                        isLoading ?
                                        <Spinner type={1} heading="Loading..." width={30} thickness={1} />
                                        :
                                        ordersCount > skip &&
                                            <button className="show_more_btn" onClick={() => fetchFirstTime()}>Next : {skip} / {ordersCount}</button>
                                    }
                                </>
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

export const DeleteRowWarning = ({orderID, productID, removeProductFromOrderHandler, setIsDeleteRowDialog, setOrderCancelReason, isLoading}:{orderID:string; productID:string; removeProductFromOrderHandler:() => Promise<void>; setIsDeleteRowDialog:Dispatch<SetStateAction<boolean>>; setOrderCancelReason:Dispatch<SetStateAction<string>>; isLoading:boolean;}) => {

    return(
        <div className="delete_row_warning_cont" onClick={(e) => e.stopPropagation()}>
            <div className="scrollable_part">
                <h1 className="heading">Hay Wait!!</h1>
                <p className="para">Are you sure , you want to cancel this order?</p>
                <p className="para">Order Id : {orderID}</p>
                <p className="para">Product Id : {productID}</p>
                <textarea className="cancellation_reason" rows={10} placeholder="Why do you want to cancel this order?" onChange={(e) => setOrderCancelReason(e.target.value)}></textarea>
                <Note heading="Notice" para="Your request will be solved in 24hours" />
                <div className="buttons">
                    <button className="ok_btn" onClick={removeProductFromOrderHandler}>{isLoading ? <Spinner type={2} width={20} thickness={2} color="white" /> : "Yes, Cancel this order"}</button>
                    <button className="declien_btn" onClick={() => setIsDeleteRowDialog(false)}>No, go back</button>
                </div>
            </div>
        </div>
    )
};

export default MyOrders;