import React,{useState} from 'react'
import chatlogo from '../img/chatlogo.png';
import { Link } from 'react-router-dom';




const Login = ({sendUser}) => {
  const [name,setName] = useState("");

  const addHandle = ()=>{
    sendUser(name)
    setName('')
   
  }

  return (
    <div>
      <div className='h-screen w-screen bg-black  justify-center items-center flex '>
        <div className='h-3/5 w-2/5 bg-violet-500 text-center flex flex-col items-center justify-center shadow' >
            <div className='w-1/5 '>
                <img src={chatlogo} alt="" className='shadow' />
            </div>
            <div className='text-5xl text-white pt-2 fonty'>Chat Point</div>
            <div className='w-2/4 bg-white h-1 justify-center p'></div>
            <div className='pt-10 w-3/5'>
                <input type="text" placeholder='Enter Your Name' className='p-4 w-1/2 rounded-base font-semibold ' value={name} onChange={(e)=>setName(e.target.value)}/>
                <br />
               <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat"><button onClick={addHandle} className='w-1/2 mt-6 px-2 py-4 text-white font-semibold bg-red-600 hover:bg-red-700'>Login</button></Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
