import "../styles/components/range.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";


const Range = ({aa, setAa}:{aa:{
    minPrice: number;
    maxPrice: number;
}, setAa:Dispatch<SetStateAction<{
    minPrice: number;
    maxPrice: number;
}>>}) => {
    const [filter, setFilter] = useState<{category:string; sub_category:string; brand:string; price:{minPrice?:number; maxPrice?:number;}}>({category:"", sub_category:"", brand:"", price:{minPrice:0, maxPrice:1000}});
    //const [aa, setAa] = useState<{minPrice:number; maxPrice:number;}>({minPrice:0, maxPrice:10000});

    const filterChangeHandler = (e:ChangeEvent<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement>) => {
            setFilter({...filter, [e.target.name]:e.target.value});
    };
    const handlePriceChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name === "minPrice"?
                        Math.min(Number(e.target.value), aa.maxPrice - 1)
                        :
                        Math.max(Number(e.target.value), aa.minPrice + 1);
        setAa({...aa, [e.target.name]:value});
        setFilter({...filter, price:{...filter.price, [e.target.name]:value}});
    };

    return(
        <div className="price-range-filter">
            <input
                type="range"
                name="minPrice"
                min={0}
                max={10000}
                value={aa.minPrice}
                onChange={(e) => {handlePriceChange(e); filterChangeHandler(e)}}
                className="thumb thumb--left"
            />
            <input
                type="range"
                name="maxPrice"
                min={0}
                max={10000}
                value={aa.maxPrice}
                onChange={(e) => {handlePriceChange(e); filterChangeHandler(e);}}
                className="thumb thumb--right"
            />
            <div className="slider">
                <div className="slider__track" />
                <div className="slider__range" style={{ left: `${((aa.minPrice / 10000)*100)}%`, right: `${100 - (aa.maxPrice / 10000) * 100}%` }} />
                <div className="slider__left-value">{aa.minPrice}</div>
                <div className="slider__right-value">{aa.maxPrice}</div>
            </div>
        </div>
    )
};

export default Range;