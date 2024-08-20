import "./styles/chatbot.scss";

const Chatbot = () => {

    return(
        <div className="chatbot_bg">
            <div className="chatbot_cont">
                <input type="text" className="name" placeholder="Name" />
                <input type="text" className="email" placeholder="Email" />
                <input type="text" className="comment" placeholder="Comment..." />
                <button>Start</button>
            </div>
        </div>
    );
};

export default Chatbot;