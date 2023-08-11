import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar/SideBar'
import Room from './components/room/Room'
import Home from './components/home/Home';
import { useState, useEffect } from "react";
import { createContext } from 'react'; 

// Create Theme Context 
export const ThemeContext = createContext(null);

function App() {

  // ------------- useStates --------------------- // 
  
  // -- bot personality -- 
  const [ currentBot, setCurrentBot ] = useState("")
  const [ botEmotions, setBotEmotions ] = useState("")
  const [ botVoice, setBotVoice ] = useState("")
  const [ currentBotStatus, setCurrentBotStatus] = useState("active now")

  // -- chats -- 
  const [ previousChats, setPreviousChats ] = useState([])
  const [ userMessage, setUserMessage ] = useState("")
  const [ isInputDisabled, setIsInputDisabled] = useState(false)
  
  // -- mobile view / interactivity --
  const [ mobileView, setMobileView ] = useState(false)
  const [ showSidebar, setShowSidebar] = useState(false)
  const [ sound, setSound] = useState(true)
  const [ theme, setTheme ] = useState("brown")


  // ------------- useEffect --------------------- // 
  // -- handle window resize -- 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 780) {
        setMobileView(true); 
      } else if (window.innerWidth > 780) {
        setMobileView(false)
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);


  // ------------- toggle buttons ----------------------- //
  const toggleTheme = () => {
    setTheme((curr) => (curr === "brown" ? "green" : "brown"))
  }

  const toggleSidebar = (e) => {
    if (mobileView === true && showSidebar === true) {
      setShowSidebar(false)
    } else if (mobileView === true && showSidebar === false) {
      setShowSidebar(true)
    }
  }

  const toggleSound = (e) => {
    if (sound === true) {
      setSound(false)
    } else if ( sound === false ) {
      setSound(true)
    }
  }
  
 
  // 
  const changeUserMessage = (e) => {
    setUserMessage(e.target.value)
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      getMessages()
      setUserMessage("")
      setIsInputDisabled(true)
    }
  }

  const chooseBot = (e) => {
    let bot = e.currentTarget.querySelector('span').textContent
    console.log("choosebot", e.currentTarget.querySelector('span').textContent)
    setCurrentBot(bot)
    
    if (bot === "kayla") {
      setBotEmotions("sarcastic reply");
      setBotVoice("jsCqWAovK2LkecY7zXl4") 

    } else if (bot === "tyler") {
      setBotEmotions("simple sad reply");
      setBotVoice("GBv7mTt0atIp3Br8iCZE")

    } else if (bot === "sammy") {
      setBotEmotions("comforting reply");
      setBotVoice("XrExE9yKIg1WjnnlVkGX")

    } else if (bot === "charlie") {
      setBotEmotions("reply like a genius");
      setBotVoice("ThT5KcBeYPX3keUQqHPh")

       
    } else if (bot === "girishi") {
      setBotEmotions("flirty reply");
      setBotVoice("SOYHLrjzK2X1ezoPC6cr")
    }
  } 

  const chooseBot2 = (e) => {
    if (mobileView === true && showSidebar === true) {
      setShowSidebar(false)
    }
  
    let bot = e.currentTarget.querySelector('span').textContent
    setCurrentBot(bot)
    
    if (bot === "kayla") {
      setBotEmotions("sarcastic reply");
      setBotVoice("jsCqWAovK2LkecY7zXl4") 

    } else if (bot === "tyler") {
      setBotEmotions("simple sad reply");
      setBotVoice("GBv7mTt0atIp3Br8iCZE")

    } else if (bot === "sammy") {
      setBotEmotions("comforting reply");
      setBotVoice("XrExE9yKIg1WjnnlVkGX")

    } else if (bot === "charlie") {
      setBotEmotions("reply like a genius");
      setBotVoice("ThT5KcBeYPX3keUQqHPh")

    } else if (bot === "girishi") {
      setBotEmotions("flirty reply");
      setBotVoice("SOYHLrjzK2X1ezoPC6cr")
    }
  } 

const getMessages = async () => {
    setUserMessage("")
    setIsInputDisabled(true)
    setCurrentBotStatus("typing...")

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: `${botEmotions} in 8 words only. ${userMessage}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    let newUserMessage = {
      bot: currentBot,
      role: "user",
      content: userMessage
    }
    setPreviousChats((prev) => [...prev, newUserMessage ])

    try {
        const response = await fetch('https://fwens-backend.onrender.com:10000/completions', options)
        const data = await response.json()

        let newComputerMessage = {
          bot: currentBot,
          role: data.choices[0].message.role,
          content: data.choices[0].message.content
        }
        
        if (sound === true) {
          await getAudioMessages(data.choices[0].message.content)
          setPreviousChats((prev) => [...prev, newComputerMessage ])
          setIsInputDisabled(false)
          setCurrentBotStatus("active now")
        } 
        else if ( sound === false ) {
          setPreviousChats((prev) => [...prev, newComputerMessage ])
          setIsInputDisabled(false)
          setCurrentBotStatus("active now")
        }
        
        
    } catch (error) {
        console.error(error)
    }
  }

  const getAudioMessages = async (text) => {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
                text: text,
                botVoice: botVoice
      }),
    }

    try {
      const response = await fetch('https://fwens-backend.onrender.com:10000/eleven-completions', options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const audio = new Audio();
      audio.src = 'data:audio/mpeg;base64,' + responseData.base64Data; // Set the audio source with Base64 data
      audio.play();

      } catch (error) {
        console.error("An error occurred:", error);
      }
  }

  const currentChat = previousChats.filter(previousChat => previousChat.bot === currentBot)
  const listOfBots = Array.from(new Set(previousChats.map(previousChat => previousChat.bot)))

  return (
    <ThemeContext.Provider value ={{theme, toggleTheme}}>
    <div className="body" id={theme}>
    <Router>
    <div className="app" id={theme}>
      <section className={`side-bar ${showSidebar ? '' : 'hide-sidebar'}`}>
        <SideBar 
            listOfBots={listOfBots}
            previousChats={previousChats} 
            chooseBot2={chooseBot2}
            toggleSidebar={toggleSidebar}
            mobileView={mobileView}
            toggleTheme={toggleTheme}
            theme={theme}
        />
      </section>
        <section className={`main ${showSidebar ? 'hide-main' : ''}`}>
        <Routes>
        <Route path="/" 
            element={<Home 
                      chooseBot={chooseBot}
                      listOfBots={listOfBots}/>} 
          />

          <Route path="room" 
            element={<Room 
                      previousChats={previousChats} 
                      userMessage={userMessage} 
                      changeUserMessage={changeUserMessage}
                      getMessages={getMessages}
                      currentBot={currentBot}
                      currentChat={currentChat}
                      onKeyPress={onKeyPress}
                      isInputDisabled={isInputDisabled}
                      currentBotStatus={currentBotStatus}
                      toggleSidebar={toggleSidebar}
                      mobileView={mobileView}
                      toggleSound={toggleSound}
                      sound={sound}
                      />}
          />

        </Routes>
        </section>
    </div>
    </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
