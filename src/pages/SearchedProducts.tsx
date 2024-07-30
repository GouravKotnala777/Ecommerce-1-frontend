import "../styles/pages/searched_products.scss";
import { useParams } from "react-router-dom";
import { useSearchProductsMutation} from "../redux/api/api";
import { ProductTypes } from "../assets/demoData";
import SingleProductTemplate from "../components/SingleProductTemplate";
import { ChangeEvent, useEffect, useState } from "react";
import Form, { FormFieldTypes } from "../components/Form";


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


const SearchedProducts = () => {
    const {searchQry} = useParams();
    //const searchedProducts:{data?:{message:ProductTypes[];}} = useSearchProductsQuery({searchQry:searchQry as string});
    const [searchedProducts] = useSearchProductsMutation();
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [aa, setAa] = useState<{minPrice:number; maxPrice:number;}>({minPrice:0, maxPrice:10000});
    const [filter, setFilter] = useState<{category:string; sub_category:string; brand:string; price:{minPrice?:number; maxPrice?:number;}}>({category:"", sub_category:"", brand:"", price:{minPrice:0, maxPrice:10000}});


    const filterChangeHandler = (e:ChangeEvent<HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement>) => {
        setFilter({...filter, [e.target.name]:e.target.value});
    };

    const func = async() => {
        try {
            const searchedProductsRes:{data?:{message:ProductTypes[];}} = await searchedProducts({searchQry:searchQry as string, category:filter.category, sub_category:filter.sub_category, brand:filter.brand, price:{minPrice:aa.minPrice, maxPrice:aa.maxPrice}});

            setProducts(searchedProductsRes.data?.message as ProductTypes[]);
            console.log("------- Func");
            console.log(searchedProductsRes);
            console.log("------- Func");
            
        } catch (error) {
            console.log("------- Func");
            console.log(error);
            console.log("------- Func");
            
        }

    };

    useEffect(() => {
        func();
    }, [searchQry]);
    

    return (
        <div className="searched_products_bg">
            <div className="filters_cont">
                {/*<pre>{JSON.stringify(range, null, `\t`)}</pre>
                <pre>{JSON.stringify(filter, null, `\t`)}</pre>*/}

                <Form heading="Filter" formFields={formFields} onChangeHandler={(e) => filterChangeHandler(e)} onClickHandler={func} aa={aa} setAa={setAa} />


                
                <button onClick={func}>Filter</button>
            </div>
            <div className="products_cont">
                {
                    products.map(({_id, name, price, category, description, rating, images}) => (
                        <SingleProductTemplate parent="singleProduct" name={name} price={price} quantity={1} category={category} description={description} rating={rating} productID={_id} photo={images[0]} />
                    ))
                }
            </div>
        </div>
    )
};

export default SearchedProducts;