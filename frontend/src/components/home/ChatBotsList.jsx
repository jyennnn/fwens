import IMAGES from "../../images";
import { Link } from 'react-router-dom'

const ChatBots = (props) => {

    console.log("chatbots active", props.listOfBots)
    const isKaylaBotDisabled = props.listOfBots.includes("kayla");
    const isSammyBotDisabled = props.listOfBots.includes("sammy");
    const isCharlieBotDisabled = props.listOfBots.includes("charlie");
    const isGirishiBotDisabled = props.listOfBots.includes("girishi");
    const isTylerBotDisabled = props.listOfBots.includes("tyler");

    return ( 
        <>
        <Link to="room" className="link-no-underline">
        <div className={`choose-div ${isKaylaBotDisabled ? 'disabled' : ''}`} id="choose-kayla" onClick={props.chooseBot}>
            <img src={IMAGES.kaylaAvatar}/>
            <h5><span>kayla</span> - your brutally honest sassy fwen</h5>
            </div>
        
        
        <div className={`choose-div ${isSammyBotDisabled ? 'disabled' : ''}`} id="choose-sammy" onClick={props.chooseBot}>
            <img src={IMAGES.sammyAvatar}/>
            <h5><span>sammy</span> - your "always-there-for-you" fwen</h5>
        </div>

        <div className={`choose-div ${isCharlieBotDisabled ? 'disabled' : ''}`} id="choose-charlie" onClick={props.chooseBot}>
            <img src={IMAGES.charlieAvatar}/>
            <h5><span>charlie</span> - your genius fwen</h5>
        </div>

        <div className={`choose-div ${isGirishiBotDisabled ? 'disabled' : ''}`} id="choose-girishi" onClick={props.chooseBot}>
            <img src={IMAGES.girishiAvatar}/>
            <h5><span>girishi</span> - your love interest</h5>
        </div>

        <div className={`choose-div ${isTylerBotDisabled ? 'disabled' : ''}`} id="choose-tyler" onClick={props.chooseBot}>
            <img src={IMAGES.tylerAvatar}/>
            <h5><span>tyler</span> - your depressed poetic fwen</h5>
        </div>
        </Link>
        </> 
    );
}
 
export default ChatBots;