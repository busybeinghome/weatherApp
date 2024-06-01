import React, {useEffect, useState} from 'react'
import axios from "axios"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate=useNavigate()
    const [formdata, setFormdata]=useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
    })
    const [error, setError]=useState('')

    const handleOnchange = (e)=>{
        setFormdata({...formdata, [e.target.name]:e.target.value})
    }



    const {email, first_name, last_name, password, password2}=formdata
   
    const handleSubmit =async (e)=>{
        e.preventDefault()
       const response = await axios.post(`http://localhost:8000/auth/register/`,formdata)
       console.log(response.data)
       const result=response.data
       if (response.status === 201) {
          navigate('/login')
          toast.success(result.message)
       }
    }
    
  return (
    <div>
        <div className='form-container'>
            <div style={{width:"100%"}} className='wrapper'>
            <h2>Создайте аккаунт</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group'>
                 <label htmlFor="">Эл. почта:</label>
                 <input type="text"
                  className='email-form'  
                  name="email" 
                  value={email}  
                  onChange={handleOnchange} />
               </div>
               <div className='form-group'>
                 <label htmlFor="">Имя:</label>
                 <input type="text"
                  className='email-form'
                  name="first_name" 
                  value={first_name} 
                  onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Фамилия:</label>
                 <input type="text" 
                 className='email-form'  
                 name="last_name" 
                 value={last_name} 
                 onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Пароль:</label>
                 <input type="text" 
                 className='email-form'  
                 name="password" 
                 value={password} 
                 onChange={handleOnchange}/>
               </div>
               <div className='form-group'>
                 <label htmlFor="">Подтвердите пароль:</label>
                 <input type="text" 
                 className='p'  
                 name="password2" 
                 value={password2} 
                 onChange={handleOnchange}/>
               </div>
               <input type="submit" value="Зарегистрироваться" className="submitButton" />
               <p className='pass-link'><Link to={'/login'}>Войти</Link></p>
                </form>
                 
           </div>
        </div>

    </div>
  )
}
export default Signup