const Chat = (props) => {
    return ( 
        <>
        {props.role === "assistant" ? (
                <li className="computer-message"><p>{props.content}</p></li>
        ) : props.role === "user" ? (
                <li className="user-message"><p>{props.content}</p></li>
        ) : null}
        </>
     );
}
 
export default Chat;