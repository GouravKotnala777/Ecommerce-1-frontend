import "../styles/components/spinner.scss";

interface SpinnerPropTypes{
    heading?:string;
    width?:number;
    color?:string;
    thickness?:number;
    type:1|2;
}


const Spinner = ({heading, width, color, thickness, type}:SpinnerPropTypes) => {

    return(
        <div className="spinner_cont" style={{width:width?`${width}px`:"15px", height:width?`${width}px`:"15px"}}>
            <div className="spinner" style={{
                borderColor:color?`${color}`:"rgb(255, 75, 105)",
                borderWidth:thickness?thickness:"2px",

                borderLeftWidth:thickness?thickness:"2px",
                borderLeftColor:"transparent",

                borderRightColor:type===1?"transparent":"rgb(255, 75, 105)",
                borderRightWidth:thickness?thickness:"2px",
            }}>

            </div>
            {
                heading &&
                    <div className="spinner_heading">
                        {heading}
                    </div>
            }
        </div>
    )
};

export default Spinner;