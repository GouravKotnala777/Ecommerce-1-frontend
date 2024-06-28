import { ChangeEvent, useState } from "react";
import Form from "../components/Form";

const formFields = [
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"mobile", placeHolder:"Mobile"},
    {type:"text", name:"password", placeHolder:"Password"},
    {type:"text", name:"c_password", placeHolder:"Confirm Password"}
];

const Register = () => {
    const [formData, setFormData] = useState<{name?:string; email?:string; mobile?:string; password?:string; c_password?:string;}>();


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = () => {
        console.log(formData);
    };

    return(
        <div className="register_bg">
            <Form heading="Register" formFields={formFields} onChangeHandler={onChangeHandler} onClickHandler={onClickHandler}  />
        </div>
    )
};

export default Register;