import "../styles/pages/home.scss";
import Products from "../components/Products.tsx";
import GroupedProducts from "../components/GoupedProducts.tsx";
import { useFindAllFieldsQuery, useGetAllProductsQuery, useSearchProductsMutation } from "../redux/api/api.ts";
import { ProductTypes } from "../assets/demoData.ts";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FocusEvent, MouseEvent, useEffect, useState } from "react";
import Pagination from "../components/Pagination.tsx";
import Spinner from "../components/Spinner.tsx";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import ItemNotFound from "../components/ItemNotFound.tsx";
import { BiSearch } from "react-icons/bi";
import Footer from "../components/Footer.tsx";
import { UserLocationTypes } from "./Login.Page.tsx";


const Home = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const [skip, setSkip] = useState<number>(0);
    const allProducts:{
        isLoading:boolean;
        data?:{success:boolean; message:ProductTypes[]; totalProducts:number;};
        error?:FetchBaseQueryError | SerializedError;
    } = useGetAllProductsQuery(skip);
    const arrayOfCategories:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"category"});
    const arrayOfBrands:{data?:{message:string[];}} = useFindAllFieldsQuery({groupedBy:"brand"});
    const [searchQry, setSearchQry] = useState<string>("");
    const [searchedProducts] = useSearchProductsMutation();
    const navigate = useNavigate();
    const [suggession, setSuggession] = useState<{name:string;}[]>();


    const searchClickHandler = () => {
        navigate(`/product/search/${searchQry}`)
    };
    const onFocusSearchInp = (e:FocusEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const homeBg = document.getElementById("home_bg");
        const searchInp = document.getElementById("search_inp");
        const searchBtn = document.getElementById("search_btn");
        const productSuggessionCont = document.getElementById("product_suggession_cont");
        (searchInp as HTMLElement).style.zIndex = "11";
        (searchBtn as HTMLElement).style.zIndex = "11";
        
        if (homeBg) {
            (homeBg as HTMLElement).classList.add("add_overlay");
            document.body.classList.add("freeze");
        }
        if (productSuggessionCont) {
            productSuggessionCont.style.display = "block";
        }
    };
    const onBlurSearchInp = (e:FocusEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };
    const onClickOverlay = (e:MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const homeBg = document.getElementById("home_bg");
        const productSuggessionCont = document.getElementById("product_suggession_cont");
        if ((homeBg as HTMLElement).classList.contains("add_overlay")) {
            (homeBg as HTMLElement).classList.remove("add_overlay");
            document.body.classList.remove("freeze");
        }
        
        if (productSuggessionCont) {
            productSuggessionCont.style.display = "none";
        }
    };
    const searchInpChangeHandler = async(e:ChangeEvent<HTMLInputElement>) => {
        setSearchQry(e.target.value);
    }
    const onClickSuggessionHandler = (e:MouseEvent<HTMLDivElement>) => {
        setSearchQry(e.currentTarget.innerText);
        navigate(`/product/search/${e.currentTarget.innerText}`)
    };
    

    useEffect(() => {
        const rr = setTimeout(async() => {
            const dddd:{data?:{message:ProductTypes[]}} = await searchedProducts({
                searchQry:searchQry,
                skip:skip,
                category:"",
                sub_category:"",
                brand:"",
                price:{minPrice:0, maxPrice:20000},
                limit:0
            });
            const croppedData = dddd.data?.message
            .map((item) => ({name:item.name.toLowerCase()}))
            .filter((item2) => item2.name.includes(searchQry.toLowerCase())).splice(0,10);

            setSuggession(
                croppedData
            )
            
        }, 1000);
        return () => clearTimeout(rr);
    }, [searchQry]);

    return(
        <>
            <div id="home_bg" className="home_bg" onClick={(e) => {onClickOverlay(e)}}>
            {
                allProducts.isLoading ?
                    //<h1>loading...</h1>
                    <Spinner type={1} heading="Loading..." width={100} thickness={6} />
                    :
                    allProducts.error &&
                    "data" in allProducts.error &&
                    allProducts.error.data &&
                    typeof allProducts.error.data === "object" &&
                    "message" in allProducts.error.data ?
                        <ItemNotFound heading={allProducts.error?.data.message as string} statusCode={allProducts.error.status as number} />
                        :
                        allProducts.data?.message ?
                            allProducts.data?.message.length === 0 ?
                                <ItemNotFound heading={"You have not ordered anything yet!"} statusCode={204} />
                                :
                                <>
                                    <div className="home_sub_accessbar">
                                        <div className="search_inp_cont">
                                            <input value={searchQry} type="text" id="search_inp" name="search_inp" onFocus={(e) => onFocusSearchInp(e)} onBlur={(e) => onBlurSearchInp(e)} onClick={(e) => {e.stopPropagation()}} className="search_inp" placeholder="Search..." onChange={(e) => searchInpChangeHandler(e)} />
                                            <button id="search_btn" onClick={searchClickHandler}>Go</button>
                                            <div id="product_suggession_cont" className="product_suggession_cont">
                                                {
                                                    suggession?.map((item, index) => (
                                                        <div key={index} className="row" onClick={(e) => {onClickSuggessionHandler(e)}}>
                                                            <div className="col">
                                                                <BiSearch />
                                                            </div>
                                                            <div className="col">
                                                                <span className="span_left">{item.name.split(searchQry.toLowerCase())[0]}</span>
                                                                <span className="span_middle">{searchQry.toLowerCase()}</span>
                                                                <span className="span_right">{item.name.split(searchQry.toLowerCase())[1]}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <Products userLocation={userLocation} products={allProducts.data?.message} />     
                                </>
                            :
                            <ItemNotFound heading={"No Internet Connection!"} statusCode={523} />

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
            <Footer />
        </>
    )
};

export default Home;