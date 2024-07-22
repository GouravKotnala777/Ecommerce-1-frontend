import "../styles/pages/home.scss";
import Products from "../components/Products";
import GroupedProducts from "../components/GoupedProducts";
import { useFindAllFieldsQuery, useGetAllProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";


const Home = () => {
    const allProducts:{data?:{message:ProductTypes[]}} = useGetAllProductsQuery("");
    const arrayOfCategories:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"category"});
    const arrayOfBrands:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"brand"});
    return(
        <div className="home_bg">
            <h1>Home</h1>
            <Products products={allProducts.data?.message} />
            <div className="grouped_products_conts">
                <div className="heading">All Categories</div>
                <div className="products">
                    {
                        arrayOfCategories.data?.message.map((category, index) => (
                            <GroupedProducts key={index} query="category" value={category}  />
                        ))
                    }
                </div>
            </div>
            <div className="grouped_products_conts">
                <div className="heading">All Brands</div>
                <div className="products">
                    {
                        arrayOfBrands.data?.message.map((brand, index) => (
                            <GroupedProducts key={index} query="brand" value={brand}  />
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;