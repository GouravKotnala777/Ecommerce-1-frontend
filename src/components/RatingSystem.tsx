import { ReactElement } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";


const RatingSystem = ({rating}:{rating:number}) => {
    const totalStars = 5;
    const filledStars = Math.min(Math.max(rating, 0), totalStars);
    const stars:ReactElement[] = [];
    

    for (let i = 0; i < totalStars; i++) {
        if (i <= filledStars) {
            
            stars.push(<span key={i}><BsStarFill color="rgb(255, 34, 71)" /></span>)
        }
        else if (i <= filledStars + 0.5) {
            
            stars.push(<span key={i}><BsStarHalf color="rgb(255, 34, 71)" /></span>)
        }
        else{
            stars.push(<span key={i}><BsStar color="rgb(255, 34, 71)" /></span>)
        }
        
    }

    return(
        <div>
            {stars}
        </div>
    )
};

export default RatingSystem;