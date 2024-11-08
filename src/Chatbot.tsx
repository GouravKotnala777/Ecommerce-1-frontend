import { MouseEvent, useEffect, useState } from "react";
import "./styles/chatbot.scss";
import { BiDislike, BiLike, BiUserCircle } from "react-icons/bi";
import { GrAttachment } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import Message from "./Messanger";
import { PRIMARY } from "./styles/utils";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { CHATBOT_ID, DEFAULT_ID } from "./assets/utiles";
import { createChat, ResponseType, updateChatsHelpfulness } from "./redux/api/api";
import { IoIosSend } from "react-icons/io";
import { UserLocationTypes } from "./pages/Login.Page";

export interface MessageTypes {
    senderID: string;
    senderName: string;
    content: string;
    createdAt: string;
}


let socket:Socket<DefaultEventsMap, DefaultEventsMap>;
const Chatbot = ({USERID, USERNAME, userLocation}:{USERID?:string; USERNAME?:string; userLocation:UserLocationTypes;}) => {
    const [isChatStarted, setIsChatStarted] = useState<boolean>(false);
    const [isHelpfulPageActive, setIsHelpfulPageActive] = useState<boolean>(false);
    const [isHelpful, setIsHelpful] = useState<boolean>();
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageTypes[]>([]);
    const [adminInfo, setAdminInfo] = useState<{adminID:string; adminName:string;}>({adminID:"", adminName:""});
    const [createChatRes, setCreateChatRes] = useState<{success:boolean; message:string;}>({success:false, message:""});
    

    const likeHandler = async(e:MouseEvent<SVGElement>) => {
        
        if (e.currentTarget.id === "like") {
            setIsHelpful((prev) => !prev?true:undefined);
            if (isHelpfulPageActive) {
                try {
                    const res = await updateChatsHelpfulness({chatID:createChatRes.message, isHelpful:true, action:"is_chat_helpful", userLocation});
                    console.log("------ likeHandler  updateIsHelpful1");
                    console.log(res);
                    console.log("------ likeHandler  updateIsHelpful1");
                } catch (error) {
                    console.log("------ likeHandler  error1");
                    console.log(error);
                    console.log("------ likeHandler  error1");
                }
                setIsHelpfulPageActive(false);
                setIsChatStarted(false);
            }
        }
        else{
            setIsHelpful((prev) => (prev === undefined||prev === true)?false:undefined);
            if (isHelpfulPageActive) {
                try {
                    const res = await updateChatsHelpfulness({chatID:createChatRes.message, isHelpful:false, action:"is_chat_helpful", userLocation});
                    console.log("------ likeHandler  updateIsHelpful2");
                    console.log(res);
                    console.log("------ likeHandler  updateIsHelpful2");
                } catch (error) {
                    console.log("------ likeHandler  error2");
                    console.log(error);
                    console.log("------ likeHandler  error2");
                }
                setIsHelpfulPageActive(false);
                setIsChatStarted(false);
            }
        }
    }

    const startChatHandler = (socket?: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        socket?.emit("registerUser", {userID:USERID as string, userName:USERNAME as string});
        setIsChatStarted(true);
        console.log("aaaaaaaaaaaaaaaaaaaa");
        
    };
    const endChatWarningHandler = () => {
        setMessages((prev) => [...prev, {senderID:CHATBOT_ID, senderName:"Chatbot", content:"Do you want to left chat, all your chats will be removed!", createdAt:"22-08-2024"}]);
    };
    const endChatConfirmedHandler = async() => {
        console.log("---------- (1)");
        
        socket.emit("userEndedChat", {defaultMsg:`${USERNAME} left`});
        console.log("---------- (2)");
        try {
            console.log("---------- (3)");
            const res = await createChat({adminID:adminInfo.adminID, chats:messages, isHelpful, action:"new_chat", userLocation});
            console.log("---------- (3.1)");
            
            console.log("------- endChatConfirmedHandler createChat");
            console.log(res);
            if (res.success === true) {
                console.log("---------- (3.2)");
                setCreateChatRes(res as ResponseType<string>);
            }
            console.log("------- endChatConfirmedHandler createChat");
        } catch (error) {
            console.log("---------- (4)");
            console.log("------- endChatConfirmedHandler createChat");
            console.log(error);
            console.log("------- endChatConfirmedHandler createChat");
        }
        setMessages([]);
        setIsHelpful(undefined);
        setIsHelpfulPageActive(true);
    };

    const sendMessageHandler = () => {
        if (message&&message.trim() !== "") {
            socket?.emit("userMessage", {userID:USERID as string, userName:USERNAME as string, msg:message});
            setMessages((prev) => [...prev, {senderID:USERID as string, senderName:USERNAME as string, content:message, createdAt:"22-08-2024"}]);
            setMessage("");
        }
    };

    useEffect(() => {
        socket = io(import.meta.env.VITE_SERVER_URL);

        socket.on("adminSelectedUserBE", ({adminID, adminName, defaultMsg}) => {
            setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", content:defaultMsg, createdAt:"22-08-2024"}]);
            setAdminInfo({adminID, adminName});
        });

        socket.on("connectionEnded", ({defaultMsg}) => {
            setMessages((prev) => [...prev, {senderID:DEFAULT_ID, senderName:"Default", content:defaultMsg, createdAt:"22-08-2024"}]);
        });

        socket.on("userReceiveResponse", ({adminID, userName, response}) => {
            console.log(`admin ${adminID} response : ${response}`);
            setMessages((prev) => [...prev, {senderID:adminID, senderName:userName, content:response, createdAt:"22-08-2024"}]);
        });


        return () => {
            socket.disconnect();
        }
    }, [USERID, USERNAME]);

    return(
        <div className="chatbot_bg">
            
            {/*<pre style={{fontSize:"0.5rem"}}>{JSON.stringify(isHelpfulPageActive, null, `\t`)}</pre>*/}
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
                                <div className="name">{adminInfo.adminName?adminInfo.adminName:"Please wait..."}</div>
                                <div className="post">customer support</div>
                            </div>
                            <div className="like_dislike">
                                <BiLike id="like" className="like" color={isHelpful === true?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                                <BiDislike id="dislike" className="dislike" color={isHelpful === false?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                            </div>
                        </div>
                        <div className="middle_part">
                            {
                                isHelpfulPageActive ?
                                    <div className="is_helpful_cont">
                                        <div className="heading">Is it helpful</div>
                                        <div className="like_icons">
                                            <BiLike id="like" className="like" color={isHelpful === true?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                                            <BiDislike id="dislike" className="dislike" color={isHelpful === false?PRIMARY:"unset"} onClick={(e) => likeHandler(e)} />
                                        </div>
                                        <button className="skip_btn" onClick={() => {setIsHelpfulPageActive(false); setIsChatStarted(false);}}>
                                            Skip
                                        </button>
                                    </div>
                                    :
                                    <Message messagesArr={messages} loggedInUserID={USERID as string} loggedInUserName={USERNAME as string} endChatConfirmedHandler={endChatConfirmedHandler} />
                            }
                        </div>
                        <div className="lower_part">
                            <div className="upper_cont">
                                <textarea className="comment" placeholder="Comment..." cols={2} value={message} style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)}></textarea>
                                <IoIosSend className="BiSend" style={{display:message&&message.trim()!==""?"block":"none"}} onClick={sendMessageHandler} />
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