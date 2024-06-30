import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useAddProductMutation } from "../redux/api/api";


interface AddProductFormType {
    category?:string;
    brand?:string;
    name?:string;
    description?:string;
    price?:string;
    stock?:string;
    height?:string;
    width?:string;
    depth?:string;
    weight?:string;
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
    const [fieldData, setFieldData] = useState<AddProductFormType>();
    const [photo, setPhoto] = useState<File|undefined>();
    const [addProduct] = useAddProductMutation();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
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
        
        const formData = new FormData();
        
        formData.append("category", fieldData?.category as string);
        formData.append("brand", fieldData?.brand as string);
        formData.append("name", fieldData?.name as string);
        formData.append("price", fieldData?.price as string);
        formData.append("stock", fieldData?.stock as string);
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