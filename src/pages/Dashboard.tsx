import { Link } from "react-router-dom";


const Dashboard = () => {
    return(
        <div className="dashboard_bg">
            <h1>Dashboard</h1>
            <Link to="/admin/outstock">Outstock Products</Link>
            <button>Fetch</button>
        </div>
    )
};

export default Dashboard;