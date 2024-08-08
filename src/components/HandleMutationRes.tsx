import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { memo, useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import { MutationResTypes } from "../assets/demoData";
import { useNavigate } from "react-router-dom";



const HandleMutationRes = memo(({res, redirect}:{res:MutationResTypes|{error:{data:{message:string}}}|undefined; redirect?:string;}) => {
    const navigate = useNavigate();



    useEffect(() => {        
        if (res?.error) {
            const error = res?.error as FetchBaseQueryError;
            if (error.data && typeof error.data === "object" && "message" in error.data) {
                console.log(res?.error);
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
    
                if (redirect) {
                    setTimeout(() => {
                        navigate(redirect);
                    }, 1500);
                }
            }
            else{
                toast.error(res.data.message, {
                    position:"bottom-center",
                    duration:2000,
                })
            }
        }
    }, [res]);

    return(
        <>
            <Toaster />
        </>
    )
});

export default HandleMutationRes;