import ChatMessages from "./ChatMessages";

const Feed = (props) => {
    return ( 
        <div className="feed">
            <ul>
              <ChatMessages 
                    previousChats={props.previousChats}
                    currentChat={props.currentChat}
                />
            </ul>
          </div>
    );
}
 
export default Feed;