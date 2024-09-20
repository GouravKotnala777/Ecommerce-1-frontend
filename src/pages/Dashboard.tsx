import { Link } from "react-router-dom";


const Dashboard = () => {
    return(
        <div className="dashboard_bg">
            <h1>Dashboard</h1>
            <Link to="/admin/outstock">Outstock Products</Link><hr></hr>
            <Link to="/admin/product/incomplete">Incomplete Products</Link><hr></hr>
            <Link to="/admin/product/update">Update Products Detailes</Link><hr></hr>
            <Link to="/admin/coupon">Create Coupon</Link><hr></hr>
            <Link to="/admin/chart/orders">All Orders Chart</Link><hr></hr>
        </div>
    )
};

export default Dashboard;