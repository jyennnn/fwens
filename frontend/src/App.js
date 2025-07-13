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

  console.log('sound', sound)


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
  
 
  // ------------- chatting functions ----------------------- //
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

  const currentChat = previousChats.filter(previousChat => previousChat.bot === currentBot)
  const listOfBots = Array.from(new Set(previousChats.map(previousChat => previousChat.bot)))

  // ------------- bot functions ----------------------- //

  // -- choosing bot on home page --
  const chooseBot = (e) => {
    let bot = e.currentTarget.querySelector('span').textContent
    console.log("choosebot", e.currentTarget.querySelector('span').textContent)
    setCurrentBot(bot)
    
    if (bot === "kayla") {
      setBotEmotions("sarcastic reply");
      setBotVoice("21m00Tcm4TlvDq8ikWAM") 

    } else if (bot === "tyler") {
      setBotEmotions("simple sad reply");
      setBotVoice("29vD33N1CtxCmqQRPOHJ")

    } else if (bot === "sammy") {
      setBotEmotions("comforting reply");
      setBotVoice("5Q0t7uMcjvnagumLfvZi")

    } else if (bot === "charlie") {
      setBotEmotions("reply like a genius");
      setBotVoice("EXAVITQu4vr4xnSDxMaL")

       
    } else if (bot === "girishi") {
      setBotEmotions("flirty reply");
      setBotVoice("SOYHLrjzK2X1ezoPC6cr")
    }
  } 

  // -- choosing bot on sidebar --
  const chooseBot2 = (e) => {
    if (mobileView === true && showSidebar === true) {
      setShowSidebar(false)
    }
  
    let bot = e.currentTarget.querySelector('span').textContent
    setCurrentBot(bot)
    
    if (bot === "kayla") {
      setBotEmotions("sarcastic reply");
      setBotVoice("21m00Tcm4TlvDq8ikWAM") 

    } else if (bot === "tyler") {
      setBotEmotions("simple sad reply");
      setBotVoice("29vD33N1CtxCmqQRPOHJ")

    } else if (bot === "sammy") {
      setBotEmotions("comforting reply");
      setBotVoice("5Q0t7uMcjvnagumLfvZi")

    } else if (bot === "charlie") {
      setBotEmotions("reply like a genius");
      setBotVoice("EXAVITQu4vr4xnSDxMaL")

    } else if (bot === "girishi") {
      setBotEmotions("flirty reply");
      setBotVoice("SOYHLrjzK2X1ezoPC6cr")
    }
  } 

  // ------------- API functions ----------------------- //

  // ----- ChatGPT API -----
  const getMessages = async () => {
    // >> disable input & bot typing
    setUserMessage("")
    setIsInputDisabled(true)
    setCurrentBotStatus("typing...")

    // >> create array of messages, save user message
    let newUserMessage = {
          bot: currentBot,
          role: "user",
          content: userMessage
        }
    setPreviousChats((prev) => [...prev, newUserMessage ])
    

    // >> data to send API
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: `${botEmotions} in 8 words only. ${userMessage}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }


    // >> wait for API 
    try {
        const response = await fetch('https://fwens-backend.onrender.com/completions', options)
        // const response = await fetch('http://localhost:8000/completions', options)

        const data = await response.json()


        // >> save computer message to array
        let newComputerMessage = {
          bot: currentBot,
          role: data.choices[0].message.role,
          content: data.choices[0].message.content
        }
        
            // >> if sound is on, call Eleven Labs API 
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

  // ----- Eleven Labs API -----
  const getAudioMessages = async (text) => {

    // >> data to send API
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

    // >> wait for API 
    try {
      const response = await fetch('https://fwens-backend.onrender.com/eleven-completions', options);
      // const response = await fetch('http  ://localhost:8000/eleven-completions', options);
      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.base64Data) {
      console.warn("⚠️ No base64Data found in response!");
      return;
    }
      const audio = new Audio();
      audio.src = 'data:audio/mpeg;base64,' + responseData.base64Data; // Set the audio source with Base64 data
      audio.play();

      } catch (error) {
        console.error("An error occurred:", error);
      }
  }

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
