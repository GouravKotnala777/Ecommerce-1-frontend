import "../styles/pages/login.scss";
import { ChangeEvent, useEffect, useState } from "react";
import Form from "../components/Form";
import { register, ResponseType } from "../redux/api/api";
import HandleMutationRes from "../components/HandleMutationRes";
import { Link, useSearchParams } from "react-router-dom";

export const registerFormFields = [
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"mobile", placeHolder:"Mobile"},
    {type:"text", name:"password", placeHolder:"Password"},
    {type:"text", name:"c_password", placeHolder:"Confirm Password"}
];

const Register = () => {
    const [formData, setFormData] = useState<{name?:string; email?:string; mobile?:string; password?:string; c_password?:string;}>({name:"", email:"", mobile:"", password:"", c_password:""});
    const [registerRes, setResgisterRes] = useState<ResponseType<string|Error>>();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        setIsLoading(true);
        console.log({...formData, referrerUserID:searchParams.get("referrerUserID")});
        
        try {
            const res = await register({...formData, referrerUserID:searchParams.get("referrerUserID")});
            console.log("----- Register.Page.tsx onClickHandler");
            console.log(res);
            setResgisterRes(res);
            console.log("----- Register.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Register.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Register.Page.tsx onClickHandler");
        }        
        setIsLoading(false);
    };

    useEffect(() => {
        const referrerUserID = searchParams.get("referrerUserID");
        console.log({referrerUserID});
    }, []);

    return(
        <div className="login_bg">
            <HandleMutationRes duration={6000} res={registerRes} />
            <Form isLoading={isLoading} heading="Register" formFields={registerFormFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler} />
            <div className="lower_part">
                <button></button>
                <div className="dont_have_acc"> already have account <Link to="/user/login"> Login</Link></div>
            </div>
        </div>
    )
};

export default Register;