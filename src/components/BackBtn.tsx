import { IoHomeOutline } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const BackBtn = () => {
    const navigate = useNavigate();

    return(
        <div className="navigation_btns_cont">
            <MdKeyboardBackspace className="icon" onClick={() => {navigate(-1)}} />
            <IoHomeOutline className="icon" onClick={() => {navigate("/")}} />
        </div>
    )
};

export default BackBtn;