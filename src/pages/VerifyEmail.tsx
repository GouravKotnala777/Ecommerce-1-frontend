import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/api/api";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast, {Toaster} from "react-hot-toast";
import { MutationResTypes } from "../assets/demoData";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [verifyEmail] = useVerifyEmailMutation();
    const [verifyEmailRes, setVerifyEmailRes] = useState<MutationResTypes>();
    const [newPassword, setNewPassword] = useState<string>("");
    const navigate = useNavigate();


    const token = searchParams.get('token');
    const emailtype = searchParams.get('emailtype');

    const verifyEmailHandler = async() => {
        if (emailtype === "VERIFY") {
            try {
                const res = await verifyEmail({verificationToken:token as string, emailType:emailtype as string});
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
            try {
                const res = await verifyEmail({verificationToken:token as string, emailType:emailtype as string, newPassword});
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