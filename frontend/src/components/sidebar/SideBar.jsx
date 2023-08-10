import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ChatRooms from "./ChatRooms";
import { useState } from "react";
import ReactSwitch from "react-switch";

const SideBar = (props) => {

    const [searchQuery, setSearchQuery] = useState(""); // State for the search query

    const searchChange = (e) => {
      setSearchQuery(e.target.value)
    }

    return ( 
      <>
        <Logo />
        <div className="switch">
          <ReactSwitch 
            onChange={props.toggleTheme} 
            checked={props.theme === "green"}
            onColor="#a9b49e"
            offColor="#ba875a"
            width={46}
            height={20}
            borderRadius={12}
            handleDiameter={16}
            uncheckedIcon={null}
            checkedIcon={null}
            onHandleColor="#6B8069"
            offHandleColor="#985c3e"/>
        </div>
        <SearchBar 
          searchQuery={searchQuery}
          searchChange={searchChange}/> 
        <ChatRooms 
            listOfBots={props.listOfBots}
            previousChats={props.previousChats}
            chooseBot2={props.chooseBot2}
            searchQuery={searchQuery}
            toggleSidebar={props.toggleSidebar}
        />
      </>
     );
}
 
export default SideBar;