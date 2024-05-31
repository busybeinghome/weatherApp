import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import AxiosInstance from "../utils/AxiosInstance";

const Login = () => {
    const navigate=useNavigate()
    const [searchparams] = useSearchParams()
    const [logindata, setLogindata]=useState({
        email:"",
        password:""
    })


    const handleOnchange=(e)=>{
        setLogindata({...logindata, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
            e.preventDefault()
            if (logindata) {
                 const res = await AxiosInstance.post('http://localhost:8000/auth/login/', logindata)
                 const response= res.data
                 const user={
                    'full_name':response.full_name,
                    'email':response.email
                 }
                   

                 if (res.status === 200) {
                     localStorage.setItem('token', JSON.stringify(response.access_token))
                     localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token))
                     localStorage.setItem('user', JSON.stringify(user))
                     toast.success('login successful')
                     window.location.href = 'http://localhost:8000/'
                 }else{
                    toast.error('Проверьте правильность почты или пароля')
                 }
            }
           
    }

  return (
    <div>

<div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
            <h2>Login into your account</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group'>
                 <label htmlFor="">Email Address:</label>
                 <input type="text"
                  className='email-form'
                   value={logindata.email}  
                   name="email"
                   onChange={handleOnchange}/>
                   
               </div>
               
               <div className='form-group'>
                 <label htmlFor="">Password:</label>
                 <input type="text" 
                 className='email-form' 
                 value={logindata.password}
                  name="password"
                 onChange={handleOnchange}/>
               </div>
               
               <input type="submit" value="Login" className="submitButton" />
                        <p className='pass-link'><Link to={'/forget-password'}>forgot password</Link></p>
                </form>
           </div>
        </div>

    </div>
  )
}

export default Login