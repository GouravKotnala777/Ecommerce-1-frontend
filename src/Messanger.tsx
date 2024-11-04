import { CHATBOT_ID, DEFAULT_ID } from "./assets/utiles";
import { MessageTypes } from "./Chatbot";
import "./styles/message.scss";


interface MessagePropTypes {
    messagesArr:MessageTypes[];
    loggedInUserID:string;
    loggedInUserName:string;
    endChatConfirmedHandler:() => void;
}


const Messanger = ({messagesArr, loggedInUserID, endChatConfirmedHandler}:MessagePropTypes) => {
    //const messageEndRef = useRef<HTMLDivElement>(null);

    //const scrollToBottomHandler = () => {
    //    messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    //};

    //useEffect(() => {
    //    scrollToBottomHandler();
    //}, [messagesArr]);
    return(
        <div className="messanger_cont">
            <div className="messanger_cont_scrollable">
                {
                    messagesArr.map((message, index) => (
                        message.senderID === DEFAULT_ID ?
                            <div className="default_message_cont" key={index}>
                                <div className="date">10:30</div>
                                <div className="content">{message.content}</div>
                            </div>
                            :
                            message.senderID === CHATBOT_ID ?
                                <div className="message_cont" key={index} style={{borderRadius:message.senderID === loggedInUserID?"8px 0 8px 8px":"0 8px 8px 8px", marginLeft:message.senderID === loggedInUserID?"auto":"8px"}}>
                                    <div className="name">{message.senderName}</div>
                                    <div className="content">{message.content}</div>
                                    <div className="date">{"10:30"}</div>
                                    <div className="btns">
                                        <button className="left_btn" onClick={endChatConfirmedHandler}>Left</button>
                                    </div>
                                </div>
                                :
                                <div className="message_cont" key={index} style={{borderRadius:message.senderID === loggedInUserID?"8px 0 8px 8px":"0 8px 8px 8px", marginLeft:message.senderID === loggedInUserID?"auto":"8px"}}>
                                    <div className="name">{message.senderName}</div>
                                    <div className="content">{message.content}</div>
                                    <div className="date">{"10:30"}</div>
                                </div>
                    ))
                }

                {/*<div className="message_end">aaaa</div>*/}
            </div>
        </div>
    )
};

export default Messanger;