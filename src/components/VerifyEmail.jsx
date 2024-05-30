import React, {useState} from 'react'
import axios from 'axios'

const VerifyEmail=() =>{
    return(
        <div>
            <div>
                <form action="">
                    <div className='form-group'>
                        <label htmlFor="">Введите код:</label>
                        <input type="text"
                        className='email-form'
                        name="otp"/>
                    </div>
                    <input type="submit" className='vbtn' value="Send"/>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
