import logo from "/public/vite.svg";
import "../styles/components/header.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";


const Header = ({hideHeader}:{hideHeader:boolean}) => {
    const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);
    //import.meta.env.VITE_SERVER_URL

    return(
        <div className="header_bg" style={{top:hideHeader?"-12%":"-1%"}}>
            <div className="left_part">
                <img src={logo} alt={logo} />
            </div>
            <nav className="right_part">
                <div className="nav_section">
                    <NavLink className="navlinks" to="####">aaa</NavLink>
                    <NavLink className="navlinks" to="####">aaa</NavLink>
                    <NavLink className="navlinks" to="####">aaa</NavLink>
                    <NavLink className="navlinks" to="####">aaa</NavLink>
                    <NavLink className="navlinks" to="####">aaa</NavLink>
                </div>
            </nav>



            <div className="left_part_mobile" onClick={() => setIsSidebarActive(true)}>
                <GiHamburgerMenu className="GiHamburgerMenu" />
            </div>
            <div className="right_part_mobile">
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
};

export default Header;