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
import { ADMIN_ID, CHATBOT_ID, DEFAULT_ID } from "./assets/utiles";


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


    const startChatHandler = () => {
        if (userID) {
            socket?.emit("adminSelectedUser", {userID:userID, adminName:USERNAME as string, defaultMsg:`${USERNAME} connected`});
            setIsChatStarted(true);
        }
    };
    const endChatWarningHandler = () => {
        setMessages((prev) => [...prev, {senderID:CHATBOT_ID, senderName:"Chatbot", receiver:"aaaaa", content:"Do you want to left chat, all your chats will be removed!", createdAt:"22-08-2024"}]);
    };
    const endChatConfirmedHandler = () => {
        socket.emit("adminEndedChat", {userID:userID as string, defaultMsg:`${USERNAME} left`});
        navigate("/chat-admin");
        setIsChatStarted(false);
        setMessages([]);
    };

    const sendMessageHandler = () => {
        socket?.emit("adminResponse", {adminID:ADMIN_ID, userID, userName:USERNAME as string, response:message});
        console.log(`${message} to ${ADMIN_ID}`);
        setMessages((prev) => [...prev, {senderID:ADMIN_ID, senderName:USERNAME as string, receiver:"aaaaa", content:message, createdAt:"22-08-2024"}]);
        setMessage("");
    };

    useEffect(() => {
        console.log("1111111111111111111");
        startChatHandler();
        console.log("1111111111111111111");
        
    }, [userID]);

    useEffect(() => {
        socket = io("http://localhost:8000");
        
        socket.emit("registerUser", {userID:ADMIN_ID, userName:USERNAME as string});
        socket.on("usersList", (users) => {
            setUsersList(users);
        });

        socket.on("connectionEnded", ({defaultMsg}) => {
            setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", receiver:"aaaaa", content:defaultMsg, createdAt:"22-08-2024"}]);
        });

        socket.on("adminReceiveMessage", ({userID, userName, msg}) => {
            console.log(`admin receive message : ${msg} from ${userID}`);
            setMessages((prev) => [...prev, {senderID:userID, senderName:userName, receiver:"aaaaa", content:msg, createdAt:"22-08-2024"}]);
        });


        return () => {
            socket.disconnect();
        }
    }, [USERNAME, USERID]);

    return(
        <div className="chatbot_bg">
            <pre>{JSON.stringify(usersList, null, `\t`)}</pre>
            {/*<h4>userID : {userID}</h4>*/}
            <div className="heading">Connected Users</div>
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
                                <div className="name">{usersList[userID as string]?.userName}</div>
                                {/*<div className="name"></div>*/}
                                <div className="post">user name</div>
                            </div>
                            <div className="like_dislike">
                                <BiLike id="like" className="like" color={hasLiked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} /><BiDislike id="dislike" className="dislike" color={hasDisliked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                            </div>
                        </div>
                        <div className="middle_part"><Message messagesArr={messages} loggedInUserID={ADMIN_ID as string} loggedInUserName={USERNAME as string} endChatConfirmedHandler={endChatConfirmedHandler}  /></div>
                        <div className="lower_part">
                            <div className="upper_cont">
                                <textarea className="comment" placeholder="Comment..." cols={2} value={message} style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)}></textarea>
                                <BiSend className="BiSend" onClick={sendMessageHandler} />
                            </div>
                            <div className="lower_cont">
                                <GrAttachment /><LuLogOut onClick={endChatWarningHandler} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ChatbotAdmin;