import Chat from "./Chat";


const ChatMessages = (props) => {
    
    const chatMessages = props.currentChat.map((ele, index) => {
        return(
            <Chat 
            bot={ele.bot}
            role={ele.role} 
            content={ele.content}
            key={index}
            />
        )
    })
    
    return ( 
        <>
        {chatMessages}
        </>
     );
}
 
export default ChatMessages;