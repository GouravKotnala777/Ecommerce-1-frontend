import "../styles/pages/home.scss";
import Products from "../components/Products";
import GroupedProducts from "../components/GoupedProducts";
import { useFindAllFieldsQuery, useGetAllProductsQuery } from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import ItemNotFound from "../components/ItemNotFound";


const Home = () => {
    const [skip, setSkip] = useState<number>(0);
    const allProducts:{
        isLoading:boolean;
        data?:{success:boolean; message:ProductTypes[]; totalProducts:number;};
        error?:FetchBaseQueryError | SerializedError;
    } = useGetAllProductsQuery(skip);
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

    //const func = () => {
    //    if (allProducts.error) {
    //        if ("data" in allProducts.error &&
    //            allProducts.error.data &&
    //            typeof allProducts.error.data === "object" &&
    //            "message" in allProducts.error.data
    //        ) {
    //            return <pre>{JSON.stringify(allProducts.error?.data.message, null, `\t`)}</pre>
    //        }
    //        else{
    //            return <></>
    //        }
    //    }
    //}

    return(
        <div className="home_bg">
            {
                allProducts.data?.message &&
                    <div className="home_sub_accessbar">
                        <div className="search_inp_cont">
                            <input type="text" id="search_inp" name="search_inp" onFocus={onFocusSearchInp} onBlur={onBlurSearchInp} className="search_inp" placeholder="Search..." onChange={(e) => setSearchQry(e.target.value)} />
                            <button id="search_btn" onClick={searchClickHandler}>Go</button>
                        </div>
                    </div>
            }
            {
                allProducts.isLoading ?
                    <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                    :
                    allProducts.error &&
                    "data" in allProducts.error &&
                    allProducts.error.data &&
                    typeof allProducts.error.data === "object" &&
                    "message" in allProducts.error.data ?
                        <ItemNotFound statusCode={allProducts.error.status as number} heading={allProducts.error?.data.message as string} />
                        :
                        allProducts.data?.message.length !== 0 &&
                            <Products products={allProducts.data?.message} />
            }
            {
                allProducts.data?.message &&
                <>
                    <div className="pagination_number">{
                        `${skip+1} of ${Math.ceil((allProducts.data?.totalProducts as number)/5)}`
                    }</div>
                    <Pagination documentCount={Math.ceil((allProducts.data?.totalProducts as number)/5)-1} skip={skip} setSkip={setSkip} />
                </>
            }
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