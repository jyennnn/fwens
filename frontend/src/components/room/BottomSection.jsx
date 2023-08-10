import Feed from "./Feed";

const BottomSection = (props) => {

    return ( 
        <div className="bottom-section">
          <Feed 
                previousChats={props.previousChats} 
                currentChat={props.currentChat}
            />
          <div className="messaging">
          <input className="message-input" value={props.userMessage} onChange={props.changeUserMessage} onKeyPress={props.onKeyPress} disabled={props.isInputDisabled} autoComplete="off"></input>
          <button className="send-button" onClick={props.getMessages}>&#x21B5;</button>
          </div>
        </div>
    );
}
 
export default BottomSection;