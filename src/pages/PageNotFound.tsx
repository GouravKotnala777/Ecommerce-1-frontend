import "../styles/pages/page_not_found.scss";
import PageNotFound1 from "../../public/page_not_found1.jpg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return(
        <div className="page_not_found_bg">
            <img className="page_not_found_img" src={PageNotFound1} alt={PageNotFound1} />
            <div className="back_btn_cont">
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        </div>
    )
};

export default PageNotFound;