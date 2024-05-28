import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signup, Login, Profile, VerifyEmail, ForgetPassword } from "./components"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
      <ToastContainer />
          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Profile/>}/>
            <Route path='/otp/verify' element={<VerifyEmail/>}/>
            <Route path='/forget-password' element={<PasswordResetRequest/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
