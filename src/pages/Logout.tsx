import { MutationResTypes } from "../assets/demoData";
import HandleMutationRes from "../components/HandleMutationRes";
import { useLogoutMutation } from "../redux/api/api";
import "../styles/pages/logout.scss";
import { useState } from "react";


const Logout = () => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [logout] = useLogoutMutation();
    const [logoutRes, setLogoutRes] = useState<MutationResTypes|{error:{data:{message:string}}}>();

    const logoutHandler = async() => {
        if (confirmation){
            console.log("Logout successfull");
            const res = await logout({});
            setLogoutRes(res);
            if (res.data) {
                window.location.href = "/";
            }
            console.log(res);
        }
        else{
            console.log("Please confirm first");
            setLogoutRes({error:{data:{message:"Please confirm first"}}})
        }
    };
    return(
        <div className="logout_bg">
            <pre>
                {JSON.stringify(logoutRes, null, `\t`)}
            </pre>
            <HandleMutationRes res={logoutRes as {error:{data:{message:string}}}} />
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