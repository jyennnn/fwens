import TopSection from "./TopSection";
import BottomSection from "./BottomSection";


const Room = (props) => {

    return ( 
    <div className="room">
        <TopSection 
            currentBot={props.currentBot}
            currentBotStatus={props.currentBotStatus}
            toggleSidebar={props.toggleSidebar}
            mobileView={props.mobileView}
            toggleSound={props.toggleSound}
            sound={props.sound}/>
            
        <BottomSection 
            previousChats={props.previousChats} 
            userMessage={props.userMessage} 
            changeUserMessage={props.changeUserMessage}
            getMessages={props.getMessages}
            currentChat={props.currentChat}
            onKeyPress={props.onKeyPress}
            isInputDisabled={props.isInputDisabled}/>
    </div>
     );
}
 
export default Room;