import logo2 from "../../public/logo2.jpg";
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
import { UserLocationTypes } from "../pages/Login.Page";
import ShareButton from "./ShareButton";
import { RxActivityLog } from "react-icons/rx";
import { RiChatSmile3Line, RiCoupon3Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";
import { IoHomeOutline, IoLogInOutline, IoLogOutOutline, IoScaleOutline } from "react-icons/io5";
import { BsCalendar2Event } from "react-icons/bs";
import { TfiGift } from "react-icons/tfi";
import { updateMe } from "../redux/api/api";


const Header = ({userName, userRole, wishlistNotification, cartNotification, couponNotification, myReferralGiftsNotification, userLocation}:{userName?:string; userRole:string|undefined; wishlistNotification?:number; cartNotification:number; couponNotification:number; myReferralGiftsNotification:number; userLocation:UserLocationTypes|undefined;}) => {
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
            <DialogWrapper Element={<MyProfileDialog setIsMyProfileDialogOpen={setIsMyProfileDialogOpen} userLocation={userLocation as UserLocationTypes} />} toggler={isMyProfileDialogOpen} setToggler={setIsMyProfileDialogOpen} />
            <div className="header_bg" style={{top:hideHeader?"-13%":"-1.5%"}}>
                <div className="left_part">
                    <img src={logo2} alt={logo2} />
                </div>
                <nav className="right_part">
                    <div className="nav_section">
                        <NavLink className="navlinks" to="/"><IoHomeOutline className="header_icon" /></NavLink>
                        <NavLink className="navlinks" to="/tools/macro_calculator"><IoScaleOutline className="header_icon" /></NavLink>
                        {
                            !userName &&
                                <>
                                    <NavLink className="navlinks" to="/user/register">Register</NavLink>
                                    <NavLink className="navlinks" to="/user/login"><IoLogInOutline className="header_icon" /></NavLink>
                                </>
                        }
                        {
                            userRole === "admin" &&
                                <>
                                    <NavLink className="navlinks" to="/chat-admin"><RiChatSmile3Line className="header_icon" /></NavLink>
                                    <NavLink className="navlinks" to="/product/new">Add Product</NavLink>
                                    <NavLink className="navlinks" to="/admin/activities"><RxActivityLog className="header_icon" /></NavLink>
                                    <NavLink className="navlinks" to="/admin/dashboard">Dashboard</NavLink>
                                </>
                        }
                        {
                            userName &&
                                <>
                                    <div className="navlinks" style={{cursor:"pointer"}} onClick={() => setIsMyProfileDialogOpen(true)}><FaRegAddressCard className="header_icon" /></div>
                                    <NavLink className="navlinks cart_navlinks" to="/user/wishlist">
                                        {wishlistNotification !== 0 && wishlistNotification !== undefined && <div className="notification">{wishlistNotification}</div>} Whislist
                                    </NavLink>
                                    <NavLink className="navlinks" to="/user/orders">Orders</NavLink>
                                    <NavLink className="navlinks cart_navlinks" to="/user/cart">
                                        {cartNotification !== 0 && cartNotification !== undefined && <div className="notification">{cartNotification}</div>} <FiShoppingCart className="header_icon" />
                                    </NavLink>

                                    <ShareButton title="this is title" text="this is text" url="https://ecommerce-1-frontend.vercel.app" />

                                    <NavLink className="navlinks" to="/user/logout"><IoLogOutOutline className="header_icon" /></NavLink>
                                </>
                        }
                    </div>
                </nav>



                <div className="left_part_mobile" onClick={() => setIsHamActive(true)}>
                    <GiHamburgerMenu className="GiHamburgerMenu" />
                </div>
                <div className="right_part_mobile">
                    <div className="username">{userName&& `Hi ${userName}`}</div>
                    <img src={logo2} alt={logo2} />
                </div>
                <Sidebar userName={userName} userRole={userRole} wishlistNotification={wishlistNotification} cartNotification={cartNotification} isHamActive={isHamActive} setIsHamActive={setIsHamActive} setIsMyProfileDialogOpen={setIsMyProfileDialogOpen} />
            </div>
            <div className="bottom_header_bg header_bg" style={{top:hideHeader?"100%":"90.5%"}}>
                <nav className="bottom_nav">
                    <NavLink className="bottom_nav_navlinks" to="/"><RiCoupon3Line className="header_icon" /></NavLink>
                    <NavLink className="bottom_nav_navlinks" to="/user/coupons">
                        {couponNotification !== 0 && couponNotification !== undefined && <div className="notification">{couponNotification}</div>} <BsCalendar2Event className="header_icon" />
                    </NavLink>
                    <NavLink className="bottom_nav_navlinks" to="/user/gifts">
                        {myReferralGiftsNotification !== 0 && myReferralGiftsNotification !== undefined && <div className="notification">{myReferralGiftsNotification}</div>} <TfiGift className="header_icon" />
                    </NavLink>
                    <NavLink className="bottom_nav_navlinks" to="/"><RiCoupon3Line className="header_icon" /></NavLink>
                </nav>
            </div>
        </>
    )
};

const MyProfileDialog = ({setIsMyProfileDialogOpen, userLocation}:{setIsMyProfileDialogOpen:Dispatch<SetStateAction<boolean>>; userLocation:UserLocationTypes;}) => {
    const {isLoading, user} = useSelector((state:{loggedInUserReducer:loggedInUserInitialState}) => state.loggedInUserReducer);
    const [editFieldList, setEditFieldList] = useState<string[]>([]);
    const [updateFormData, setUpdateFormData] = useState<{oldPassword:string; name?:string; password?:string; mobile?:string;}>({oldPassword:""});
    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedMobile, setUpdatedMobile] = useState<string>("");


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
            const res = await updateMe({...updateFormData, action:"update_profile", userLocation});

            console.log("----- MyProfileDialog updateMeHandler");
            console.log(res);
            if (res.success === true) {
                setUpdateFormData({oldPassword:""});
                setEditFieldList([]);
                if (updateFormData.name) {
                    setUpdatedName(updateFormData.name);
                }
                if (updateFormData.mobile) {
                    setUpdatedMobile(updateFormData.mobile);
                }
            }






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
                                        {!editFieldList.includes("name")&& (updatedName ? updatedName : user?.name)}
                                        <input type="text" name="name" id="name" placeholder="New Name" value={updateFormData?.name ? updateFormData?.name : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("name")?"block":"none"}} />
                                        {editFieldList.includes("name") ? <CgClose id="name-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="name-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}
                                    </div>
                                <div className="heading">Email</div><div className="value">{user?.email}</div>
                                <div className="heading">Password</div><div className="value">{!editFieldList.includes("password")&&"**********"} <input type="text" name="password" id="password" placeholder="New Password" value={updateFormData?.password ? updateFormData?.password : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("password")?"block":"none"}} /> {editFieldList.includes("password") ? <CgClose id="password-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="password-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}</div>
                                <div className="heading">Mobile</div><div className="value">{!editFieldList.includes("mobile")&& (updatedMobile ? updatedMobile : user?.mobile)} <input type="text" name="mobile" id="mobile" placeholder="New Mobile" value={updateFormData?.mobile ? updateFormData?.mobile : ""} onChange={(e) => updateFormChangeHandler(e)} style={{display:editFieldList.includes("mobile")?"block":"none"}} /> {editFieldList.includes("mobile") ? <CgClose id="mobile-CgClose" className="BiEdit" onClick={(e) => func(e)}  /> : <BiEdit id="mobile-BiEdit" className="BiEdit" onClick={(e) => func(e)} />}</div>
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