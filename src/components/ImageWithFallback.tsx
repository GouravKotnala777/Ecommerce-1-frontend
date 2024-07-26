import { SyntheticEvent } from "react";

const ImageWithFallback = ({src, alt, fallbackSrc}:{src:string; alt:string; fallbackSrc:string;}) => {        
    
    const imageErrorHandler = (e:SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackSrc;
    };

    return <img src={src} alt={alt} onError={(e) => imageErrorHandler(e)} />
}

export default ImageWithFallback;