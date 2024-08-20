import logo from "/public/vite.svg";
import "../styles/components/header.scss";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import DialogWrapper from "./DialogWrapper";
import { useSelector } from "react-redux";
import { loggedInUserInitialState } from "../redux/reducers/loggedInUserReducer";
import { BiEdit, BiRightArrowAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useUpdateMeMutation } from "../redux/api/api";
//import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
//import { SerializedError } from "@reduxjs/toolkit";
//import { useFetchMyCartQuery } from "../redux/api/api";
//import { ProductTypes } from "../assets/demoData";


const Header = ({userName, cartNotification}:{userName?:string; cartNotification:number;}) => {
    const [hideHeader, setHideHeader] = useState<boolean>(false);
    const previousScrollPos = useRef<number>(0);
    const [isHamActive, setIsHamActive] = useState<boolean>(false);
    const [isMyProfileDialogOpen, setIsMyProfileDialogOpen] = useState<boolean>(false);
    

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
            <DialogWrapper Element={<MyProfileDialog setIsMyProfileDialogOpen={setIsMyProfileDialogOpen} />} toggler={isMyProfileDialogOpen} setToggler={setIsMyProfileDialogOpen} />
            <div className="header_bg" style={{top:hideHeader?"-13%":"-1.5%"}}>
                <div className="left_part">
                    <img src={logo} alt={logo} />
                </div>
                <nav className="right_part">
                    <div className="nav_section">
                        <NavLink className="navlinks" to="/">Home</NavLink>
                        <NavLink className="navlinks" to="/chat">Chat</NavLink>
                        <NavLink className="navlinks" to="/user/register">Register</NavLink>
                        <NavLink className="navlinks" to="/user/login">Login</NavLink>
                        <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                        <NavLink className="navlinks" to="/user/wishlist">Wishlist</NavLink>
                        <NavLink className="navlinks" to="/admin/dashboard">Dashboard</NavLink>
                        <NavLink className="navlinks" to="/user/orders">Orders</NavLink>
                        <NavLink className="navlinks cart_navlinks" to="/user/cart">
                            {cartNotification !== 0 && cartNotification !== undefined && <div className="cart_notification">{cartNotification}</div>} Cart
                        </NavLink>
                        <div className="navlinks" style={{cursor:"pointer"}} onClick={() => setIsMyProfileDialogOpen(true)}>My Profile</div>
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
                <Sidebar isHamActive={isHamActive} setIsHamActive={setIsHamActive} setIsMyProfileDialogOpen={setIsMyProfileDialogOpen} />
            </div>
        </>
    )
};

const MyProfileDialog = ({setIsMyProfileDialogOpen}:{setIsMyProfileDialogOpen:Dispatch<SetStateAction<boolean>>;}) => {
    const {isLoading, user} = useSelector((state:{loggedInUserReducer:loggedInUserInitialState}) => state.loggedInUserReducer);
    const [updateMe] = useUpdateMeMutation();
    const [editFieldList, setEditFieldList] = useState<string[]>([]);
    const [updateFormData, setUpdateFormData] = useState<{oldPassword:string; name?:string; password?:string; mobile?:string;}>({oldPassword:""});

    //const forgetPasswordSendEmail = () => {
    //        setIsMyProfileDialogOpen(false);
    //}
    const func = (e:MouseEvent<SVGElement>) => {
        const iconUniqueID = (e.currentTarget.id).split("-")[0];
        console.log(iconUniqueID);
        console.log(e.currentTarget.id);
        if (editFieldList.includes(iconUniqueID)) {
            setEditFieldList(editFieldList.filter((item) => item !== iconUniqueID));
            setUpdateFormData({...updateFormData, [iconUniqueID]:undefined})
        }
        else{
            setEditFieldList([...editFieldList, iconUniqueID]);
        }
    };
    const updateFormChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateFormData({...updateFormData, [e.target.name]:e.target.value});
    };
    const myProfileDialogCloseHandler = () => {
        setIsMyProfileDialogOpen(false);
        setEditFieldList([]);
        setUpdateFormData({oldPassword:"", name:undefined, mobile:undefined});
    };
    const updateMeHandler = async() => {
        try {
            const res = await updateMe({...updateFormData});

            console.log("----- MyProfileDialog updateMeHandler");
            console.log(res);
            console.log("----- MyProfileDialog updateMeHandler");
        } catch (error) {
            console.log("----- MyProfileDialog updateMeHandler");
            console.log(error);
            console.log("----- MyProfileDialog updateMeHandler");
        }
    };
    
    return(
        <div className="my_profile_dialog_cont">
            {
                updateFormData.name || updateFormData.mobile || updateFormData.password ?
                    <div className="update_preview_cont">
                        <div className="main_heading">Update Preview</div>
                        <div className="my_details">
                            <div className="heading">Name</div><div className="value">{user?.name}</div><BiRightArrowAlt /><div className="value">{updateFormData.name}</div>
                            <div className="heading">Password</div><div className="value">*********</div><BiRightArrowAlt /><div className="value">{updateFormData.password}</div>
                            <div className="heading">Mobile</div><div className="value">{user?.mobile}</div><BiRightArrowAlt /><div className="value">{updateFormData.mobile}</div>
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className="my_profile_cont" onClick={(e) => e.stopPropagation()}>
                <div className="main_heading">My Profile</div>
                {/*<pre style={{fontSize:"0.6rem"}}>{JSON.stringify(updateFormData, null, `\t`)}</pre>*/}
                {
                    isLoading ?
                    <h1>Loading...</h1>
                    :
                    <>
                            <div className="my_details">
                                <div className="heading">Name</div>
                                    <div className="value">
                                        {!editFieldList.includes("name")&&user?.name}
                                        <input type="text" name="name" id="name" placeholder="New Name" value={updateFormData?.name ? updateFormData?.name : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("name")?"block":"none"}} />
                                        {editFieldList.includes("name") ? <CgClose id="name-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="name-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}
                                    </div>
                                <div className="heading">Email</div><div className="value">{user?.email}</div>
                                <div className="heading">Password</div><div className="value">{!editFieldList.includes("password")&&"**********"} <input type="text" name="password" id="password" placeholder="New Password" value={updateFormData?.password ? updateFormData?.password : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("password")?"block":"none"}} /> {editFieldList.includes("password") ? <CgClose id="password-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="password-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}</div>
                                <div className="heading">Mobile</div><div className="value">{!editFieldList.includes("mobile")&&user?.mobile} <input type="text" name="mobile" id="mobile" placeholder="New Mobile" value={updateFormData?.mobile ? updateFormData?.mobile : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("mobile")?"block":"none"}} /> {editFieldList.includes("mobile") ? <CgClose id="mobile-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="mobile-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}</div>
                                <div className="heading">Role</div><div className="value">{user?.role}</div>
                                {
                                    editFieldList.length !== 0 &&
                                    <>
                                            <div className="heading">Old Password</div><div className="value"><input type="text" name="oldPassword" placeholder="Old Password" value={updateFormData?.oldPassword ? updateFormData?.oldPassword : ""} onChange={(e) => updateFormChangeHandler(e)} /></div>
                                        </>
                                }
                            </div>
                            {
                                editFieldList.length === 0 ?
                                    <div className="btns">
                                        <span></span>
                                        <button className="close_btn" onClick={myProfileDialogCloseHandler}>Close</button>
                                    </div>
                                    :
                                    <div className="btns">
                                        <button className="close_btn" onClick={myProfileDialogCloseHandler}>Cancel</button>
                                        <button className="update_btn" onClick={updateMeHandler}>Update</button>
                                    </div>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Header;