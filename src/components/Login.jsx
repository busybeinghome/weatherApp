import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Login=() =>{
    const navigate=useNavigate()
    const [logindata, setLoginData]=useState({
        email:"",
        password:""
    })

    const [error, setError]=useState("")
    const [isLoading, setIsLoading]=useState(false)

    const handleOnchange=(e)=>{
        setLoginData({...logindata,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const {email, password}=logindata()
        if(!email || !password){
            SetError("email and password are required")
        }
        else{
            setIsLoading(true)
            const res =await axios.post("http://localhost:8000/api/v1/auth/login", logindata)
            const response =res.data
            console.log(response)
            setIsLoading(false)
            const user={
                "email":response.email,
                "names":response.full_name
            }
            if(res.status===200){
                localStorage.setItem("user",JSON.stringify(user))
                localStorage.setItem('access',JSON.stringify(response.access_token))
                localStorage.setItem('refresh',JSON.stringify(response.refresh_token))
                navigate("/prifile")
                toast.success("Вход в систему прошел успешно!")
            }
       
        }
    }

    return(
        <div>
            <div className='form-container'>
                <div style={{width:"100%"}} className='wrapper'>
                    <h2>Login into your account</h2>
                    <form action="" onSubmit={handleSubmit}>
                        {isLoading && (
                            <p>Загрузка...</p>
                        )}
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
                            <input type="password" 
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