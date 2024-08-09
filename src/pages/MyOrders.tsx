import { useState } from "react";
import Table from "../components/Table";
import { UpdateProductBodyType, useMyOrdersQuery } from "../redux/api/api";
import ItemNotFound from "../components/ItemNotFound";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Aa {
	success: boolean;
	message: [
		{
			paymentInfo?: {
				transactionId:string;
				status:string;
				shippingType:string;
				message:string;
			},
			_id:string;
			userID:string;
			orderItems: [
				{
					productID?: {
						_id:string;
						name?:string;
						price?:number;
                        images?:string[];
					},
					quantity:number;
					_id:string;
				}
			],
			totalPrice:number;
		}
	]
}


const productTableHeadings = [
    {th:"Name", isEditable:false},
    {th:"Price", isEditable:false},
    {th:"transactionId", isEditable:false},
    {th:"status", isEditable:false},
    {th:"message", isEditable:false},
];

const MyOrders = () => {
    const myOrders:{
        isLoading:boolean;
        data?:Aa;
        error?:FetchBaseQueryError | SerializedError;
    } = useMyOrdersQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateProductBodyType;}>({});

    const dataTransformer:() => UpdateProductBodyType[]|undefined = () => {
        return myOrders.data?.message.flatMap((item) => {
            const vv = item?.paymentInfo;
            return item.orderItems.map((item2) => {
                return {_id:item2?.productID?._id, name:item2?.productID?.name, price:item2?.productID?.price, images:(item2?.productID?.images as string[])[0], ...vv}
            })
        });
    }
    const dataTransformers = dataTransformer()

    return(
        <div className="my_orders_bg">
            {
                myOrders.isLoading ?
                    <h1>Loading...</h1>
                    :
                    myOrders.error &&
                    "data" in myOrders.error &&
                    myOrders.error.data &&
                    typeof myOrders.error.data === "object" &&
                    "message" in myOrders.error.data ?
                        <ItemNotFound heading={myOrders.error?.data.message as string} statusCode={myOrders.error.status as number} />
                        :
                        myOrders.data?.success ?
                            <Table data={dataTransformers as { [key: string]: string|string[]; _id: string; }[]} list={list} setList={setList} thead={productTableHeadings} hideEditBtn={false} />
                            :
                            <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />

            }
        </div>
    )
};

export default MyOrders;