import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import { useRegisterMutation } from "../redux/api/api";
import { MutationResTypes } from "../assets/demoData";
import HandleMutationRes from "../components/HandleMutationRes";
import { Link } from "react-router-dom";

export const registerFormFields = [
    {type:"text", name:"name", placeHolder:"Name"},
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"mobile", placeHolder:"Mobile"},
    {type:"text", name:"password", placeHolder:"Password"},
    {type:"text", name:"c_password", placeHolder:"Confirm Password"}
];

const Register = () => {
    const [formData, setFormData] = useState<{name?:string; email?:string; mobile?:string; password?:string; c_password?:string;}>();
    const [register] = useRegisterMutation();
    const [registerRes, setResgisterRes] = useState<MutationResTypes>();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        console.log(formData);
        
        try {
            const res = await register(formData);
            console.log("----- Register.Page.tsx onClickHandler");
            console.log(res);
            setResgisterRes(res);
            console.log("----- Register.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Register.Page.tsx onClickHandler");
            console.log(error);
            console.log("----- Register.Page.tsx onClickHandler");
        }        
    };

    return(
        <div className="register_bg">
            <HandleMutationRes res={registerRes} />
            <Form heading="Register" formFields={registerFormFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler} />
            <div className="lower_part" style={{display:"flex", justifyContent:"space-between", maxWidth:"380px", margin:"10px auto", padding:"15px 10px", borderRadius:"8px", boxShadow:"01px 0.1px 4px 0.2px #f44b69", background:"white"}}>
                <button style={{border:"none", background:"transparent", textDecoration:"underline", textDecorationColor:"blue", fontSize:"0.8rem", color:"blue"}}></button>
                <div className="register" style={{fontSize:"0.8rem"}}> already have account <Link to="/user/login"> Login</Link></div>
            </div>
        </div>
    )
};

export default Register;