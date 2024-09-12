import "../styles/components/sidebar.scss";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { Dispatch, SetStateAction } from "react";


const Sidebar = ({userName, userRole, wishlistNotification, cartNotification, isHamActive, setIsHamActive, setIsMyProfileDialogOpen}:{userName:string|undefined; userRole:string|undefined; isHamActive:boolean; wishlistNotification?:number; cartNotification:number; setIsHamActive:Dispatch<SetStateAction<boolean>>; setIsMyProfileDialogOpen:Dispatch<SetStateAction<boolean>>;}) => {
    
    const closeSidebarHandler = () => {
        setIsHamActive(false);
    };
    
    return(
        <div className="sidebar_bg" style={{left:isHamActive?"-1%":"-104%"}}>
            <div className="sidebar_left_part">
                <div className="sidebar_scrollable_part">
                    <NavLink className="sidebar_navlink" to="/" onClick={closeSidebarHandler}>Home</NavLink>
                    {
                        !userName &&
                        <>
                            <NavLink className="sidebar_navlink" to="/user/register" onClick={closeSidebarHandler}>Register</NavLink>
                            <NavLink className="sidebar_navlink" to="/user/login" onClick={closeSidebarHandler}>Login</NavLink>
                        </>
                    }
                    {
                        userRole === "admin" &&
                            <>
                                <NavLink className="sidebar_navlink" to="/chat-admin" onClick={closeSidebarHandler}>Chats</NavLink>
                                <NavLink className="sidebar_navlink" to="/product/new" onClick={closeSidebarHandler}>Add Product</NavLink>
                                <NavLink className="sidebar_navlink" to="/admin/dashboard" onClick={closeSidebarHandler}>Dashboard</NavLink>
                            </>
                    }
                    {
                        userName &&
                            <>
                                <NavLink className="sidebar_navlink cart_sidebar_navlink" to="/user/wishlist" onClick={closeSidebarHandler}>
                                    {wishlistNotification !== 0 && wishlistNotification !== undefined && <div className="notification">{wishlistNotification}</div>} Wishlist
                                </NavLink>
                                <NavLink className="sidebar_navlink" to="/user/orders" onClick={closeSidebarHandler}>Orders</NavLink>
                                <NavLink className="sidebar_navlink cart_sidebar_navlink" to="/user/cart" onClick={closeSidebarHandler}>
                                    {cartNotification !== 0 && cartNotification !== undefined && <div className="notification">{cartNotification}</div>} Cart
                                </NavLink>
                                <div className="sidebar_navlink" style={{cursor:"pointer"}} onClick={() => {setIsMyProfileDialogOpen(true); closeSidebarHandler();}}>My Profile</div>
                                <NavLink className="sidebar_navlink" to="/user/logout" onClick={closeSidebarHandler}>Logout</NavLink>
                            </>
                    }
                </div>
            </div>
            <div className="sidebar_right_part" onClick={closeSidebarHandler}>
                <CgClose className="CgClose" />
            </div>
        </div>
    )
};

export default Sidebar;