import "../styles/pages/news.scss";
import photo from "../../public/background.jpg";
import {Note} from "./static/Policies";
import { Link } from "react-router-dom";

const News = () => {
    
    return(
        <div className="news_bg">
            <div className="news_list">
                <Link to="/zzz" className="news_cont">
                    <img src={photo} alt={photo} />
                    <Note heading="Duration " para="28-11-2024" />
                </Link>

                
                <Link to="/zzz" className="news_cont">
                    <img src={photo} alt={photo} />
                    <Note heading="Duration : " para="28-11-2024" />
                </Link>




            </div>
        </div>
    )
};

export default News;