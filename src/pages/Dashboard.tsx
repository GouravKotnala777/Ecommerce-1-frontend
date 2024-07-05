import { useState } from "react";
//import { useOutStockProductsQuery } from "../redux/api/api";
import { Link } from "react-router-dom";


const Dashboard = () => {
    //const outStockData = useOutStockProductsQuery("");
    const [aa, setAa] = useState<string>();

    return(
        <div className="dashboard_bg">
            <h1>Dashboard</h1>

            <Link to="/admin/outstock">Outstock Products</Link>
            <pre>{JSON.stringify(aa, null, `\t`)}</pre>
            <button onClick={() => setAa("aaaa")}>Fetch</button>
        </div>
    )
};

export default Dashboard;