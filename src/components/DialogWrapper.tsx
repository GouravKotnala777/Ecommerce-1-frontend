import { Dispatch, ReactElement, useEffect, useRef } from "react";
import "../styles/components/dialog_wrapper.scss";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface DialogWrapperTypes {
    toggler:boolean;
    setToggler:Dispatch<React.SetStateAction<boolean>>;
    Element:ReactElement;
}

const DialogWrapper = ({toggler, setToggler, Element}:DialogWrapperTypes) => {
    const parentDivRef = useRef<HTMLDivElement|null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const aaa = () => {
            const scrollPositionY = window.pageYOffset;
            
            if (parentDivRef.current) {
                (parentDivRef.current as HTMLDivElement).style.top = `${scrollPositionY}px`;
            }
        };

        window.addEventListener("scroll", aaa);
    }, []);

    useEffect(() => {
        if (toggler) {
            document.body.classList.add("freeze");
        }
        else{
            document.body.classList.remove("freeze");
        }
    }, [toggler]);


    const close = () => {
        if (typeof setToggler === "function" && "type" in setToggler){
            dispatch((setToggler as ActionCreatorWithPayload<boolean, "miscReducer/setIsReviewDialogActive">)(false));
        }
        else{
            setToggler(false);
        }
    };

    return(
        <div className="dialog_cont" ref={parentDivRef} style={{display:toggler?"block":"none"}} onClick={close}>
            <dialog id="dialog" open={toggler} >
                {Element}
            </dialog>
        </div>
    )
};

export default DialogWrapper;