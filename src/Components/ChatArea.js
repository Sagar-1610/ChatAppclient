import React, { useEffect,useState } from 'react'
import {io}  from 'socket.io-client';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Messages from './Messages';
import ReactScrollToBottom from 'react-scroll-to-bottom';



const ChatArea = ({user}) => {
  let socket;
  const EndPoint = "http://localhost:4500/"
  socket = io(EndPoint,{transports:["websocket"]});
  const [messages,setMessages] = useState([])
  const [id,setId] = useState('');

   const sendMessage = ()=>{
    const message = document.getElementById("chat").value
    socket.emit("message",{message,id})
    console.log({message})
    document.getElementById('chat').value=""
  }
   

    useEffect(()=>{
        socket = io(EndPoint,{transports:["websocket"]});
        socket.on("connect",()=>{
            alert("connected")
            setId(socket.id)
        })
        socket.emit('joined',{user})
        
        socket.on('welcome',(data)=>{
          setMessages([...messages,data])
          console.log(data.user,data.message)
        })
     

        return ()=>{
          socket.on('disconnect',(data) =>{
            setMessages([...messages,data])
            socket.disconnect();

          })
          socket.off();

        }
    },[])

    useEffect(()=>{
      socket.on("sendMessage",(data)=>{
        setMessages([...messages,data])
        console.log(data.message,data.id,data.user)
      })
      socket.on("userJoined",(data)=>{
        setMessages([...messages,data])
        console.log(data.messages,data.user)
      })
      socket.on("leave",(data)=>{
        setMessages([...messages,data])
        console.log(data.user,data.message)
      })
      return ()=>{
        socket.off()
      }
    },[messages])
    
   
  return (
    <div>
      <div className='h-screen w-screen bg-black  justify-center items-center flex '>
        <div className='h-3/5 w-2/5 bg-white text-center flex flex-col items-center '>
          <div className='w-full bg-violet-500 h-1/6 text-white font-semibold p-4 text-base'>{user}</div>
          <ReactScrollToBottom className='w-full bg-white-100 h-5/6 '>
           {
            messages.map((item,i)=><Messages user={item.id===id?"":item.user} message ={item.message} classs={item.id===id?"right":"left"}/>)
           }
          </ReactScrollToBottom>
          <div className='w-full h-1/6 flex '  >
            <input onKeyPress={(event)=>event.key==="Enter"? sendMessage():null} type="text" id='chat' placeholder='enter text' className='w-5/6 font-semibold bg-blue-200 p-2 font-mono borderi' />
            <button onClick={sendMessage} className='bg-violet-500 w-1/6 hover:bg-violet-600'><SendOutlinedIcon className='sendicon'  sx={{fontSize:50}}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea
