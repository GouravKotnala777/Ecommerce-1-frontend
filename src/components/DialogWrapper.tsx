import { ReactElement, useEffect, useRef } from "react";


const DialogWrapper = ({toggler, Element}:{toggler:boolean; Element:ReactElement}) => {
    const parentDivRef = useRef<HTMLDialogElement|null>(null);

    useEffect(() => {
        const aaa = () => {
            const scrollPositionY = window.pageYOffset;
            if (parentDivRef.current) {
                (parentDivRef.current as HTMLDialogElement).style.top = `${-60+scrollPositionY}px`;
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
    useEffect(() => {
        if (parentDivRef.current) {
            const childNode = parentDivRef.current.firstChild as HTMLElement;
            const grandChildNode = childNode.firstChild as HTMLElement;
            grandChildNode.style.margin = "10px auto";
            grandChildNode.style.boxShadow = "1px 1px 1px 350px rgba(0,0,0,0.5)";
        }
    }, []);

    return(
        <dialog id="dialog" ref={parentDivRef} open={toggler} style={
            {
                height:"30rem",
                width:"90%",
                border:"2px solid red",
                borderRadius:"8px",
                position:"relative",
                marginTop:"0px",
                background:"transparent" 
            }
        }>
            <div className="dialog_bg" style={
                {
                    height:"49%",
                    width:"90%",
                    borderRadius:"8px",
                    background:"white",
                    top:"40%",
                    left:"50%",
                    position:"absolute",
                    translate:"-50% -50%",
                    padding:"0 10px",
                    border:"2px solid blue"
                }
            }>
                {Element}
            </div>
        </dialog>
    )
};

export default DialogWrapper;