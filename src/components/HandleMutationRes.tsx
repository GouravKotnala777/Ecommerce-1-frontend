import { memo, useEffect } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../redux/api/api";



const HandleMutationRes = memo(({res, redirect, duration}:{res:ResponseType<string|Error>; redirect?:string; duration?:number;}) => {
    const navigate = useNavigate();



    useEffect(() => {        
        if (res?.success === false) {
            toast.error(res.message as string, {
                position:"bottom-center",
                duration:duration?duration:2000
            })
        }
        else if (res?.success === true) {
            toast.success(res.message as string, {
                position:"bottom-center",
                duration:duration?duration:2000
            });

            if (redirect) {
                setTimeout(() => {
                    navigate(redirect);
                }, 1500);
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