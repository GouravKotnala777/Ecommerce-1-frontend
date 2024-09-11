import "../styles/pages/page_not_found.scss";
import PageNotFound1 from "../../public/page_not_found1.jpg";

const PageNotFound = () => {

    return(
        <div className="page_not_found_bg">
            <img className="page_not_found_img" src={PageNotFound1} alt={PageNotFound1} />
            <div className="back_btn_cont">
                <button>Home</button>
            </div>
        </div>
    )
};

export default PageNotFound;