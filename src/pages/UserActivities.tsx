import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { useGetAllUsersActivitiesQuery } from "../redux/api/api";
import Table from "../components/Table";
import { UserLocationTypes } from "./Login.Page";

export interface UserActivitiesTypes {
    userID: string;
    action: string; // e.g., "signin", "logout", "register", "password_change"
    ipAddress: string;
    userAgent: string;
    userLocation: UserLocationTypes; // e.g., user's physical location based on IP
    platform: string; // e.g., 'web', 'mobile', 'desktop'
    device: string; // e.g., 'iPhone', 'Android', 'Windows', etc.
    referrer: string; // Source from where the user accessed (e.g., Google, Direct)
    success: boolean; // Indicate if the action was successful or not
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
    success?: boolean;
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
    const allActivities:{data?:{success:boolean; message:(UserActivitiesTypes&{_id:string; [key:string]:string})[]}} = useGetAllUsersActivitiesQuery("");
    //const outStockData:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}} = useOutStockProductsQuery("");
    const [list, setList] = useState<{ [key: string]:UpdateActivityBodyType;
    }>({});
    const [orderNumber, setOrderNumber] = useState<number>(0);
    const [isRowInfoDialogOpen, setIsRowInfoDialogOpen] = useState<boolean>(false);

    const showRowInfo = (e:MouseEvent<HTMLButtonElement>) => {
        setOrderNumber(Number(e.currentTarget.value));
        setIsRowInfoDialogOpen(true);
    }




    useEffect(() => {
        
    }, []);

    return(
        <div className="user_activities bg">
            {/*<pre>{JSON.stringify(allActivities.data?.message, null, `\t`)}</pre>*/}
            <p style={{margin:"0 auto", textAlign:"center"}}>User Activities</p>
            <Table<(UserActivitiesTypes & {_id: string; [key: string]: string;})>
                thead={activitiesTableHeadings}
                data={allActivities.data?.message}
                list={list} setList={setList}
                hideEditBtn={true}
                hideImg={true}


                DialogElement={<SingleActivityInfo 
                                    userID={allActivities.data?.message[orderNumber].userID as string}
                                    action={allActivities.data?.message[orderNumber].action as string}
                                    device={allActivities.data?.message[orderNumber].device as string}
                                    ipAddress={allActivities.data?.message[orderNumber].ipAddress as string}
                                    errorDetails={allActivities.data?.message[orderNumber].errorDetails as string}
                                    platform={allActivities.data?.message[orderNumber].platform as string}
                                    referrer={allActivities.data?.message[orderNumber].referrer as string}
                                    success={true} timestamp={allActivities.data?.message[orderNumber].timestamp as Date}
                                    userAgent={allActivities.data?.message[orderNumber].userAgent as string}
                                    userLocation={{city:allActivities.data?.message[orderNumber].userLocation.city as string,
                                        country:allActivities.data?.message[orderNumber].userLocation.country as string,
                                        ip:allActivities.data?.message[orderNumber].userLocation.ip as string,
                                        loc:allActivities.data?.message[orderNumber].userLocation.loc as string,
                                        org:allActivities.data?.message[orderNumber].userLocation.org as string,
                                        postal:allActivities.data?.message[orderNumber].userLocation.postal as string,
                                        readme:allActivities.data?.message[orderNumber].userLocation.readme as string,
                                        region:allActivities.data?.message[orderNumber].userLocation.region as string,
                                        timezone:allActivities.data?.message[orderNumber].userLocation.timezone as string
                                    }} />}
                dialogShowInfo={(e:MouseEvent<HTMLButtonElement>) => showRowInfo(e)}
                isOrderInfoDialogOpen={isRowInfoDialogOpen as boolean}
                setIsOrderInfoDialogOpen={setIsRowInfoDialogOpen as Dispatch<SetStateAction<boolean>>}
            />
        </div>
    )
};


export const SingleActivityInfo = ({userID, action, device, ipAddress,errorDetails,platform,referrer,success,timestamp,userAgent,userLocation}:UserActivitiesTypes) => {

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
                    <span className="single_activity_heading">Success</span><span className="single_activity_value">{success.toString()}</span>
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