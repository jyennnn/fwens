import ChatList from "./ChatList";
import CreateChat from "./CreateChat";

const ChatRooms = (props) => {
    return ( 
        <div className="chat-rooms">
          <ChatList 
              listOfBots={props.listOfBots}
              previousChats={props.previousChats}
              chooseBot2={props.chooseBot2}
              searchQuery={props.searchQuery}
          />
          <CreateChat 
            toggleSidebar={props.toggleSidebar}/>
        </div>
     );
}

/* <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => 
          <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul> */
 
export default ChatRooms;