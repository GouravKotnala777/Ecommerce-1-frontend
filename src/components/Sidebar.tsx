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
                    <NavLink className="navlinks" to="/">Home</NavLink>
                    <NavLink className="navlinks" to="/user/register">Register</NavLink>
                    <NavLink className="navlinks" to="/user/login">Login</NavLink>
                    <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                    <NavLink className="navlinks" to="/user/wishlist">Wishlist</NavLink>
                    <NavLink className="navlinks" to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink className="navlinks" to="/user/cart">Cart</NavLink>
                    <NavLink className="navlinks" to="/user/logout">Logout</NavLink>
                </div>
            </div>
            <div className="right_part" onClick={() => dispatch(setIsHamActive(false))}>
                <CgClose className="CgClose" />
            </div>
        </div>
    )
};

export default Sidebar;