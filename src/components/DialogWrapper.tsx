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
            console.log("GGGGGGGGGGGGGGGGGGGGGGG");
        }
        else{
            document.body.classList.remove("freeze");
            console.log("FFFFFFFFFFFFFFFFFFFFFFF");
        }
    }, [toggler]);


    const close = () => {
        dispatch((setToggler  as ActionCreatorWithPayload<boolean, "miscReducer/setIsReviewDialogActive">)(false));

        //document.body.classList.remove("freeze");
    };

    return(
        <div className="dialog_cont" style={{display:toggler?"block":"none"}} onClick={close}>
            {JSON.stringify(toggler)}
            <dialog id="dialog" ref={parentDivRef} open={toggler} >
                {Element}
            </dialog>
        </div>
    )
};

export default DialogWrapper;