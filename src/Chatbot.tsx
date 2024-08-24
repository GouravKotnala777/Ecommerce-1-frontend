import { MouseEvent, useEffect, useState } from "react";
import "./styles/chatbot.scss";
import { BiDislike, BiLike, BiSend, BiUserCircle } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import Message from "./Messanger";
import { PRIMARY } from "./styles/utils";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { CHATBOT_ID, DEFAULT_ID } from "./assets/utiles";

export interface MessageTypes {
    senderID: string;
    senderName: string;
    receiver: string;
    content: string;
    createdAt: string;
}


let socket:Socket<DefaultEventsMap, DefaultEventsMap>;
const Chatbot = ({USERID, USERNAME}:{USERID?:string; USERNAME?:string;}) => {
    const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
    const [hasLiked, setHasLiked] = useState<boolean>(false);
    const [hasDisliked, setHasDisliked] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageTypes[]>([]);
    const [adminName, setAdminName] = useState<string>("");
    //const [isAdminBuisy, setIsAdminBuisy] = useState()
    

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

    const startChatHandler = (socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        socket?.emit("registerUser", {userID:USERID as string, userName:USERNAME as string});
        setIsChatStarted(true);
    };
    const endChatWarningHandler = () => {
        setMessages((prev) => [...prev, {senderID:CHATBOT_ID, senderName:"Chatbot", receiver:"aaaaa", content:"Do you want to left chat, all your chats will be removed!", createdAt:"22-08-2024"}]);
    };
    const endChatConfirmedHandler = () => {
        socket.emit("userEndedChat", {defaultMsg:`${USERNAME} left`});
        setIsChatStarted(false);
        setMessages([]);
    };

    const sendMessageHandler = () => {
        socket?.emit("userMessage", {userID:USERID as string, userName:USERNAME as string, msg:message});
        setMessages((prev) => [...prev, {senderID:USERID as string, senderName:USERNAME as string, receiver:"aaaaa", content:message, createdAt:"22-08-2024"}]);
        setMessage("");
    };

    useEffect(() => {
        socket = io(import.meta.env.VITE_SERVER_URL);

        //startChatHandler(socket);


        //socket.on("defaultEventBE", ({defaultMsg}) => {
        //    setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", receiver:"aaaaa", content:defaultMsg, createdAt:"22-08-2024"}]);
        //});
        socket.on("adminSelectedUserBE", ({adminName, defaultMsg}) => {
            setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", receiver:"aaaaa", content:defaultMsg, createdAt:"22-08-2024"}]);
            setAdminName(adminName);
        });

        socket.on("connectionEnded", ({defaultMsg}) => {
            setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", receiver:"aaaaa", content:defaultMsg, createdAt:"22-08-2024"}]);
        });

        socket.on("userReceiveResponse", ({adminID, userName, response}) => {
            console.log(`admin ${adminID} response : ${response}`);
            setMessages((prev) => [...prev, {senderID:adminID, senderName:userName, receiver:"aaaaa", content:response, createdAt:"22-08-2024"}]);
        });


        return () => {
            socket.disconnect();
        }
    }, [USERID, USERNAME]);

    return(
        <div className="chatbot_bg">
            
            {/*<pre style={{fontSize:"0.5rem"}}>{JSON.stringify(messages, null, `\t`)}</pre>*/}
            {
                !isChatStarted &&
                <div className="chatbot_form_cont" onClick={(e) => e.stopPropagation()}>
                    <input type="text" className="name" placeholder="Name (optional)" />
                    <input type="text" className="email" placeholder="Email (optional)" />
                    <input type="text" className="comment" placeholder="Comment... (optional)" />
                    <button onClick={() => startChatHandler(socket)}>Start Chat</button>
                </div>
            }
            {
                isChatStarted &&
                    <div className="chatbot_cont" onClick={(e) => e.stopPropagation()}>
                        <div className="upper_part">
                            <div className="customer_photo">
                                <BiUserCircle className="BiUserCircle" />
                            </div>
                            <div className="customer_name">
                                <div className="name">{adminName}</div>
                                <div className="post">customer support</div>
                            </div>
                            <div className="like_dislike">
                                <BiLike id="like" className="like" color={hasLiked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} /><BiDislike id="dislike" className="dislike" color={hasDisliked?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                            </div>
                        </div>
                        <div className="middle_part"><Message messagesArr={messages} loggedInUserID={USERID as string} loggedInUserName={USERNAME as string} endChatConfirmedHandler={endChatConfirmedHandler} /></div>
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

export default Chatbot;