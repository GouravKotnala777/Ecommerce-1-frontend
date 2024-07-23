import "../styles/pages/home.scss";
import Products from "../components/Products";
import GroupedProducts from "../components/GoupedProducts";
import { useFindAllFieldsQuery, useGetAllProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const allProducts:{data?:{message:ProductTypes[]}} = useGetAllProductsQuery("");
    const arrayOfCategories:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"category"});
    const arrayOfBrands:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"brand"});
    const [searchQry, setSearchQry] = useState<string>("");
    const navigate = useNavigate();


    const searchClickHandler = () => {
        navigate(`/product/search/${searchQry}`)
    };
    return(
        <div className="home_bg">
            {/*<h1>Home</h1>
            <p>{searchQry}</p>*/}
            <div className="home_sub_accessbar">
                <div className="search_inp_cont">
                    <input type="text" name="search_inp" className="search_inp" placeholder="Search..." onChange={(e) => setSearchQry(e.target.value)} />
                    <button onClick={searchClickHandler}>Search</button>
                </div>
            </div>
            <Products products={allProducts.data?.message} />

            {
                arrayOfCategories.data?.message &&
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
            }
            {
                arrayOfBrands.data?.message &&
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
            }
            {
                arrayOfBrands.data?.message &&
                    <div className="grouped_products_conts">
                        <div className="heading">High Rated</div>
                        <div className="products">
                            {
                                [3, 4, 5].map((rating, index) => (
                                    <GroupedProducts key={index} query="rating" value={rating}  />
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
};

export default Home;