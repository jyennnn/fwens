import ChatBots from "./ChatBotsList";

const HomeBottom = (props) => {

    
    return ( 
        <div className="home-bottom">
          <ChatBots chooseBot={props.chooseBot} listOfBots={props.listOfBots}/>
        </div>
     );
}
 
export default HomeBottom;