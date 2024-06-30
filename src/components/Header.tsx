import logo from "/public/vite.svg";
import "../styles/components/header.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsHamActive } from "../redux/reducers/miscReducers";
import { useDispatch } from "react-redux";


const Header = ({hideHeader}:{hideHeader:boolean}) => {
    //const ssss = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();
    //import.meta.env.VITE_SERVER_URL

    

    return(
        <div className="header_bg" style={{top:hideHeader?"-12%":"-1%"}}>
            <div className="left_part">
                <img src={logo} alt={logo} />
            </div>
            <nav className="right_part">
                <div className="nav_section">
                    <NavLink className="navlinks" to="/">Home</NavLink>
                    <NavLink className="navlinks" to="/register">Register</NavLink>
                    <NavLink className="navlinks" to="/login">Login</NavLink>
                    <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                    <NavLink className="navlinks" to="/cart">Cart</NavLink>
                    <NavLink className="navlinks" to="/logout">Logout</NavLink>
                </div>
            </nav>



            <div className="left_part_mobile" onClick={() => dispatch(setIsHamActive(true))}>
                <GiHamburgerMenu className="GiHamburgerMenu" />
            </div>
            <div className="right_part_mobile">
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
};

export default Header;