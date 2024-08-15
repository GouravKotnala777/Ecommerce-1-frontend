import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useLoginMutation } from "../redux/api/api";
import HandleMutationRes from "../components/HandleMutationRes";
import { MutationResTypes } from "../assets/demoData";

export const loginFormFields = [
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"password", placeHolder:"Password"},
];

const Login = () => {
    const [formData, setFormData] = useState<{email?:string; password?:string;}>();
    const [login] = useLoginMutation();
    const [loginRes, setLoginRes] = useState<MutationResTypes>();


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        try {
            const res = await login(formData);
            
            console.log("----- Login.Page.tsx onClickHandler");
            console.log(res);
            setLoginRes(res);

            if (res.data) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
            console.log("----- Login.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Login.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Login.Page.tsx onClickHandler");
        }

    };

    return(
        <div className="login_bg">
            <HandleMutationRes res={loginRes} />
            <Form heading="Login" formFields={loginFormFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler}  />
        </div>
    )
};

export default Login;