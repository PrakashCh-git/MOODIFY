import React from 'react'
import FaceExpression from "./features/Expressions/components/FaceExpression"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './features/Common/pages/Home'
import Login from './features/Auth/pages/Login'
import Register from './features/Auth/pages/Register'
import { AuthContextProvider } from './features/Auth/atuh.Context'
import Protected from './features/Auth/components/Protected.route'


const App = () => {
  return (
    <AuthContextProvider>
      <div className='bg-[url("./assets/bgImage.svg")] min-h-screen bg-cover bg-no-repeat px-[15%]'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Protected><h1 className='text-white'>Home</h1></Protected>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  )
}

export default App
