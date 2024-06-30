import { ChangeEvent, useState } from "react";
import Form from "../components/Form";


interface AddProductFormType {
    category?:string;
    brand?:string;
    name?:string;
    description?:string;
    price?:number;
    stock?:number;
    height?:number;
    width?:number;
    depth?:number;
    weight?:number;
    tags?:string;
    images?:string;
}
const formFields = [
    {type:"text", name:"category", placeHolder:"Category"},
    {type:"text", name:"brand", placeHolder:"Brand"},
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"price", placeHolder:"Price"},
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
    const [formData, setFormData] = useState<AddProductFormType>();


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = () => {
        console.log(formData);        
    };

    return(
        <div className="add_product_bg">
            <Form heading="Add Product" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler} />
        </div>
    )
}

export default AddProduct;