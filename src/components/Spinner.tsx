import "../styles/components/spinner.scss";
import { PRIMARY } from "../styles/utils";

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
                borderColor:color?color:PRIMARY,
                borderWidth:thickness?thickness:"2px",
                //borderStyle:"solid",

                borderLeftColor:"transparent",
                borderLeftWidth:thickness?thickness:"2px",
                //borderLeftStyle:"solid",

                borderRightColor:type===1?"transparent":color?color:PRIMARY,
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