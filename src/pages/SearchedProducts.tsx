import "../styles/pages/searched_products.scss";
import { useParams } from "react-router-dom";
import { useSearchProductsMutation} from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Form, { FormFieldTypes } from "../components/Form";
import { UserLocationTypes } from "./Login.Page";
//import Spinner from "../components/Spinner";


//const onPriceChange = {min:0, max:1000};

const formFields:FormFieldTypes[] = [
    {type:"select", name:"category", placeHolder:"Category", options:["Protein", "Pre-Workout", "Post-Workout", "Performance-Enhancers", "Vitamins-Minerals", "Weight-Management", "Hydration", "Health-Wellness"]},
    {type:"select", name:"sub_category", placeHolder:"Sub Category", options:[
        
        "",
        "Protein_Whey",
        "Protein_Casein",
        "Protein_Plant_Based",
        "Protein_Blends",
        "Protein_Bars",
        "",
        "Pre_Workout_Powders",
        "Pre_Workout_Drinks",
        "Pre_Workout_Capsules",
        "",
        "Post_Workout_BCAAs",
        "Post_Workout_Glutamine",
        "Post_Workout_Electrolytes",
        "",
        "Performance_Enhancers_Creatine",
        "Performance_Enhancers_Nitric_Oxide",
        "Performance_Enhancers_Testosterone",
        "",
        "Vitamins_Minerals_Multivitamins",
        "Vitamins_Minerals_Vitamin_D",
        "Vitamins_Minerals_Omega_3",
        "Vitamins_Minerals_Calcium",
        "Vitamins_Minerals_Magnesium",
        "",
        "Weight_Management_Fat_Burners",
        "Weight_Management_Appetite_Suppressants",
        "Weight_Management_Meal_Replacements",
        "Weight_Management_Weight_Gainers",
        "",
        "Hydration_Electrolyte_Drinks",
        "Hydration_Hydration_Powders",
        "Hydration_Sports_Drinks",
        "",
        "Health_Wellness_Immune_Support",
        "Health_Wellness_Joint_Support",
        "Health_Wellness_Digestive_Health",
        "Health_Wellness_Antioxidants",
    ]},
    {type:"select", name:"sub_category_type", placeHolder:"Sub Category Type", options:[
        "Whey_Protein_Isolate",
        "Whey_Protein_Concentrate",
        "Whey_Protein_Hydrolysate",
        "",
        "Plant_Based_Protein_Pea",
        "Plant_Based_Protein_Soy",
        "Plant_Based_Protein_Hemp",
        "",
        "Pre_Workout_Stimulant_Based",
        "Pre_Workout_Non_Stimulant",
        "",
        "Creatine_Monohydrate",
        "Creatine_Micronized",
        "",
        "Nitric_Oxide_Arginine",
        "Nitric_Oxide_Citrulline",
        "",
        "Weight_Management_Thermogenics",
        "Weight_Management_CLA"
    ]},
    {type:"select", name:"brand", placeHolder:"Brand", options:["Avvatar", "Asitis", "Optimum", "Raw", "Labrada", "Bigflex", "MuscleTech", "BigMuscle"]}

];
let skip:number = 0;


const SearchedProducts = ({userLocation}:{userLocation:UserLocationTypes;}) => {
    const {searchQry} = useParams();
    const [searchedProducts] = useSearchProductsMutation();
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [aa, setAa] = useState<{minPrice:number; maxPrice:number;}>({minPrice:0, maxPrice:10000});
    const [filter, setFilter] = useState<{category:string; sub_category:string; brand:string; price:{minPrice?:number; maxPrice?:number;}}>({category:"", sub_category:"", brand:"", price:{minPrice:0, maxPrice:10000}});
    const searchedProductsBg = useRef<HTMLDivElement>(null);
    const fetchAgainRef = useRef<boolean>(true);


    const filterChangeHandler = (e:ChangeEvent<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement>) => {
        setFilter({...(filter as {
            category: string;
            sub_category: string;
            brand: string;
            price: {
                minPrice?: number;
                maxPrice?: number;
            };
        }), [e.target.name]:e.target.value});
    };

    const firstTimeFetching = async(runByFilter?:boolean) => {
        try {
            if (runByFilter) {
                skip = 0;
            }
            //console.log(filter);
            console.log({searchQry:searchQry as string, skip:skip, limit:5, category:filter?.category, sub_category:filter?.sub_category, brand:filter?.brand, price:{minPrice:aa.minPrice, maxPrice:aa.maxPrice}});
            
            const searchedProductsRes:{data?:{message:ProductTypes[];}} = await searchedProducts({searchQry:searchQry as string, skip:skip, limit:5, category:filter.category, sub_category:filter.sub_category, brand:filter.brand, price:{minPrice:aa.minPrice, maxPrice:aa.maxPrice,}, action:"search_product", userLocation});


            if (runByFilter) {
                fetchAgainRef.current = true;
                setProducts([...searchedProductsRes.data?.message as ProductTypes[]]);
                console.log("------- firstTimeFetchingRunByFilter");
                console.log(searchedProductsRes);
                console.log("------- firstTimeFetchingRunByFilter");
            }
            else{
                if (searchedProductsRes.data?.message && searchedProductsRes.data?.message.length > 4) {
                    setProducts((prev) => [...prev, ...searchedProductsRes.data?.message as ProductTypes[]]);
                    console.log("------- firstTimeFetching1");
                    console.log(searchedProductsRes);
                    console.log("------- firstTimeFetching1");
                    fetchAgainRef.current = true;
                    skip = skip+1;
                }
                else if (searchedProductsRes.data?.message && searchedProductsRes.data?.message.length <= 4) {
                    if (fetchAgainRef.current === true) {
                        setProducts((prev) => [...prev, ...searchedProductsRes.data?.message as ProductTypes[]]);
                        console.log("------- firstTimeFetching2");
                        console.log(searchedProductsRes);
                        console.log("------- firstTimeFetching2");
                        fetchAgainRef.current = false;
                    }
                    else{
                        console.log(":::::::::::::");
                    }
                }
            }
        } catch (error) {
            console.log("------- firstTimeFetching error");
            console.log(error);
            console.log("------- firstTimeFetching error");
            
        }

    };

    useEffect(() => {
        const handleScroll = () => {
            if (searchedProductsBg.current) {
                const productsCont = searchedProductsBg.current;
                if (productsCont.scrollTop + productsCont.clientHeight+5 >= productsCont.scrollHeight) {
                    if (fetchAgainRef.current) {
                        firstTimeFetching();
                    }
                }
            }
        };
        
        const productsCont = searchedProductsBg.current;
        if (productsCont) {
            productsCont.addEventListener("scroll", handleScroll);
        }
        
        return () => {
            if (productsCont) {
                productsCont.removeEventListener('scroll', handleScroll);
            }
        };
    }, [aa, filter]);


    useEffect(() => {
        firstTimeFetching();
    }, []);
    

    return (
        <div ref={searchedProductsBg} id="searched_products_bg" className="searched_products_bg">
            <div className="filters_cont">
                <Form heading="Filter" formFields={formFields} onChangeHandler={(e) => filterChangeHandler(e)} onClickHandler={() => firstTimeFetching(true)} aa={aa} setAa={setAa} />
                <button onClick={() => firstTimeFetching()}>Filter</button>
            </div>
            <div id="products_cont" className="products_cont">
                {
                    products.map(({_id, name, price, category, description, rating, images}, index) => (
                        <SingleProductTemplate key={index} userLocation={userLocation} parent="singleProduct" name={name} price={price} quantity={1} category={category} description={description} rating={rating} productID={_id} photo={images[0]} />
                    ))
                }
                {/*{isLoading && <h1>HHHHHHHHHHHHHHHHHH</h1>}*/}

                {/*<Spinner type={1} width={30} thickness={3} />*/}
            </div>
        </div>
    )
};

export default SearchedProducts;