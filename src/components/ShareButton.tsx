import "../styles/components/share_btn.scss";
import { MdOutlineShare } from "react-icons/md";


const ShareButton = ({placeHolder, title, text, url}:{placeHolder?:string; title:string; text:string; url:string;}) => {
    const shareHandler = async() => {
        if (navigator.share) {
            try {
                console.log("------ ShareButton");
                console.log({url});
                
                await navigator.share({
                    title, text, url
                });
                console.log("------ ShareButton");
            } catch (error) {
                console.log("------ ShareButton error");
                console.log(error);
                console.log("------ ShareButton error");
            }
        }
        else{
            console.log("Web Share api is not supported in your browser");
        }
    }

    return(
        <button className="share_btn" onClick={shareHandler}>
            <MdOutlineShare className="MdOutlineShare" /> {placeHolder}
        </button>
    )
}

export default ShareButton;