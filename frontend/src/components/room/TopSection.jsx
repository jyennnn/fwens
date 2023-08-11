import IMAGES from "../../images";

const TopSection = (props) => {

    return ( 
    <div className="top-section">
        <button className={`toggle-button ${props.mobileView ? "" : "hide"}`}
        onClick={props.toggleSidebar}>
            &#x2190;
          </button>
        <img className="ai-avatar" src={IMAGES[props.currentBot + 'Avatar']} alt="ai avatar"/>
        <div className="ai-name">
            <h4>{props.currentBot}</h4>
            <h5 className="animate-status">{props.currentBotStatus}</h5>
        </div>
        <button className={`toggle-sound ${props.sound ? "" : "line-through"}`} onClick={props.toggleSound}>&#x266A;</button>
    </div>
   );
}
 
export default TopSection;