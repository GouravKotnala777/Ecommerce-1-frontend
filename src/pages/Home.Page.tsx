import "../styles/pages/home.scss";
import Products from "../components/Products";


const Home = () => {
    //import.meta.env.VITE_SERVER_URL

    return(
        <div className="home_bg">
            <h1>Home</h1>
            <Products />
        </div>
    )
};

export default Home;