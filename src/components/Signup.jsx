import React, {useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const Signup = () =>{
    const navigate=useNavigate()
    const [formdata, setFormData]=useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
    })

    const handleOnchange =(e)=>{
        setFormData({...formdata, [e.targer.name]:e.targer.value})
    }

    const [error,setError]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!email || !first_name ||! last_name || !password || !password2){
            setError("all fields are required")
        }
        else{
            const res = await axios.post("http://localhost:8000/api/v1/auth/register/",formdata)
            const response=res.data
            console.log(response.data)
            if(res.status===201){
                navigate("/login")
                toast.success(response.message)
            }
        }
        
    }

    const {email, first_name, last_name, password, password2}=formdata
    return (
        <div>
            <div className='form-container'> 
                <div style={{width:"100%"}} className='wrapper'>
                    <h2>Create Account</h2>
                    
                    <form onSubmit={handleSubmit}>
                    <p style={{color:"red", padding:"1px"}}>{error ? error : ""}</p>
                        <div className='form-group'>
                            <label htmlFor="">Email Address:</label>
                            <input type="text"
                            className='email-form'  
                            name="email" 
                            value={email}  
                            onChange={handleOnchange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">First Name:</label>
                            <input type="text"
                            className='email-form'
                            name="first_name" 
                            value={first_name} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Last Name:</label>
                            <input type="text" 
                            className='email-form'  
                            name="last_name" 
                            value={last_name} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Password:</label>
                            <input type="text" 
                            className='email-form'  
                            name="password" 
                            value={password} 
                            onChange={handleOnchange}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Confirm Password:</label>
                            <input type="password" 
                            className='email-form'  
                            name="password2" 
                            value={password2} 
                            onChange={handleOnchange}/>
                        </div>
                        <input type="submit" value="Submit" className="submitButton" />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
