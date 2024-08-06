import { useDispatch, useSelector } from "react-redux";
import "../styles/components/sidebar.scss";
import { MiscReducerTypes, setIsHamActive } from "../redux/reducers/miscReducers";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";


const Sidebar = () => {
    const {isHamActive} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    
    return(
        <div className="sidebar_bg" style={{left:isHamActive?"0%":"-100%"}}>
            <div className="left_part">
                <div className="scrollable_part">
                    <NavLink className="navlink" to="/">Home</NavLink>
                    <NavLink className="navlink" to="/user/register">Register</NavLink>
                    <NavLink className="navlink" to="/user/login">Login</NavLink>
                    <NavLink className="navlink" to="/product/new">Add Product</NavLink>
                    <NavLink className="navlink" to="/user/wishlist">Wishlist</NavLink>
                    <NavLink className="navlink" to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink className="navlink" to="/user/cart">Cart</NavLink>
                    <NavLink className="navlink" to="/user/logout">Logout</NavLink>
                </div>
            </div>
            <div className="right_part" onClick={() => dispatch(setIsHamActive(false))}>
                <CgClose className="CgClose" />
            </div>
        </div>
    )
};

export default Sidebar;