import "../styles/admin/dashboard.scss";
import { Link } from "react-router-dom";
import { ProductTypes } from "../assets/demoData";
import { GiChart } from "react-icons/gi";
import { TbBasketExclamation } from "react-icons/tb";
import { MdOutlineAddchart } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RiCoupon3Line } from "react-icons/ri";
import { GoListUnordered } from "react-icons/go";


const Dashboard = ({outStockProductsNotification}:{outStockProductsNotification:{data?:{success:boolean; message:(ProductTypes&{_id:string; [key:string]:string})[]}}}) => {
    return(
        <div className="dashboard_bg">
            <p style={{margin:"0 auto", textAlign:"center", fontSize:"0.8rem", fontWeight:"bold"}}>Dashboard</p>
            <div className="dashboard_links">
                <Link to="/admin/outstock" className="dashboad_link">
                    <TbBasketExclamation className="dashboard_icon" />Outstock Products{outStockProductsNotification?.data?.message.length !== 0 && outStockProductsNotification?.data?.message.length !== undefined && <div className="notification">{outStockProductsNotification?.data?.message.length}</div>}
                </Link>
                <Link to="/admin/product/incomplete" className="dashboad_link"><MdOutlineAddchart className="dashboard_icon" />Incomplete Products</Link>
                <Link to="/admin/product/update" className="dashboad_link"><GrUpdate className="dashboard_icon" />Update Products Detailes</Link>
                <Link to="/admin/coupon" className="dashboad_link"><RiCoupon3Line className="dashboard_icon" />Create Coupon</Link>
                <Link to="/admin/chart/orders" className="dashboad_link"><GiChart className="dashboard_icon" /> All Orders Chart</Link>
                <Link to="/admin/order/all" className="dashboad_link"><GoListUnordered className="dashboard_icon" />All Orders</Link>
            </div>
        </div>
    )
};

export default Dashboard;