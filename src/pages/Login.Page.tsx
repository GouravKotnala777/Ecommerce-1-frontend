import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useLoginMutation } from "../redux/api/api";

const formFields = [
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"password", placeHolder:"Password"},
];

const Login = () => {
    const [formData, setFormData] = useState<{email?:string; password?:string;}>();
    const [login] = useLoginMutation();


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        console.log(formData);

        try {
            const res = await login(formData);
            
            console.log("----- Login.Page.tsx onClickHandler");
            console.log(res);
            console.log("----- Login.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Login.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Login.Page.tsx onClickHandler");
        }

    };

    return(
        <div className="login_bg">
            <Form heading="Login" formFields={formFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler}  />
        </div>
    )
};

export default Login;