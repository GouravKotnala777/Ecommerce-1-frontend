import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { memo } from "react";
import toast, {Toaster} from "react-hot-toast";
import { MutationResTypes } from "../assets/demoData";



const HandleMutationRes = memo(({res}:{res:MutationResTypes|undefined}) => {
    
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
            })
        }
        else{
            toast.error(res.data.message, {
                position:"bottom-center",
                duration:2000,
            })
        }
    }

    return(
        <>
            <Toaster />
        </>
    )
});

export default HandleMutationRes;