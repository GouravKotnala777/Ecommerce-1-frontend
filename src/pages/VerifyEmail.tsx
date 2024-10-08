import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/api/api";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast, {Toaster} from "react-hot-toast";
import { MutationResTypes } from "../assets/demoData";
import { UserLocationTypes } from "./Login.Page";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verifyEmail] = useVerifyEmailMutation();
    const [verifyEmailRes, setVerifyEmailRes] = useState<MutationResTypes>();
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
                if (res?.error) {
                    const error = res?.error as FetchBaseQueryError;
                    if (error.data && typeof error.data === "object" && "message" in error.data) {
                        //console.log(res?.error);
                        toast.error(error.data.message as string, {
                            position:"bottom-center",
                            duration:2000
                        })
                    }
                }
                else if (res?.data) {
                    if (res?.data.success) {
                        toast.success(res?.data.message, {
                            position:"bottom-center",
                            duration:2000
                        });
            
                        setTimeout(() => {
                            navigate("/");
                        }, 1500);
                        
                    }
                    else{
                        toast.error(res.data.message, {
                            position:"bottom-center",
                            duration:2000,
                        })
                    }
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
                if (res?.error) {
                    const error = res?.error as FetchBaseQueryError;
                    if (error.data && typeof error.data === "object" && "message" in error.data) {
                        //console.log(res?.error);
                        toast.error(error.data.message as string, {
                            position:"bottom-center",
                            duration:2000
                        })
                    }
                }
                else if (res?.data) {
                    if (res?.data.success) {
                        toast.success(res?.data.message, {
                            position:"bottom-center",
                            duration:2000
                        });
            
                        setTimeout(() => {
                            navigate("/");
                        }, 1500);
                        
                    }
                    else{
                        toast.error(res.data.message, {
                            position:"bottom-center",
                            duration:2000,
                        })
                    }
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
                verifyEmailRes?.error &&
                "data" in verifyEmailRes.error &&
                verifyEmailRes?.error.data &&
                typeof verifyEmailRes?.error.data === "object" &&
                "message" in verifyEmailRes.error.data &&
                verifyEmailRes?.error.data.message ?
                <>
                    <h1 style={{color:"#ff4b69"}}>{verifyEmailRes.error.status}</h1>
                    <p style={{color:"#919191", fontSize:"0.8rem"}}>{verifyEmailRes.error.data.message as string}</p>
                </>
                :
                <>
                    <h1 style={{color:"#ff4b69"}}>200</h1>
                    <p style={{color:"#919191", fontSize:"0.8rem"}}>{verifyEmailRes?.data?.message}</p>
                </>
            }
            {/*<pre>{JSON.stringify(verifyEmailRes?.error.data.message, null, `\t`)}</pre>*/}
            {/*<p>{verifyEmailRes?.error && }</p>*/}
        </div>
    )
}

export default VerifyEmail;