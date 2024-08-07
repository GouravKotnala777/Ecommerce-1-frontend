import { useDispatch, useSelector } from "react-redux";
import "../styles/components/sidebar.scss";
import { MiscReducerTypes, setIsHamActive } from "../redux/reducers/miscReducers";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";


const Sidebar = () => {
    const {isHamActive} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    const closeSidebarHandler = () => {
        dispatch(setIsHamActive(false));
    };

    
    return(
        <div className="sidebar_bg" style={{left:isHamActive?"0%":"-100%"}}>
            <div className="left_part">
                <div className="scrollable_part">
                    <NavLink className="navlink" to="/" onClick={closeSidebarHandler}>Home</NavLink>
                    <NavLink className="navlink" to="/user/register" onClick={closeSidebarHandler}>Register</NavLink>
                    <NavLink className="navlink" to="/user/login" onClick={closeSidebarHandler}>Login</NavLink>
                    <NavLink className="navlink" to="/product/new" onClick={closeSidebarHandler}>Add Product</NavLink>
                    <NavLink className="navlink" to="/user/wishlist" onClick={closeSidebarHandler}>Wishlist</NavLink>
                    <NavLink className="navlink" to="/admin/dashboard" onClick={closeSidebarHandler}>Dashboard</NavLink>
                    <NavLink className="navlink" to="/user/cart" onClick={closeSidebarHandler}>Cart</NavLink>
                    <NavLink className="navlink" to="/user/logout" onClick={closeSidebarHandler}>Logout</NavLink>
                </div>
            </div>
            <div className="right_part" onClick={closeSidebarHandler}>
                <CgClose className="CgClose" />
            </div>
        </div>
    )
};

export default Sidebar;