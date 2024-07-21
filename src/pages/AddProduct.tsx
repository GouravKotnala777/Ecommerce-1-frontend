import { ChangeEvent, useState } from "react";
import Form, { FormFieldTypes } from "../components/Form";
import { useAddProductMutation } from "../redux/api/api";


interface AddProductFormType {
    category?:string;
    brand?:string;
    name?:string;
    description?:string;
    price?:string;
    stock?:string;


    sub_category?:string;
    sub_category_type?:string;
    item_form?:string;


    height?:string;
    width?:string;
    depth?:string;
    weight?:string;
    tags?:string;
    images?:string;
}
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
    {type:"text", name:"brand", placeHolder:"Brand"},
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"price", placeHolder:"Price"},
    {type:"text", name:"flavour", placeHolder:"Flavour"},
    {type:"select", name:"item_form", placeHolder:"Item Form", options:["Liquid", "Powder", "Tablet", "Capsule"]},
    {type:"select", name:"diet_type", placeHolder:"Diet Type", options:["Veg", "Non_Veg", "Vegan", "Dairy", "Egg", "Fish"]},
    {type:"text", name:"stock", placeHolder:"Stock"},
    {type:"text", name:"height", placeHolder:"Height"},
    {type:"text", name:"width", placeHolder:"Width"},
    {type:"text", name:"depth", placeHolder:"Depth"},
    {type:"text", name:"weight", placeHolder:"Weight"},
    {type:"text", name:"tags", placeHolder:"Tags"},
    {type:"file", name:"images", placeHolder:"Images"},
    {type:"textArea", name:"description", placeHolder:"Description"}
];

const AddProduct = () => {
    const [fieldData, setFieldData] = useState<AddProductFormType>();
    const [photo, setPhoto] = useState<File|undefined>();
    const [addProduct] = useAddProductMutation();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        if (e.target.type === "file") {
            if ((e as ChangeEvent<HTMLInputElement>).target.files && (e as ChangeEvent<HTMLInputElement>)?.target?.files!.length > 0) {
                setPhoto((e as ChangeEvent<HTMLInputElement>)?.target?.files![0])
            }
        }
        else{
            setFieldData({...fieldData, [e.target.name]:e.target.value});
        }
    };
    const onClickHandler = async() => {
        console.log(fieldData);
        
        
        const formData = new FormData();
        
        formData.append("category", fieldData?.category as string);
        formData.append("brand", fieldData?.brand as string);
        formData.append("name", fieldData?.name as string);
        formData.append("price", fieldData?.price as string);
        formData.append("stock", fieldData?.stock as string);
        
        formData.append("sub_category", fieldData?.sub_category as string);
        formData.append("sub_category_type", fieldData?.sub_category_type as string);
        formData.append("item_form", fieldData?.item_form as string);


        formData.append("height", fieldData?.height as string);
        formData.append("width", fieldData?.width as string);
        formData.append("depth", fieldData?.depth as string);
        formData.append("weight", fieldData?.weight as string);
        formData.append("tags", fieldData?.tags as string);
        formData.append("images", photo as File);
        formData.append("description", fieldData?.description as string);
        
        try {
            
            const res = await addProduct(formData)

            console.log("------- AddProduct.tsx onClickHandler");
            console.log(res);
            console.log("------- AddProduct.tsx onClickHandler");
        } catch (error) {
            console.log("------- AddProduct.tsx onClickHandler");
            console.log(error);
            console.log("------- AddProduct.tsx onClickHandler");
            
            
        }
    };

    return(
        <div className="add_product_bg">
            <Form heading="Add Product" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler} />
        </div>
    )
}

export default AddProduct;