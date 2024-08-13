import logo from "/public/vite.svg";
import "../styles/components/header.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";


const Header = ({userName}:{userName?:string;}) => {
    const [hideHeader, setHideHeader] = useState<boolean>(false);
    const previousScrollPos = useRef<number>(0);
    const [isHamActive, setIsHamActive] = useState<boolean>(false);
    
    

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setHideHeader(currentScrollPos >= previousScrollPos.current);      
            previousScrollPos.current = currentScrollPos
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    useEffect(() => {
        if (isHamActive) {
        document.body.classList.add("freeze");
        }
        else{
        document.body.classList.remove("freeze");
        }
    }, [isHamActive]);
    

    return(
        <>
            <div className="header_bg" style={{top:hideHeader?"-13%":"-1.5%"}}>
                <div className="left_part">
                    <img src={logo} alt={logo} />
                </div>
                <nav className="right_part">
                    <div className="nav_section">
                        <NavLink className="navlinks" to="/">Home</NavLink>
                        <NavLink className="navlinks" to="/user/register">Register</NavLink>
                        <NavLink className="navlinks" to="/user/login">Login</NavLink>
                        <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                        <NavLink className="navlinks" to="/user/wishlist">Wishlist</NavLink>
                        <NavLink className="navlinks" to="/admin/dashboard">Dashboard</NavLink>
                        <NavLink className="navlinks" to="/user/cart">Cart</NavLink>
                        <NavLink className="navlinks" to="/user/logout">Logout</NavLink>
                    </div>
                </nav>



                <div className="left_part_mobile" onClick={() => setIsHamActive(true)}>
                    <GiHamburgerMenu className="GiHamburgerMenu" />
                </div>
                <div className="right_part_mobile">
                    <div className="username">{userName&& `Hi ${userName}`}</div>
                    <img src={logo} alt={logo} />
                </div>
                <Sidebar isHamActive={isHamActive} setIsHamActive={setIsHamActive} />
            </div>
        </>
    )
};

export default Header;