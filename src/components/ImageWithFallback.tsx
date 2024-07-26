import { useState } from "react";


const ImageWithFallback = ({src, alt, fallbackSrc}:{src:string; alt:string; fallbackSrc:string;}) => {        
    const [isError, setIsError] = useState<boolean>(false);

    const imageErrorHandler = () => {
        setIsError(true);
    };

    return <img src={isError ? fallbackSrc : src} alt={alt} onError={imageErrorHandler} />
}

export default ImageWithFallback;