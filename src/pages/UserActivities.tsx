import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { useGetAllUsersActivitiesMutation } from "../redux/api/api";
import Table from "../components/Table";
import { UserLocationTypes } from "./Login.Page";
import Spinner from "../components/Spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import ItemNotFound from "../components/ItemNotFound";

export interface UserActivitiesTypes {
    userID: string;
    action: string; // e.g., "signin", "logout", "register", "password_change"
    ipAddress: string;
    userAgent: string;
    userLocation: UserLocationTypes; // e.g., user's physical location based on IP
    platform: string; // e.g., 'web', 'mobile', 'desktop'
    device: string; // e.g., 'iPhone', 'Android', 'Windows', etc.
    referrer: string; // Source from where the user accessed (e.g., Google, Direct)
    status:"pending"|"succeeded"|"failed";
    message:string;
    errorDetails: string; // Store any error details if the action failed
    timestamp: Date;
}
export interface UpdateActivityBodyType {
    userID?: string;
    action?: string;
    ipAddress?: string;
    userAgent?: string;
    userLocation?: UserLocationTypes;
    platform?: string;
    device?: string;
    referrer?: string;
    status?:"pending"|"succeeded"|"failed";
    message?:string;
    errorDetails?: string;
    timestamp?: Date;
}

const activitiesTableHeadings = [
    //{th:"_id", isEditable:false},
    {th:"userID", isEditable:false},
    {th:"action", isEditable:false},
    {th:"referrer", isEditable:false},
    {th:"platform", isEditable:false},
    {th:"device", isEditable:false}
];

const UserActivities = () => {
    const [skip, setSkip] = useState<number>(0);
    const [allActivities] = useGetAllUsersActivitiesMutation();
    //const outStockData:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useOutStockProductsQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateActivityBodyType;
    }>({});
    const [orderNumber, setOrderNumber] = useState<number>(0);
    const [isRowInfoDialogOpen, setIsRowInfoDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<unknown>({});
    const [allActivitiesJoint, setAllActivitiesJoint] = useState<UserActivitiesTypes[]>([]);
    const [activityCount, setActivityCount] = useState<number>(0);

    const showRowInfo = (e:MouseEvent<HTMLButtonElement>) => {
        setOrderNumber(Number(e.currentTarget.value));
        setIsRowInfoDialogOpen(true);
    }

    const fetchActivities = async() => {
        setIsLoading(true);
        try {
            const res:{
                data?:{success:boolean; message:{activity:(UserActivitiesTypes&{_id:string; [key:string]:string})[]; activityCount:number;}};
                error?:FetchBaseQueryError | SerializedError;
            } = await allActivities({skip});

            console.log("-------- fetchActivities UserActivities");
            console.log(res);

            if (res.data?.message.activity.length !== 0) {
                setAllActivitiesJoint((prev) => [...prev, ...res.data?.message.activity as UserActivitiesTypes[]]);
                setActivityCount(res.data?.message.activityCount as number);
            }
            if (res.error) {
                setIsError(res.error);
            }
            console.log("-------- fetchActivities UserActivities");
            setIsLoading(false);
        } catch (error) {
            console.log("-------- fetchActivities UserActivities error");
            console.log(error);
            console.log("-------- fetchActivities UserActivities error");
            setIsLoading(false);
        }
    };




    useEffect(() => {
        fetchActivities();
    }, [skip]);

    return(
        <div className="user_activities bg">
            {/*<pre>{JSON.stringify(allActivities.data?.message, null, `\t`)}</pre>*/}
            <div className="heading" style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>My Activities</div>


            {
                    allActivitiesJoint === undefined ?
                        <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                        :
                        isError &&
                            typeof isError === "object" &&
                            "data" in isError &&
                            isError.data &&
                            typeof isError.data === "object" &&
                            "message" in isError.data ?
                                <ItemNotFound heading={isError.data.message as string} statusCode={204} />
                                :
                            //    <pre>{JSON.stringify(isError, null, `\t`)}</pre>
                            //:
                                allActivitiesJoint.length === 0 ?
                                    <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />
                                    :
                                    <>
                                        <Table<(UserActivitiesTypes & {_id: string; [key: string]: string;})>
                                            thead={activitiesTableHeadings}
                                            data={allActivitiesJoint as (UserActivitiesTypes&{_id:string; [key:string]:string})[]}
                                            list={list} setList={setList}
                                            hideEditBtn={true}
                                            hideImg={true}
                                            DialogElement={<SingleActivityInfo 
                                                                userID={allActivitiesJoint[orderNumber]?.userID as string}
                                                                action={allActivitiesJoint[orderNumber]?.action as string}
                                                                device={allActivitiesJoint[orderNumber]?.device as string}
                                                                ipAddress={allActivitiesJoint[orderNumber]?.ipAddress as string}
                                                                errorDetails={allActivitiesJoint[orderNumber]?.errorDetails as string}
                                                                platform={allActivitiesJoint[orderNumber]?.platform as string}
                                                                referrer={allActivitiesJoint[orderNumber]?.referrer as string}
                                                                status={allActivitiesJoint[orderNumber]?.status as "pending"|"succeeded"|"failed"}
                                                                message={allActivitiesJoint[orderNumber]?.message as string}
                                                                timestamp={allActivitiesJoint[orderNumber]?.timestamp as Date}
                                                                userAgent={allActivitiesJoint[orderNumber]?.userAgent as string}
                                                                userLocation={{city:allActivitiesJoint[orderNumber]?.userLocation.city as string,
                                                                    country:allActivitiesJoint[orderNumber]?.userLocation.country as string,
                                                                    ip:allActivitiesJoint[orderNumber]?.userLocation.ip as string,
                                                                    loc:allActivitiesJoint[orderNumber]?.userLocation.loc as string,
                                                                    org:allActivitiesJoint[orderNumber]?.userLocation.org as string,
                                                                    postal:allActivitiesJoint[orderNumber]?.userLocation.postal as string,
                                                                    readme:allActivitiesJoint[orderNumber]?.userLocation.readme as string,
                                                                    region:allActivitiesJoint[orderNumber]?.userLocation.region as string,
                                                                    timezone:allActivitiesJoint[orderNumber]?.userLocation.timezone as string
                                                                }} />}
                                            dialogShowInfo={(e:MouseEvent<HTMLButtonElement>) => showRowInfo(e)}
                                            isOrderInfoDialogOpen={isRowInfoDialogOpen as boolean}
                                            setIsOrderInfoDialogOpen={setIsRowInfoDialogOpen as Dispatch<SetStateAction<boolean>>}
                                        />
                                        {
                                            isLoading ?
                                            <Spinner type={1} heading="Loading..." width={30} thickness={1} />
                                            :
                                            activityCount > skip+1 &&
                                                <button className="show_more_btn" onClick={() => setSkip(skip+1)}>Next : {skip} / {activityCount}</button>
                                        }
                                    </>
            }

        </div>
    )
};


export const SingleActivityInfo = ({userID, action, device, ipAddress,errorDetails,platform,referrer,status,message,timestamp,userAgent,userLocation}:UserActivitiesTypes) => {

    return(
        <div className="single_activity_cont" onClick={(e) => e.stopPropagation()}>
            <div className="single_activity_scrollable">
                <div className="headings_values">
                    <span className="single_activity_heading">UserID</span><span className="single_activity_value">{userID}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Action</span><span className="single_activity_value">{action}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Device</span><span className="single_activity_value">{device}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">IP Address</span><span className="single_activity_value">{ipAddress}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Error Detailes</span><span className="single_activity_value">{errorDetails}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Platform</span><span className="single_activity_value">{platform}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Referrer</span><span className="single_activity_value">{referrer}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Status</span><span className="single_activity_value">{status}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Message</span><span className="single_activity_value">{message}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Time Stamp</span><span className="single_activity_value">{timestamp?.toString()}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">User Agent</span><span className="single_activity_value">{userAgent}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">City</span><span className="single_activity_value">{userLocation.city}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Country</span><span className="single_activity_value">{userLocation.country}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">IP</span><span className="single_activity_value">{userLocation.ip}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Loc</span><span className="single_activity_value">{userLocation.loc}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Org.</span><span className="single_activity_value">{userLocation.org}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Postal</span><span className="single_activity_value">{userLocation.postal}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Readme</span><span className="single_activity_value">{userLocation.readme}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Region</span><span className="single_activity_value">{userLocation.region}</span>
                </div>
                <div className="headings_values">
                    <span className="single_activity_heading">Time Zone</span><span className="single_activity_value">{userLocation.timezone}</span>
                </div>
            </div>
        </div>
    )
}

export default UserActivities;