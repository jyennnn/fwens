import ChatList from "./ChatList";
import CreateChat from "./CreateChat";

const ChatRooms = (props) => {
    return ( 
        <div className="chat-rooms">
          <ChatList 
              listOfBots={props.listOfBots}
              previousChats={props.previousChats}
              chooseBot2={props.chooseBot2}
              searchQuery={props.searchQuery}/>

          <CreateChat 
            toggleSidebar={props.toggleSidebar}/>
        </div>
     );
}
 
export default ChatRooms;