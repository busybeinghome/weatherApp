import React, { useState } from 'react'
import { toast } from 'react-toastify'
import AxiosInstance from '../utils/AxiosInstance.jsx'

function PasswordResetRequest() {
    const [email, setEmail]=useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (email) {
          const res = await AxiosInstance.post('auth/password-reset/', {'email':email})
           if (res.status === 200) {
            console.log(res.data)
            toast.success('Ссылка для смены пароля отправлена на вашу почту')
            
           } 
           setEmail("")
        }
        


    }

  
  return (
    <div>
        <h2>Введите адрес электронной почты</h2>
        <div className='wrapper'>
            <form action="" onSubmit={handleSubmit}>
                 <div className='form-group'>
                 <label htmlFor="">Эл. почта:</label>
                 <input type="text"
                  className='email-form' 
                   name="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   />    
               </div>
               <button className='vbtn'>Отправить</button>
            </form>
        </div>
    </div>
  )
}

export default PasswordResetRequest