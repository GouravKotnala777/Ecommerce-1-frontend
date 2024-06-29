import "../styles/pages/logout.scss";
import { useState } from "react";


const Logout = () => {
    const [confirmation, setConfirmation] = useState<boolean>(false);

    const logoutHandler = () => {
        if (confirmation){
            console.log("Logout successfull");
        }
        else{
            console.log("Please confirm first");
        }

    };
    return(
        <div className="logout_bg">
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