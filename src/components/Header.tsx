import logo from "/public/vite.svg";
import "../styles/components/header.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { setIsHamActive } from "../redux/reducers/miscReducers";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";


const Header = () => {
    const dispatch = useDispatch();
    const [hideHeader, setHideHeader] = useState<boolean>(false);
    const previousScrollPos = useRef<number>(0);
    
    console.log("&&&&&&&&&&&&&&&&&&&&");
    console.log("TTTTTTTTTTTTTTTTTTTT");

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setHideHeader(currentScrollPos >= previousScrollPos.current);      
            previousScrollPos.current = currentScrollPos
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    

    return(
        <div className="header_bg" style={{top:hideHeader?"-12%":"-1%"}}>
            <div className="left_part">
                <img src={logo} alt={logo} />
            </div>
            <nav className="right_part">
                <div className="nav_section">
                    <NavLink className="navlinks" to="/">Home</NavLink>
                    <NavLink className="navlinks" to="/user/register">Register</NavLink>
                    <NavLink className="navlinks" to="/user/login">Login</NavLink>
                    <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                    <NavLink className="navlinks" to="/user/cart">Cart</NavLink>
                    <NavLink className="navlinks" to="/user/logout">Logout</NavLink>
                    <NavLink className="navlinks" to="/">Home</NavLink>
                    <NavLink className="navlinks" to="/user/register">Register</NavLink>
                    <NavLink className="navlinks" to="/user/login">Login</NavLink>
                    <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                    <NavLink className="navlinks" to="/user/cart">Cart</NavLink>
                    <NavLink className="navlinks" to="/user/logout">Logout</NavLink>
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