import "../styles/components/sidebar.scss";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { Dispatch, SetStateAction } from "react";


const Sidebar = ({isHamActive, setIsHamActive, setIsMyProfileDialogOpen}:{isHamActive:boolean; setIsHamActive:Dispatch<SetStateAction<boolean>>; setIsMyProfileDialogOpen:Dispatch<SetStateAction<boolean>>;}) => {
    
    const closeSidebarHandler = () => {
        setIsHamActive(false);
    };
    
    return(
        <div className="sidebar_bg" style={{left:isHamActive?"-1%":"-104%"}}>
            <div className="sidebar_left_part">
                <div className="sidebar_scrollable_part">
                    <NavLink className="sidebar_navlink" to="/" onClick={closeSidebarHandler}>Home</NavLink>
                    <NavLink className="sidebar_navlink" to="/user/register" onClick={closeSidebarHandler}>Register</NavLink>
                    <NavLink className="sidebar_navlink" to="/user/login" onClick={closeSidebarHandler}>Login</NavLink>
                    <NavLink className="sidebar_navlink" to="/product/new" onClick={closeSidebarHandler}>Add Product</NavLink>
                    <NavLink className="sidebar_navlink" to="/user/wishlist" onClick={closeSidebarHandler}>Wishlist</NavLink>
                    <NavLink className="sidebar_navlink" to="/admin/dashboard" onClick={closeSidebarHandler}>Dashboard</NavLink>
                    <NavLink className="sidebar_navlink" to="/user/orders" onClick={closeSidebarHandler}>Orders</NavLink>
                    <NavLink className="sidebar_navlink" to="/user/cart" onClick={closeSidebarHandler}>Cart</NavLink>
                    <div className="sidebar_navlink" style={{cursor:"pointer"}} onClick={() => {setIsMyProfileDialogOpen(true); closeSidebarHandler();}}>My Profile</div>
                    <NavLink className="sidebar_navlink" to="/user/logout" onClick={closeSidebarHandler}>Logout</NavLink>
                </div>
            </div>
            <div className="sidebar_right_part" onClick={closeSidebarHandler}>
                <CgClose className="CgClose" />
            </div>
        </div>
    )
};

export default Sidebar;