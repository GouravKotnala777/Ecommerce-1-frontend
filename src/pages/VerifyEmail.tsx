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
    const navigate = useNavigate();


    const token = searchParams.get('token');
    const emailtype = searchParams.get('emailtype');

    const verifyEmailHandler = async() => {
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

    useEffect(() => {
        if (token && emailtype) {
            verifyEmailHandler();
        }
    }, []);
    return(
        <div className="verify_email">
            <Toaster />
            <h1>Verify Email</h1>
            <pre>{JSON.stringify(verifyEmailRes, null, `\t`)}</pre>
        </div>
    )
}

export default VerifyEmail;