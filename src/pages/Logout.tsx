import { MutationResTypes } from "../assets/demoData";
import HandleMutationRes from "../components/HandleMutationRes";
import { useLogoutMutation } from "../redux/api/api";
import "../styles/pages/logout.scss";
import { useState } from "react";


const Logout = () => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [logout] = useLogoutMutation();
    const [logoutRes, setLogoutRes] = useState<MutationResTypes>();

    const logoutHandler = async() => {
        if (confirmation){
            console.log("Logout successfull");
            const res = await logout({});
            setLogoutRes(res);
        }
        else{
            console.log("Please confirm first");
        }
    };
    return(
        <div className="logout_bg">
            <HandleMutationRes res={logoutRes} />
            <div className="heading">
                Logout
            </div>
            <div className="confirmation">
                <input type="checkbox" onChange={() => setConfirmation(!confirmation)} /> <span>You really want to logout?</span>
            </div>
            <div className="logout_btn">
                <button disabled={!confirmation} onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
};

export default Logout;