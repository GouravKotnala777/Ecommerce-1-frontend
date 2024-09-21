import "../../styles/admin/order_charts.scss";
import { useEffect, useRef, useState } from "react";
import { useAllOrdersQuery } from "../../redux/api/api";
import { AllOrdersResponseType } from "../MyOrders";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type CategoryColorType = "protein"|"eaas"|"weight-management"|"pre-workout"|"Performance-Enhancers"|"Vitamins-Minerals"|"hydration"|"Health-Wellness";

interface OrderTypes {
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



const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {month:"short", day:"numeric"}); // Formats like "Sep 20"
};

const aggregateData = (data:OrderTypes[]) => {
    const dataT = data?.flatMap((item) => item.orderItems.map((order) => ({createdAt:item.createdAt, category:order.productID?.category, price:order.productID?.price, count:0})));
    const aggregated:{[agg:string]:{[cate:string]:{price:number; count:number}}} = {};
    
    dataT?.forEach((item) => {
      const date = item.createdAt.toString().split("T")[0];
      const category = item.category as string;
      
      if (!aggregated[date]) {
        aggregated[date] = {};
      }
      
      if (!aggregated[date][category]) {
        aggregated[date][category] = {count:0, price:0};
      }
      
      aggregated[date][category].price += item.price as number;
      aggregated[date][category].count += 1;
    });
  
    return aggregated;
};


const OrderChart = () => {
    const {data}:{
        isLoading:boolean;
        data?:AllOrdersResponseType;
        error?:FetchBaseQueryError | SerializedError;} = useAllOrdersQuery("");

      return(
        <div className="order_chart_bg">
            {/*<pre>{JSON.stringify(arrayOfOrdersCategory, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(data?.message.allFailedOrders, null, `\t`)}</pre>*/}
            {
                data?.message.allPendingOrders.length !== 0&&
                    <BarChart heading="Pending Orders" data={data?.message.allPendingOrders as OrderTypes[]} />
            }
            {
                data?.message.allFailedOrders.length !== 0&&
                    <BarChart heading="Confirmed Orders" data={data?.message.allFailedOrders as OrderTypes[]} />
            }
            {
            data?.message.allProcessingOrders.length !== 0&&
                <BarChart heading="Processing Orders" data={data?.message.allProcessingOrders as OrderTypes[]} />
            }
            {
            data?.message.allDispatchedOrders.length !== 0&&
                <BarChart heading="Dispatched Orders" data={data?.message.allDispatchedOrders as OrderTypes[]} />
            }
            {
            data?.message.allShippedOrders.length !== 0&&
                <BarChart heading="Shipped Orders" data={data?.message.allShippedOrders as OrderTypes[]} />
            }
            {
            data?.message.allDeliveredOrders.length !== 0&&
                <BarChart heading="Delivered Orders" data={data?.message.allDeliveredOrders as OrderTypes[]} />
            }
            {
            data?.message.allCancelledOrders.length !== 0&&
                <BarChart heading="Cancelled Orders" data={data?.message.allCancelledOrders as OrderTypes[]} />
            }
            {
            data?.message.allConfirmedOrders.length !== 0&&
                <BarChart heading="Failed Orders" data={data?.message.allConfirmedOrders as OrderTypes[]} />
            }
            {
            data?.message.allReturnedOrders.length !== 0&&
                <BarChart heading="Returned Orders" data={data?.message.allReturnedOrders as OrderTypes[]} />
            }
            {
            data?.message.allRefundedOrders.length !== 0&&
                <BarChart heading="Refunded Orders" data={data?.message.allRefundedOrders as OrderTypes[]} />
            }

        </div>
    )

};

const BarChart = ({heading, data}:{heading:string; data:OrderTypes[];}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tooltip, setTooltip] = useState<{ x?:number; y?: number; width?: number; height?: number; category?:string; price?:number; count?:number;}|null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            
            const ctx = canvas.getContext("2d");

            if (ctx) {
                
                // Aggregate data by date and category
                const aggregatedData = aggregateData(data as OrderTypes[]);
                
                //console.log({aggregatedData});
                
                // Extract unique dates and categories
                const dates = Object.keys(aggregatedData);

                //console.log({aggregatedData});
                //console.log({dates});
                
                const categories = [...new Set(data?.flatMap(item => item.orderItems.map((order) => order.productID?.category)))];
            
                // Canvas setup
                const canvasWidth = 500;
                const canvasHeight = 300;
                const chartHeight = 200;
                const chartWidth = 400;
                const paddingLeft = 60;
                
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
            
                // Calculate max total price per date for Y-axis scaling
                const maxTotalPrice = Math.max(...dates.map(date => {
                  return Object.values(aggregatedData[date]).reduce((a, b) => a + b.price, 0);
                }));
            
                // Color mapping for categories
                const categoryColors:Record<CategoryColorType, string> = {
                    "protein": "blue",
                    "eaas":"green",
                    "pre-workout": "violet",
                    "weight-management": "indigo",
                    "Health-Wellness":"yellow",
                    "hydration":"orange",
                    "Performance-Enhancers":"red",
                    "Vitamins-Minerals":"pink",
                };
            
                // Clear the canvas
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
                // Draw axes
                ctx.strokeStyle = "#000";
                ctx.beginPath();
                ctx.moveTo(paddingLeft, 20); // Y-axis starts from 20px
                ctx.lineTo(paddingLeft, chartHeight + 20); // Y-axis
                ctx.lineTo(chartWidth + paddingLeft, chartHeight + 20); // X-axis
                ctx.stroke();
            
                // Draw Y-axis labels and grid lines (Total Price)
                const ySteps = 10;
                for (let i = 0; i <= ySteps; i++) {                    
                  const price = (maxTotalPrice / ySteps) * i;
                  const y = chartHeight + 20 - (price / maxTotalPrice) * chartHeight;
                  ctx.fillStyle = "#000";
                  ctx.fillText(`₹${price.toFixed(2)}`, 10, y); // Price labels
                  ctx.strokeStyle = "#e0e0e0";
                  ctx.beginPath();
                  ctx.moveTo(paddingLeft, y);
                  ctx.lineTo(chartWidth + paddingLeft, y);
                  ctx.stroke();
                }
            
                // Draw X-axis labels (Dates)
                dates.forEach((date, index) => {
                  const x = paddingLeft + (index * (chartWidth / dates.length));
                  const y = chartHeight + 40;
                  ctx.fillStyle = "#000";
                  ctx.fillText(formatDate(date), x - 20, y); // Date labels
                });
            
                // Draw stacked bars

                const barPositions:{ x:number; y: number; width: number; height: number; category:string; price:number; count:number;}[] = [{x:0, y:0, height:0, width:0, category:"", price:0, count:0}];
                dates.forEach((date, index) => {
                  let barStartY = chartHeight + 20; // Start from bottom of the chart
                  const x = paddingLeft + (index * (chartWidth / dates.length)) + 10;
                  const barWidth = 30;
            
                  categories.forEach((category) => {
                    const price = aggregatedData[date][category as string]?.price || 0;
                    const count = aggregatedData[date][category as string]?.count || 0;
                    const barHeight = (price / maxTotalPrice) * chartHeight;
                    ctx.fillStyle = categoryColors[category as CategoryColorType];
                    ctx.fillRect(x, barStartY - barHeight, barWidth, barHeight);
                    barPositions.push({ x, y: barStartY - barHeight, width: barWidth, height: barHeight, category:category as string, price, count});
                    barStartY -= barHeight; // Stack next bar on top
                  });
                });

                // Mouse hover event to show tooltip
                const handleMouseMove = (event:MouseEvent) => {
                    const rect = canvas.getBoundingClientRect();
                    const mouseX = event.clientX - rect.left;
                    const mouseY = event.clientY - rect.top;
            
                    // Check if mouse is over any bar
                    const hoveredBar = barPositions.find(bar => {
                    return mouseX >= bar.x && mouseX <= bar.x + bar.width &&
                            mouseY >= bar.y && mouseY <= bar.y + bar.height;
                    });
            
                    if (hoveredBar) {
                        setTooltip({ category: hoveredBar.category, price: hoveredBar.price, count:hoveredBar.count, x: mouseX, y: mouseY });
                    } else {
                        setTooltip(null);
                    }
                };
            
                canvas.addEventListener("mousemove", handleMouseMove);
                return () => {
                    canvas.removeEventListener("mousemove", handleMouseMove);
                };
            }
        
        }
    }, [data]);

    return(
        <div className="scrollable_part">
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>{heading}</div>
            <canvas className="orders_revenue_canvas" ref={canvasRef}></canvas>
            {tooltip && (
                <div style={{
                position: 'absolute',
                left: tooltip.x?tooltip.x+10:0,
                top: tooltip.y?tooltip.y+40:0,
                background: '#fff',
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: '3px',
                pointerEvents: 'none',
                transition:"1s"
                }}>
                    <strong>{tooltip.category}</strong>: ₹{tooltip.price}<br />
                    <strong>Count</strong>: {tooltip.count}
                </div>
            )}
        </div>
    )
}


export default OrderChart;