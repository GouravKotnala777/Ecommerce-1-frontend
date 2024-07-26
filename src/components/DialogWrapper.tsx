import { Dispatch, ReactElement, useEffect, useRef } from "react";
import "../styles/components/dialog_wrapper.scss";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface DialogWrapperTypes {
    toggler:boolean;
    setToggler:Dispatch<React.SetStateAction<boolean>>|ActionCreatorWithPayload<boolean, "miscReducer/setIsReviewDialogActive">;
    Element:ReactElement;
}

const DialogWrapper = ({toggler, setToggler, Element}:DialogWrapperTypes) => {
    const parentDivRef = useRef<HTMLDialogElement|null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const aaa = () => {
            const scrollPositionY = window.pageYOffset;
            
            if (parentDivRef.current) {
                (parentDivRef.current as HTMLDialogElement).style.top = `${scrollPositionY}px`;
            }
        };

        window.addEventListener("scroll", aaa);
    }, []);

    useEffect(() => {
        if (toggler) {
            document.body.classList.add("freeze");
            document.body.classList.add("add_overlay");
        }
        else{
            document.body.classList.remove("freeze");
            document.body.classList.remove("add_overlay");
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
        <div className="dialog_cont" style={{display:toggler?"block":"none"}} onClick={close}>
            <dialog id="dialog" ref={parentDivRef} open={toggler} >
                {Element}
            </dialog>
        </div>
    )
};

export default DialogWrapper;