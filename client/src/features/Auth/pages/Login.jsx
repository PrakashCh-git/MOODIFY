import React, { useState } from 'react'
import Logo from "../../../assets/Logo.png"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'



const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {loading,handleLogin} = useAuth();

    async function handleSubmit(e) {
      e.preventDefault();
      await handleLogin({email,password});
      navigate("/")
    }


  return (
    <div className='min-h-screen text-amber-100 backdrop-blur-2xl flex items-center px-[10%]'>
      <div className='flex gap-50 items-center justify-between '>

        {/* Logo And Name */}
        <div className='flex flex-col items-center'>
            <img src={Logo} alt="" className='h-[150px] w-[150px] aspect-square' />
            <h1 className='text-center text-2xl'>Moodify - Listen Music On Your Mood</h1>
        </div>
        

        {/* Right */}
        <form className='border-2 bg-white/8 border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
            <h1>Login</h1>            
            <input type="email" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} value={email} className='p-2 border border-gray-500 rounded-md focus:outline-none'/>
            <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password} className='p-2 border border-gray-500 rounded-md focus:outline-none'/>
            <button
                type="submit"
                className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
                >
                Login
            </button>
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <span className="font-medium text-violet-500 cursor-pointer" onClick={()=>{
                    navigate("/register")
              }}>
                Register
              </span>
            </p>
        </form>

      </div>
    </div>
  )
}

export default Login
