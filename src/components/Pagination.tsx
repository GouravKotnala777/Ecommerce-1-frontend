import "../styles/components/pagination.scss";
import { Dispatch, SetStateAction } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";


const Pagination = ({documentCount, skip, setSkip}:{documentCount:number; skip:number; setSkip:Dispatch<SetStateAction<number>>}) => {

    const numGenerator = (count:number) => {
        const arr = [];
        for (let num = 1; num <= count+1; num++) {
            arr.push(<button key={num} style={{
                background:skip+1 === num ? "rgba(255, 69, 100, 0.9)" : "white",
                color:skip+1 === num ? "white" : "rgb(255, 69, 100)"
            }} onClick={() => setSkip(num-1)}>{num}</button>);
        }

        const arr2 = [...arr];

        return (arr2.splice(skip, 4).length > 3 ?
                    arr.splice(skip, 4)
                    :
                    arr.splice(count-3, 4)
                );
    }
    
    return(
        <div className="pagination_cont">
            <div className="btn_cont">
                <button style={{
                    border:skip > 0? `1px solid rgba(255, 69, 100, 1)` : `1px solid rgba(255, 69, 100, 0.2)`,
                    color:skip > 0? `rgba(255, 69, 100, 1)` : `rgba(255, 69, 100, 0.2)`
                }} onClick={() => {
                    if (skip > 0) {
                        setSkip(skip-1)
                    }
                }}><BiLeftArrow /></button>

                
                {
                    numGenerator(documentCount)
                }
                

                <button style={{
                    border:skip < documentCount? `1px solid rgba(255, 69, 100, 1)` : `1px solid rgba(255, 69, 100, 0.2)`,
                    color:skip < documentCount? `rgba(255, 69, 100, 1)` : `rgba(255, 69, 100, 0.2)`
                }} onClick={() => {
                    if (skip < documentCount) {
                        setSkip(skip+1)
                    }
                }}><BiRightArrow /></button>
            </div>
        </div>
    )
};

export default Pagination;