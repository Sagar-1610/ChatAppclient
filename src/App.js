
import { useState } from "react";
import "./App.css";
import ChatArea from "./Components/ChatArea";
import Login from "./Components/Login";
import { Link,Routes,Route } from "react-router-dom";


function App() {
  const [ user,setUser ] = useState("");

  const sendUser = (data) =>{
     setUser(data)
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<ChatArea user = {user}/>}></Route>
        <Route path="/" element={<Login sendUser={sendUser}/>} ></Route>
      </Routes>
    
    </div>
  );
}

export default App;
