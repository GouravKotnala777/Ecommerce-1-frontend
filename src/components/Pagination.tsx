import "../styles/components/pagination.scss";
import { Dispatch, SetStateAction } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { PRIMARY, PRIMARY_HOVER, SECONDARY } from "../styles/utils";


const Pagination = ({documentCount, skip, setSkip}:{documentCount:number; skip:number; setSkip:Dispatch<SetStateAction<number>>}) => {

    const numGenerator = (count:number) => {
        const arr = [];
        for (let num = 1; num <= count+1; num++) {
            arr.push(<button key={num} style={{
                background:skip+1 === num ? `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})` : "white",
                color:skip+1 === num ? "white" : PRIMARY
            }} onClick={() => setSkip(num-1)}>{num}</button>);
        }

        const arr2 = [...arr];        
        
        return arr2.splice(Math.floor(skip / 4)*4, 4);
    }
    
    return(
        <div className="pagination_cont">
            <div className="btn_cont">
                <button style={{
                    border:skip > 0? `1px solid ${PRIMARY}` : `1px solid ${PRIMARY_HOVER}`,
                    color:skip > 0? PRIMARY : PRIMARY_HOVER
                }} onClick={() => {
                    if (skip > 0) {
                        setSkip(skip-(4+(skip%4)))
                    }
                }}><BiLeftArrow /></button>

                
                {
                    numGenerator(documentCount)
                }
                

                <button style={{
                    border:skip < documentCount? `1px solid ${PRIMARY}` : `1px solid ${PRIMARY_HOVER}`,
                    color:skip < documentCount? PRIMARY : PRIMARY_HOVER
                }} onClick={() => {
                    if (skip < documentCount) {
                        setSkip(skip+(4-(skip%4)))
                    }
                }}><BiRightArrow /></button>
            </div>
        </div>
    )
};

export default Pagination;