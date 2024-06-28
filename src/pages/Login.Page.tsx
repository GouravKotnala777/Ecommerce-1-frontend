import { ChangeEvent, useState } from "react";
import Form from "../components/Form";

const formFields = [
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"password", placeHolder:"Password"},
];

const Login = () => {
    const [formData, setFormData] = useState<{email?:string; password?:string;}>();


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = () => {
        console.log(formData);
    };

    return(
        <div className="login_bg">
            <Form heading="Login" formFields={formFields} onChangeHandler={onChangeHandler} onClickHandler={onClickHandler}  />
        </div>
    )
};

export default Login;