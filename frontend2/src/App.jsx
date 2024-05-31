import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordResetRequest from './components/PasswordResetRequest.jsx';
import ResetPassword from './components/ResetPassword.jsx';

function App() {
  return (
     <div className='App'>
      <Router>
      <ToastContainer />
          <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forget-password' element={<PasswordResetRequest/>}/>
            <Route path='/auth/password-reset-confirm/:uid/:token' element={<ResetPassword/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
