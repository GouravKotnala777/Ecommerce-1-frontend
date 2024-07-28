import "../styles/components/pagination.scss";
import { Dispatch, SetStateAction } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";


const Pagination = ({documentCount, skip, setSkip}:{documentCount:number; skip:number; setSkip:Dispatch<SetStateAction<number>>}) => {

    const numGenerator = (count:number) => {
        const arr = [];
        for (let num = 1; num <= count+1; num++) {
            arr.push(<button style={{
                background:skip+1 === num ? "rgba(255, 69, 100, 0.9)" : "white",
                color:skip+1 === num ? "white" : "rgb(255, 69, 100)"
            }} onClick={() => setSkip(num-1)}>{num}</button>);
        }
        return arr.splice(skip, 4);
    }

    return(
        <div className="pagination_cont">
                <div className="btn_cont">
                    <button onClick={() => {
                        if (skip > 0) {
                            setSkip(skip-1)
                        }
                    }}><BiLeftArrow /></button>

                    
                    {
                        numGenerator(documentCount)
                    }
                    

                    <button onClick={() => {
                        if (skip < documentCount) {
                            setSkip(skip+1)
                        }
                    }}><BiRightArrow /></button>
                </div>
            </div>
    )
};

export default Pagination;