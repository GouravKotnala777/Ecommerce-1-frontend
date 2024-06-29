import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useRegisterMutation } from "../redux/api/api";

const formFields = [
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"mobile", placeHolder:"Mobile"},
    {type:"text", name:"password", placeHolder:"Password"},
    {type:"text", name:"c_password", placeHolder:"Confirm Password"}
];

const Register = () => {
    const [formData, setFormData] = useState<{name?:string; email?:string; mobile?:string; password?:string; c_password?:string;}>();
    const [register] = useRegisterMutation();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        console.log(formData);
        
        try {
            const res = register(formData);

            console.log("----- Register.Page.tsx onClickHandler");
            console.log(res);
            console.log("----- Register.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Register.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Register.Page.tsx onClickHandler");
        }

        //try {
        //    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/new`, {
        //        method:"POST",
        //        headers:{
        //            "Content-Type":"application/json"
        //        },
        //        credentials:"include",
        //        body:JSON.stringify(formData)
        //    });
    
        //    const data = await res.json();
            
        //    console.log("----- Register.Page.tsx onClickHandler");
        //    console.log(data);
        //    console.log("----- Register.Page.tsx onClickHandler");
        //} catch (error) {
        //    console.log("----- Register.Page.tsx onClickHandler");
        //    console.log(error);
        //    console.log("----- Register.Page.tsx onClickHandler");
        //}

        
    };

    return(
        <div className="register_bg">
            <Form heading="Register" formFields={formFields} onChangeHandler={onChangeHandler} onClickHandler={onClickHandler}  />
        </div>
    )
};

export default Register;