import "../styles/pages/login.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Form from "../components/Form";
import { forgetPassword, login, ResponseType } from "../redux/api/api";
import HandleMutationRes from "../components/HandleMutationRes";
import DialogWrapper from "../components/DialogWrapper";
import { Link } from "react-router-dom";

export interface UserLocationTypes {
    city:string;
    country:string;
    ip:string;
    loc:string;
    org:string;
    postal:string;
    readme:string;
    region:string;
    timezone:string;
}

export const loginFormFields = [
    {type:"text", name:"email", placeHolder:"Email"},
    {type:"text", name:"password", placeHolder:"Password"},
];

const Login = ({userLocation}:{userLocation:UserLocationTypes}) => {
    const [formData, setFormData] = useState<{email:string; password:string;}>({email:"", password:""});
    //const [login] = useLoginMutation();
    const [loginRes, setLoginRes] = useState<ResponseType<string|Error>>();
    const [isForgetPassDialogOpen, setIsForgetPassDialogOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //const [userLocation, setUserLocation] = useState<UserLocationTypes>({city:"", country:"", ip:"", loc:"", org:"", postal:"", readme:"", region:"", timezone:""});



    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const onClickHandler = async() => {
        setIsLoading(true);
        try {
            const loginRes = await login({...formData, action:"signin", userLocation
                //ipAddress:"1210002", userAgent:"chrome", userLocation:"faridabad", platform:"web", device:"windows", referrer:"google", success:false
            });
            
            console.log("----- Login.Page.tsx onClickHandler");
            console.log(loginRes);
            setLoginRes(loginRes);

            if (loginRes.success) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
            console.log("----- Login.Page.tsx onClickHandler");
        } catch (error) {
            console.log("----- Login.Page.tsx onClickHandler error");
            console.log(error);
            console.log("----- Login.Page.tsx onClickHandler error");
        }
        setIsLoading(false);
    };

    return(
        <div className="login_bg">
            <DialogWrapper Element={<ForgetPasswordDialog email={email} setEmail={setEmail} setIsForgetPassDialogOpen={setIsForgetPassDialogOpen} userLocation={userLocation} />} toggler={isForgetPassDialogOpen} setToggler={setIsForgetPassDialogOpen} />
            <HandleMutationRes duration={6000} res={loginRes} />
            {/*<pre>{JSON.stringify(userLocation, null, `\t`)}</pre>*/}
            <Form isLoading={isLoading} heading="Login" formFields={loginFormFields} onChangeHandler={(e) => onChangeHandler(e)} onClickHandler={onClickHandler}  />
            <div className="lower_part">
                <button onClick={() => setIsForgetPassDialogOpen(true)}>Forget Password</button>
                <div className="dont_have_acc"> don't have account <Link to="/user/register"> Register</Link></div>
            </div>
        </div>
    )
};

const ForgetPasswordDialog = ({email, setEmail, setIsForgetPassDialogOpen, userLocation}:{email:string; setEmail:Dispatch<SetStateAction<string>>; setIsForgetPassDialogOpen:Dispatch<SetStateAction<boolean>>; userLocation:UserLocationTypes;}) => {
    //const [forgetPassword] = useForgetPasswordMutation();

    const forgetPasswordSendEmail = async() => {
        try {
            const data = await forgetPassword({email, action:"forget_password", userLocation});

            console.log("------ ForgetPasswordDialog  forgetPasswordSendEmail");
            console.log(data);
            if (data.success) {
                setIsForgetPassDialogOpen(false);
            }
            console.log(email);
            console.log("------ ForgetPasswordDialog  forgetPasswordSendEmail");
            
        } catch (error) {
            console.log("------ ForgetPasswordDialog  forgetPasswordSendEmail");
            console.log("------ ForgetPasswordDialog  forgetPasswordSendEmail");
            
        }
    }
    return(
        <div className="forget_password_dialog_cont" style={{border:"2px solid red", background:"white", padding:"20px", borderRadius:"8px", width:"80%", margin:"20px auto"}} onClick={(e) => e.stopPropagation()}>
            <div className="heading" style={{textAlign:"center"}}>Forget Password</div>
            <p style={{fontSize:"0.8rem"}}>Write your Email below on which we will send a verification link</p>
            <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={forgetPasswordSendEmail} style={{fontSize:"0.8rem"}}>Send Email</button>
        </div>
    )
}

export default Login;