import { useNavigate, useSearchParams } from "react-router-dom";
import { ResponseType, verifyEmail } from "../redux/api/api";
import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { UserLocationTypes } from "./Login.Page";
import { UserTypes } from "../assets/demoData";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verifyEmailRes, setVerifyEmailRes] = useState<ResponseType<UserTypes|Error>>();
    const [newPassword, setNewPassword] = useState<string>("");
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const emailtype = searchParams.get('emailtype');
    const referrerUserID = searchParams.get('referrerUserID');



    const getUserLocationData = async() => {
        try {
            const resIP = await fetch(`https://ipinfo.io/json`, {
                method:"GET"
            });
    
            if (resIP.ok) {
              const dataIP:UserLocationTypes = await resIP.json();
              console.log("--------- Home.Page.tsx  getUserLocationData Ok");
              console.log(dataIP);
              console.log("--------- Home.Page.tsx  getUserLocationData Ok");
              return dataIP;
            }
            else{
              console.log("--------- Home.Page.tsx  getUserLocationData NotOk");
              return null;
            }
    
        } catch (error) {
            console.log("--------- Home.Page.tsx  getUserLocationData error");
            console.log(error);
            console.log("--------- Home.Page.tsx  getUserLocationData error");
            return null;
        }
    };




    const verifyEmailHandler = async() => {
        const userLocation = await getUserLocationData();

        console.log("----- from VerifyEmail verify");
        console.log({userLocation});
        console.log("----- from VerifyEmail verify");

        if (emailtype === "VERIFY") {
            try {
                const res = await verifyEmail({verificationToken:token as string, emailType:emailtype as string, action:"verify_email", userLocation:userLocation as UserLocationTypes,  referrerUserID});
                console.log("------ VerifyEmail.tsx  verifyEmailHandler");
                console.log(res);
                setVerifyEmailRes(res);
                if (res.success === false) {
                    const error = res.message as unknown;
                    toast.error(error as string, {
                        position:"bottom-center",
                        duration:2000
                    });
                }
                else if (res.success === true) {
                    toast.success("Verification successful", {
                        position:"bottom-center",
                        duration:2000
                    });
        
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                }
                console.log("------ VerifyEmail.tsx  verifyEmailHandler");
            } catch (error) {
                console.log("------ VerifyEmail.tsx  verifyEmailHandler");
                console.log(error);
                console.log("------ VerifyEmail.tsx  verifyEmailHandler");
            }
        }
    };

    const updatePasswordHandler = async() => {
        if (emailtype === "RESET_PASSWORD" && newPassword) {
            console.log({newPassword});
            const userLocation = await getUserLocationData();

            console.log("----- from VerifyEmail resetPassword");
            console.log({userLocation});
            console.log("----- from VerifyEmail resetPassword");
            try {
                const res = await verifyEmail({verificationToken:token as string, emailType:emailtype as string, newPassword, action:"verify_email", userLocation:userLocation as UserLocationTypes});
                console.log("------ VerifyEmail.tsx  updatePasswordHandler");
                console.log(res);
                setVerifyEmailRes(res);
                if (res.success === false) {
                    const error = res.message as Error;
                    toast.error(error.message as string, {
                        position:"bottom-center",
                        duration:2000
                    });
                }
                else if (res.success === true) {
                    toast.success("Password updated", {
                        position:"bottom-center",
                        duration:2000
                    });
        
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                }
                console.log("------ VerifyEmail.tsx  updatePasswordHandler");
            } catch (error) {
                console.log("------ VerifyEmail.tsx  updatePasswordHandler");
                console.log(error);
                console.log("------ VerifyEmail.tsx  updatePasswordHandler");
            }
        }
    };

    useEffect(() => {
        if (token && emailtype) {
            verifyEmailHandler();
        }
    }, []);
    return(
        <div className="verify_email" style={{width:"60%", margin:"20px auto", padding:"20px", borderRadius:"8px", textAlign:"center", boxShadow:"0.1px 0.1px 4px 0.5px #ff4b69"}}>
            <Toaster />
            <h1>referedUserID : {referrerUserID}</h1>
            <div className="heading" style={{textAlign:"center", fontWeight:"bold", margin:"10px auto"}}>{emailtype === "VERIFY" ? "Verify Email" : "Reset Password"}</div>
            {
                emailtype === "RESET_PASSWORD" &&
                    <>
                        <input type="text" name="newPassword" placeholder="Email" style={{padding:"5px 10px"}} onChange={(e) => setNewPassword(e.target.value)} />
                        <button style={{background:"#3182ce", margin:"0 10px", padding:"5px 10px", border:"none", color:"white", cursor:"pointer"}} onClick={() => updatePasswordHandler()}>Update Password</button>
                    </>
            }
            {
                verifyEmailRes?.success === false ?
                <>
                    <h1 style={{color:"#ff4b69"}}>{verifyEmailRes.success}</h1>
                    <p style={{color:"#919191", fontSize:"0.8rem"}}>{JSON.stringify(verifyEmailRes.message) as string}</p>
                </>
                :
                <>
                    <h1 style={{color:"#ff4b69"}}>200</h1>
                    <p style={{color:"#919191", fontSize:"0.8rem"}}>{verifyEmailRes?.message.name}</p>
                </>
            }
            {/*<pre>{JSON.stringify(verifyEmailRes?.error.data.message, null, `\t`)}</pre>*/}
            {/*<p>{verifyEmailRes?.error && }</p>*/}
        </div>
    )
}

export default VerifyEmail;