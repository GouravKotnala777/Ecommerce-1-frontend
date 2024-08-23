import { MouseEvent, useEffect, useState } from "react";
import "./styles/chatbot.scss";
import { BiDislike, BiLike, BiSend, BiUserCircle } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import Message from "./Messanger";
import { PRIMARY } from "./styles/utils";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MessageTypes } from "./Chatbot";
import photo from "./assets/react.svg";


const ADMINID = "66bb37913c60c222387502ed";
//const demoUsers = {
//	"667fbf303194b1022c59bfda": "JibpoH-eqiggv1mxAAAk",
//	"66bb37913c60c222387502ed": "-2ZW3UhvBplgKET9AAAn"
//};

let socket:Socket<DefaultEventsMap, DefaultEventsMap>;
const ChatbotAdmin = ({USERID, USERNAME}:{USERID?:string; USERNAME?:string;}) => {
    const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const [hasDisliked, setHasDisliked] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageTypes[]>([]);
    const [usersList, setUsersList] = useState<{[userID:string]:{socketID:string, userName:string};}>({});
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    //const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();


    const userID = searchParams.get("userID");
    

    const startChatHandler = () => {
        //if (USERNAME) {
            //socket = io("http://localhost:8000");
            //socket.emit("registerUser", {userID:ADMINID, userName:USERNAME as string});
            //}
        setIsChatStarted(true);
    };
    const endChatHandler = () => {
        navigate("/chat-admin");
        setIsChatStarted(false);
    };
    
    const likeHandler = (e:MouseEvent<SVGElement>) => {
        if (e.currentTarget.id === "like") {
            setHasLiked(!hasLiked);
            setHasDisliked(false);
        }
        else{
            setHasDisliked(!hasDisliked);
            setHasLiked(false);
        }
    }

    const sendMessageHandler = () => {
        socket?.emit("adminResponse", {adminID:ADMINID, userID, userName:USERNAME as string, response:message});
        console.log(`${message} to ${ADMINID}`);
        setMessages((prev) => [...prev, {senderID:ADMINID, senderName:USERNAME as string, receiver:"aaaaa", content:message, createdAt:"22-08-2024"}]);
        setMessage("");
    };

    useEffect(() => {
        socket = io("http://localhost:8000");
        //if (USERNAME) {
            //startChatHandler();
            socket.emit("registerUser", {userID:ADMINID, userName:USERNAME as string});
            socket.on("usersList", (users) => {
                console.log({users});
                setUsersList(users);
            });
    
            socket.on("adminReceiveMessage", ({userID, userName, msg}) => {
                console.log(`admin receive message : ${msg} from ${userID}`);
                setMessages((prev) => [...prev, {senderID:userID, senderName:userName, receiver:"aaaaa", content:msg, createdAt:"22-08-2024"}]);
            })
        //}


        return () => {
            socket.disconnect();
        }
    }, [USERNAME, USERID]);

    return(
        <>
        
        <h5>UserID : {userID}</h5>
        <div className="chatbot_bg">
            {
                !isChatStarted &&
                    Object.keys(usersList).map((userId, index) => (
                        <Link to={`/chat-admin?userID=${userId}`} key={index} className="user_link" style={{display:"block"}} onClick={() => startChatHandler()}>
                            <div className="user">
                                <div className="photo"><img src={photo} alt={photo} /></div>
                                <div className="name">{usersList[userId].userName}</div>
                                <div className="socket_id">{usersList[userId].socketID.slice(5,20)}</div>
                            </div>
                        </Link>
                    ))
            }
            {
                isChatStarted &&
                    <div className="chatbot_cont">
                        <div className="upper_part">
                            <div className="customer_photo">
                                <BiUserCircle className="BiUserCircle" />
                            </div>
                            <div className="customer_name">
                                <div className="name">AAAAA</div>
                                <div className="post">customer support</div>
                            </div>
                            <div className="like_dislike">
                                <BiLike id="like" className="like" color={hasLiked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} /><BiDislike id="dislike" className="dislike" color={hasDisliked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                            </div>
                        </div>
                        <div className="middle_part"><Message messagesArr={messages} loggedInUserID={ADMINID as string} loggedInUserName={USERNAME as string}  /></div>
                        <div className="lower_part">
                            <div className="upper_cont">
                                <textarea className="comment" placeholder="Comment..." cols={2} value={message} style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)}></textarea>
                                <BiSend className="BiSend" onClick={sendMessageHandler} />
                            </div>
                            <div className="lower_cont">
                                <GrAttachment /><LuLogOut onClick={endChatHandler} />
                            </div>
                        </div>
                    </div>
            }
        </div>
        </>
    );
};

export default ChatbotAdmin;