import { useEffect, useState } from "react";
import IMAGES from "../../images";
import { Link } from "react-router-dom";

const ChatList = (props) => {

    const [latestChats, setLatestChats] = useState([]);

    useEffect(() => {
      let uniqueBots = [];

      const filteredChats = props.previousChats
        .slice() // Make a copy of the array to avoid mutating the original
        .reverse() // Reverse the array to process it from the latest
        .filter(element => {
          const isOld = uniqueBots.includes(element.bot);

          if (!isOld) {
            uniqueBots.push(element.bot);
            return true;
          }

          return false;
        });

      setLatestChats(filteredChats); 
      
    }, [props.previousChats]);


      const filteredChats = latestChats.filter(({ bot }) =>
      bot.toLowerCase().includes(props.searchQuery.toLowerCase())
      );

    return ( 
        <div className="chat-list">
            <Link to="room" className="link-no-underline">
            <ul>
            {filteredChats.map(({ bot, role, content }, key) => (
                <li key={key} onClick={props.chooseBot2}>
                    <div className="chat-list-img"><img src={IMAGES[bot + 'Avatar']} alt="" /></div>
                    <div className="chat-list-text">
                    <h4><span>{bot}</span></h4>
                    <p>...{content.split(/\s+/).slice(-5).join(" ")}</p>
                    </div>
                 </li>
                ))}
            
            </ul>
            </ Link>
          </div>
    );
}
 
export default ChatList;