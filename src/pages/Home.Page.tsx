import "../styles/pages/home.scss";
import Products from "../components/Products";
import GroupedProducts from "../components/GoupedProducts";
import { useFindAllFieldsQuery, useGetAllProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/Pagination";


const Home = () => {
    const [skip, setSkip] = useState<number>(0);
    
    const allProducts:{data?:{message:ProductTypes[]; totalProducts:number;}} = useGetAllProductsQuery(skip);
    const arrayOfCategories:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"category"});
    const arrayOfBrands:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"brand"});
    const [searchQry, setSearchQry] = useState<string>("");
    const navigate = useNavigate();


    const searchClickHandler = () => {
        navigate(`/product/search/${searchQry}`)
    };

    const onFocusSearchInp = () => {
        console.log("focus");
        const body = document.body;
        const searchInp = document.getElementById("search_inp");
        const searchBtn = document.getElementById("search_btn");
        (searchInp as HTMLElement).style.zIndex = "11";
        (searchBtn as HTMLElement).style.zIndex = "11";
        
        if (body) {
            (body as HTMLElement).classList.add("add_overlay");
            (body as HTMLElement).classList.add("freeze");
        }
    };
    const onBlurSearchInp = () => {
        console.log("blur");
        const body = document.body;
        const searchInp = document.getElementById("search_inp");
        const searchBtn = document.getElementById("search_btn");
        (searchInp as HTMLElement).style.zIndex = "0";
        (searchBtn as HTMLElement).style.zIndex = "0";
        if (body) {
            (body as HTMLElement).classList.remove("add_overlay");
            (body as HTMLElement).classList.remove("freeze");
        }
    };

    return(
        <div className="home_bg">
            {/*<h1>Home</h1>
            <p>{searchQry}</p>*/}
            <div className="home_sub_accessbar">
                <div className="search_inp_cont">
                    <input type="text" id="search_inp" name="search_inp" onFocus={onFocusSearchInp} onBlur={onBlurSearchInp} className="search_inp" placeholder="Search..." onChange={(e) => setSearchQry(e.target.value)} />
                    <button id="search_btn" onClick={searchClickHandler}>Go</button>
                </div>
            </div>
            <Products products={allProducts.data?.message} />

            <div className="pagination_number">{
                `${skip+1} of ${Math.ceil((allProducts.data?.totalProducts as number)/5)}`
            }</div>
            <Pagination documentCount={Math.ceil((allProducts.data?.totalProducts as number)/5)-1} skip={skip} setSkip={setSkip} />

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