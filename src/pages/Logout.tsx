import HandleMutationRes from "../components/HandleMutationRes";
import "../styles/pages/logout.scss";
import { useState } from "react";
import { UserLocationTypes } from "./Login.Page";
import { logout, ResponseType } from "../redux/api/api";


const Logout = ({userLocation}:{userLocation:UserLocationTypes}) => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [logoutRes, setLogoutRes] = useState<ResponseType<string|Error>>();

    const logoutHandler = async() => {
        if (confirmation){
            console.log("Logout successfull");
            const res = await logout({action:"logout", userLocation});
            setLogoutRes(res);
            if (res.success === true) {
                window.location.href = "/";
            }
            console.log(res);
        }
        else{
            console.log("Please confirm first");
            setLogoutRes({success:false, message:"Please confirm first"})
        }
    };
    return(
        <div className="logout_bg">
            {/*<pre>
                {JSON.stringify(logoutRes, null, `\t`)}
            </pre>*/}
            <HandleMutationRes res={logoutRes as ResponseType<Error>} />
            <div className="heading">
                Logout
            </div>
            <div className="confirmation">
                <input type="checkbox" onChange={() => setConfirmation(!confirmation)} /> <span>You really want to logout?</span>
            </div>
            <div className="logout_btn">
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
};

export default Logout;