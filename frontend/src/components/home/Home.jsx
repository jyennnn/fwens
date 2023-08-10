import HomeBottom from "./HomeBottom";
import HomeTop from "./HomeTop";

const Home = (props) => {

    return ( 
        <div className="home">
        <HomeTop />
        <HomeBottom 
        chooseBot={props.chooseBot} listOfBots={props.listOfBots}/>
        </div>
     );
}
 
export default Home;