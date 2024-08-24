import { DEFAULT_ID } from "./assets/utiles";
import { MessageTypes } from "./Chatbot";
import "./styles/message.scss";



const Messanger = ({messagesArr, loggedInUserID}:{messagesArr:MessageTypes[]; loggedInUserID:string; loggedInUserName:string;}) => {

    return(
        <div className="messanger_cont">
            {
                messagesArr.map((message, index) => (
                    message.senderID === DEFAULT_ID ? 
                        <div className="default_message_cont" key={index}>
                            <div className="date">10:30</div>
                            <div className="content">{message.content}</div>
                        </div>
                        :
                        <div className="message_cont" key={index} style={{borderRadius:message.senderID === loggedInUserID?"8px 0 8px 8px":"0 8px 8px 8px", marginLeft:message.senderID === loggedInUserID?"auto":"8px"}}>
                            <div className="name">{message.senderName}</div>
                            <div className="content">{message.content}</div>
                            <div className="date">{"10:30"}</div>
                        </div>
                ))
            }
        </div>
    )
};

export default Messanger;